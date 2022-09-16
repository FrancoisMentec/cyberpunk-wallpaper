class Buildings_Skyline {
    constructor ({
        width,
        ground_level,
        min_heigth = 100,
        max_heigth = 150,
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
                width: width - current_width <= min_building_width
                    ? width - current_width
                    : random_int(min_building_width, Math.min(max_building_width, width - current_width)),
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