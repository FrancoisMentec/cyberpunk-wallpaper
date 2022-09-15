const SECONDS_IN_AN_HOUR = 60 * 60
const SECONDS_IN_A_DAY = 24 * SECONDS_IN_AN_HOUR
const SUNRISE = 8 * 60 * 60
const NOON = SUNRISE + SECONDS_IN_A_DAY / 4
const SUNSET = SUNRISE + SECONDS_IN_A_DAY / 2
const MIDNIGHT = SUNSET + SECONDS_IN_A_DAY / 4

const DAY_SKY = new Color({ hex: '#4e5dfc' })
const NIGHT_SKY = new Color({ hex: '#030733' })

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

        let orbiter_speed = 0.005

        this.sun = new Orbiter({
            orbit_center_x: canvas.width / 2,
            orbit_center_y: this.ground_level,
            orbit_radius: Math.min(canvas.width / 2 - 40, this.ground_level - 40),
            starting_angle: Math.PI,
            speed: orbiter_speed,
            color: 'yellow',
            radius: 20
        })

        this.moon = new Orbiter({
            orbit_center_x: canvas.width / 2,
            orbit_center_y: this.ground_level,
            orbit_radius: Math.min(canvas.width / 2 - 80, this.ground_level - 60),
            starting_angle: 0,
            speed: orbiter_speed,
            color: 'gray',
            radius: 60
        })

        this.time = NOON
    }

    get buildings_level () {
        return this.ground_level - this.ground_height
    }

    async draw ({
        ctx,
        canvas
    }) {
        this.time = (this.time + 60) % SECONDS_IN_A_DAY
        this.sun.angle = ((this.time - SUNRISE) / SECONDS_IN_A_DAY) * Math.PI * -2 + Math.PI
        this.moon.angle = ((this.time - SUNRISE + SECONDS_IN_A_DAY / 2) / SECONDS_IN_A_DAY) * Math.PI * -2 + Math.PI

        let draw_arguments = {
            ...arguments[0],
            scene: this
        }

        // Sky
        ctx.fillStyle = this.time > SUNRISE && this.time < SUNSET
            ? color_fusion(NIGHT_SKY, DAY_SKY, Math.sin(this.sun.angle) * 2).rgb
            : NIGHT_SKY.rgb
        ctx.fillRect(0, 0, canvas.width, this.ground_level)

        // Sun & Moon
        this.sun.draw(draw_arguments)
        this.moon.draw(draw_arguments)

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
        ctx.fillRect(0, this.buildings_level - 1, canvas.width, this.ground_height + 2)


        // Prevent see through blur (can be used to add a color close to shore)
        let water_color = this.time > SUNRISE && this.time < SUNSET
            ? color_fusion(NIGHT_WATER, DAY_WATER, Math.sin(this.sun.angle) * 2)
            : NIGHT_WATER
        ctx.fillStyle = water_color.rgb
        ctx.fillRect(0, this.ground_level, canvas.width, 20)

        // Reflection
        let image = await createImageBitmap(canvas, 0, canvas.height - this.ground_level, canvas.width, canvas.height - this.ground_level, { imageOrientation: 'flipY' })
        ctx.filter = 'blur(6px)'
        ctx.drawImage(image, 0, this.ground_level)
        ctx.filter = 'none'

        // Water
        let gradient = ctx.createLinearGradient(canvas.width / 2, this.ground_level, canvas.width / 2, canvas.height)
        gradient.addColorStop(0, water_color.alpha(0.3).rgba)
        gradient.addColorStop(0.5, water_color.alpha(0.9).rgba)
        gradient.addColorStop(1, water_color.alpha(1).rgba)
        ctx.fillStyle = gradient
        ctx.fillRect(0, this.ground_level, canvas.width, canvas.height - this.ground_level)
    }
}