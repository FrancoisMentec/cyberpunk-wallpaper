class Scene {
    constructor ({
        width,
        ground_level
    }) {
        this.buildings = []
        let x = random_int(-100, 100)
        while (x < width) {
            this.buildings.push(new Building({ x: x, y: 800 }))
            x += random_int(20, 100)
        }
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
            radius: 20
        })
    }

    draw ({
        ctx,
        canvas
    }) {
        let draw_arguments = {
            ...arguments[0],
            scene: this
        }
        this.sun.draw(draw_arguments)
        this.moon.draw(draw_arguments)
        for (let building of this.buildings) {
            building.draw(draw_arguments)
        }
    }
}