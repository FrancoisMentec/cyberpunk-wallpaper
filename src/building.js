class Building {
    constructor ({
        x = 0,
        y = 0,
    } = {}) {
        this.x = x
        this.y = y

        this.layers = []

        let seed = random()

        if (seed < 0.4) { // Small & large
            this.layers.push(new Building_Layer({
                width: random_int(30, 100),
                height: random_int(20, 60),
            }))
        } else if (seed < 0.8) { // Regular
            this.layers.push(new Building_Layer({
                width: random_int(20, 50),
                height: random_int(50, 150),
            }))
        } else if (seed < 0.95) { // Skyscraper
            this.layers.push(new Building_Layer({
                width: random_int(10, 30),
                height: random_int(150, 400),
            }))
        } else { // Ultra Skyscraper
            this.layers.push(new Building_Layer({
                width: random_int(10, 20),
                height: random_int(400, 700),
            }))
        } 
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