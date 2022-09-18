class Buildings_Skyline {
    constructor ({
        width,
        ground_level,
        min_heigth = 30,
        max_heigth = 80,
        min_building_width = 10,
        max_building_width = 100,
        color = '#222222'
    }) {
        this.color = color
        this.ground_level = ground_level

        let current_width = 0
        this.buildings = []
        while (current_width < width) {
            let building = {
                x: current_width,
                width: random_int(min_building_width, max_building_width),
                height: random_int(min_heigth, max_heigth),
            }
            this.buildings.push(building)
            current_width += building.width
        }
    }

    draw ({
        ctx,
        canvas,
        scene
    }) {
        ctx.fillStyle = this.color
        for (const {x, width, height} of this.buildings) {
            ctx.fillRect(x, this.ground_level - height, width, height)
        }
    }
}