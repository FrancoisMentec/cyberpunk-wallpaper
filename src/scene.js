const SECONDS_IN_AN_HOUR = 60 * 60
const SECONDS_IN_A_DAY = 24 * SECONDS_IN_AN_HOUR
const SUNRISE = 8 * 60 * 60
const NOON = SUNRISE + SECONDS_IN_A_DAY / 4
const SUNSET = SUNRISE + SECONDS_IN_A_DAY / 2
const MIDNIGHT = SUNSET + SECONDS_IN_A_DAY / 4

const DAY_WATER = new Color({ hex: '#3d66a8' })
const NIGHT_WATER = new Color({ hex: '#162236' })

class Scene {
    constructor ({
        width,
        ground_level,
        ground_height = 5
    }) {
        this.ground_level = ground_level
        this.ground_height = ground_height

        this.sky = new Sky({
            width,
            ground_level
        })

        this.buildings_skyline = new Buildings_Skyline({
            width: width,
            ground_level: this.buildings_level
        })

        this.building_layers = []

        this.building_layers.push(make_building_layer({
            width: width,
            ground_level: this.buildings_level,
            front_fill: '#240b36',
            side_fill: ['#c31432', '#240b36'],
            windows_light_color: 'red'
        }))

        this.building_layers.push(make_building_layer({
            width: width,
            ground_level: this.buildings_level
        }))

        this.time = NOON
        //this.time = SUNSET - 3 * SECONDS_IN_AN_HOUR
        //this.time = SUNRISE - SECONDS_IN_AN_HOUR
    }

    get buildings_level () {
        return this.ground_level - this.ground_height
    }

    get is_day () {
        return this.time > SUNRISE && this.time < SUNSET
    }

    get is_night () {
        return !this.is_day
    }

    get is_dawn () {
        return this.time > SUNRISE && this.time < SUNRISE + 2 * SECONDS_IN_AN_HOUR
    }

    get is_dusk () {
        return this.time > SUNSET - 2 * SECONDS_IN_AN_HOUR && this.time < SUNSET
    }

    get is_twilight () {
        return this.is_dawn || this.is_dusk
    }

    get luminosity () {
        if (this.time < SUNRISE || this.time > SUNSET) return 0
        if (this.time < SUNRISE + 2 * SECONDS_IN_AN_HOUR) return (this.time - SUNRISE) / (2 * SECONDS_IN_AN_HOUR)
        if (this.time > SUNSET - 2 * SECONDS_IN_AN_HOUR) return -1 * (this.time - (SUNSET - 2 * SECONDS_IN_AN_HOUR)) / (2 * SECONDS_IN_AN_HOUR) + 1
        return 1
    }

    async draw ({
        ctx,
        canvas
    }) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.time = (this.time + config.seconds_per_tick) % SECONDS_IN_A_DAY

        let draw_arguments = {
            ...arguments[0],
            scene: this
        }

        // Sky
        this.sky.draw(draw_arguments)

        // Buildings Skyline
        this.buildings_skyline.draw(draw_arguments)
        
        // Buildings
        this.building_layers.forEach(layer => {
            layer.forEach(building => {
                building.draw(draw_arguments)
            })
        })

        // Ground
        ctx.fillStyle = '#444444'
        ctx.fillRect(0, this.buildings_level, canvas.width, this.ground_height + 2)


        // Prevent see through blur (can be used to add a color close to shore)
        let water_color = this.time > SUNRISE && this.time < SUNSET
            ? color_fusion(NIGHT_WATER, DAY_WATER, Math.sin(this.sky.sun.angle) * 2)
            : NIGHT_WATER
        ctx.fillStyle = water_color.rgb
        ctx.fillRect(0, this.ground_level + 1, canvas.width, 20)

        // Reflection
        let image = await createImageBitmap(canvas, 0, 0, canvas.width, this.ground_level, { imageOrientation: 'flipY' })
        ctx.filter = 'blur(6px)'
        ctx.drawImage(image, 0, this.ground_level + 1)
        ctx.filter = 'none'

        // Water
        fill_rect(ctx, 0, this.ground_level + 1, canvas.width, canvas.height - this.ground_level - 1,
            [water_color.alpha(0.3).rgba, water_color.alpha(0.9).rgba, water_color.alpha(1).rgba], 'top', 'bottom')
    }
}