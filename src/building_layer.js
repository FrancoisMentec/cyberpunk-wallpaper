class Building_Layer {
    constructor () {
        this.width = random_int(10, 50)
        this.height = random_int(20, 300)
        this.side_width = random_int(0.2 * this.width, 0.4 * this.width)

        this.windows_panel = new Windows_Panel({ building_layer: this })
    }

    get total_width () {
        return this.width + this.side_width
    }

    draw ({
        ctx, 
        canvas,
        scene,
        x, 
        y,
    } = {}) {
        let gradient = null

        let front_x = Math.floor(x - this.width / 2)
        let side_x = Math.ceil(x - this.width / 2 - this.side_width)
        y -= this.height

        // Shadow
        let shadow_width = Math.max(1, this.side_width * (((Math.cos(scene.sun.angle) * -1) + 1) / 2))
        gradient = ctx.createLinearGradient(front_x + this.width, 0, front_x + this.width + shadow_width, 0)
        gradient.addColorStop(0, 'rgba(0,0,0,0.6)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(front_x + this.width, y, shadow_width, this.height);

        // Side
        gradient = ctx.createLinearGradient(side_x, y, side_x + this.side_width, y + this.height)
        gradient.addColorStop(0, '#e1eec3')
        gradient.addColorStop(1, '#f05053')
        ctx.fillStyle = gradient
        ctx.fillRect(side_x, y, this.side_width, this.height)

        // Front
        gradient = ctx.createLinearGradient(front_x, y, front_x + this.width, y + this.height)
        gradient.addColorStop(0, '#aa4b6b')
        gradient.addColorStop(.5, '#6b6b83')
        gradient.addColorStop(1, '#3b8d99')
        ctx.fillStyle = gradient
        ctx.fillRect(front_x, y, this.width, this.height)

        this.windows_panel.draw({
            ...arguments[0],
            x: front_x,
            y: y
        })

    }
}