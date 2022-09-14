class Building {
    constructor ({
        x = 0,
        y = 0,
    } = {}) {
        this.x = x
        this.y = y

        this.layers = [new Building_Layer()]
    }

    get height () {
        return this.layers.reduce((sum, layer) => sum + layer.height, 0)
    }

    draw ({
        ctx,
        canvas,
        scene,
    }) {
        let y = this.y
        for (let layer of this.layers) {
            layer.draw({
                ...arguments[0],
                x: this.x,
                y: y
            })
            y -= layer.height
        }
    }
}