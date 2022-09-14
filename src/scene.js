const SECONDS_IN_AN_HOUR = 60 * 60
const SECONDS_IN_A_DAY = 24 * SECONDS_IN_AN_HOUR
const SUNRISE = 8 * 60 * 60
const NOON = SUNRISE + SECONDS_IN_A_DAY / 4
const SUNSET = SUNRISE + SECONDS_IN_A_DAY / 2
const MIDNIGHT = SUNSET + SECONDS_IN_A_DAY / 4

const DAY_SKY = new Color({ hex: '#4e5dfc' })
const NIGHT_SKY = new Color({ hex: '#030733' })

class Scene {
    constructor ({
        width,
        ground_level
    }) {
        this.ground_level = ground_level

        this.buildings_skyline = new Buildings_Skyline({
            width: width,
            ground_level: this.ground_level
        })

        this.buildings = []
        for (let i = 0; i < width / 10; i++)
            this.buildings.push(new Building({ x: random_int(-100, width + 100), y: this.ground_level }))
        this.buildings.sort((a, b) => b.height - a.height)

        let orbiter_speed = 0.005

        this.sun = new Orbiter({
            orbit_center_x: canvas.width / 2,
            orbit_center_y: 800,
            orbit_radius: canvas.width / 3,
            starting_angle: Math.PI,
            speed: orbiter_speed,
            color: 'yellow',
            radius: 20
        })

        this.moon = new Orbiter({
            orbit_center_x: canvas.width / 2,
            orbit_center_y: 800,
            orbit_radius: canvas.width / 3,
            starting_angle: 0,
            speed: orbiter_speed,
            color: 'gray',
            radius: 60
        })

        this.time = NOON
    }

    draw ({
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
            ? color_fusion(NIGHT_SKY, DAY_SKY, Math.sin(this.sun.angle) * 3).rgb
            : NIGHT_SKY.rgb
        ctx.fillRect(0, 0, canvas.width, this.ground_level)

        // Buildings Skyline
        this.buildings_skyline.draw(draw_arguments)

        // Sun & Moon
        this.sun.draw(draw_arguments)
        this.moon.draw(draw_arguments)
        
        // Buildings
        for (let building of this.buildings) {
            building.draw(draw_arguments)
        }

        // Ground
        ctx.fillStyle = 'black'
        ctx.fillRect(0, this.ground_level, canvas.width, canvas.height - this.ground_level)
    }
}