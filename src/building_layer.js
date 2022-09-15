class Building_Layer {
    constructor ({
        width,
        height,
        depth,
        windows = true,
        front_fill = ['#aa4b6b', '#6b6b83', '#3b8d99']
    }) {
        this.width = width
        this.height = height
        this.depth = depth || Math.min(20, random_int(0.2 * this.width, 0.4 * this.width))

        this.windows_panel = windows
            ? new Windows_Panel({ building_layer: this })
            : null

        this.front_fill = front_fill
    }

    get total_width () {
        return this.width + this.depth
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
        let side_x = Math.ceil(x - this.width / 2 - this.depth)
        y -= this.height

        // Shadow
        let shadow_width = Math.max(1, this.depth * (((Math.cos(scene.sun.angle) * -1) + 1) / 2))
        gradient = ctx.createLinearGradient(front_x + this.width, 0, front_x + this.width + shadow_width, 0)
        gradient.addColorStop(0, 'rgba(0,0,0,0.6)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(front_x + this.width, y, shadow_width, this.height);

        // Side
        gradient = ctx.createLinearGradient(side_x, y, side_x + this.depth, y + this.height)
        gradient.addColorStop(0, '#e1eec3')
        gradient.addColorStop(1, '#f05053')
        ctx.fillStyle = gradient
        ctx.fillRect(side_x, y, this.depth, this.height)

        // Front
        if (Array.isArray(this.front_fill)) {
            let gradient = ctx.createLinearGradient(front_x, y, front_x + this.width, y + this.height)
            ctx.fillStyle = add_colors_to_gradient(gradient, this.front_fill)
        } else {
            ctx.fillStyle = this.front_fill instanceof Color
                ? this.front_fill.rgba
                : this.front_fill
        }
        ctx.fillRect(front_x, y, this.width, this.height)

        // Windows
        if (this.windows_panel) this.windows_panel.draw({
            ...arguments[0],
            x: front_x,
            y: y
        })

    }
}