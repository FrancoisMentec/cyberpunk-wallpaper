class Building_Part {
    constructor ({
        width,
        height,
        depth,
        windows = true,
        front_fill = ['#aa4b6b', '#6b6b83', '#3b8d99'],
        side_fill = ['#e1eec3', '#f05053'],
        windows_light_color = 'yellow',
        x_offset = 0
    }) {
        this.width = width
        this.height = height
        this.depth = typeof depth == 'number'
            ? depth
            : clamp(random_int(0.2 * this.width, 0.4 * this.width), 2, 15)
        
        this.windows_panel = windows === true
            ? new Windows_Panel({
                building_part: this,
                light_color: windows_light_color
            })
            : null
        this.front_fill = front_fill
        this.side_fill = side_fill

        this.x_offset = x_offset
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
        
        let side_x = Math.floor(x - (this.width + this.depth) / 2)
        let front_x = side_x + this.depth
        y -= this.height

        // Shadow
        let shadow_width = Math.max(1, this.depth * (((Math.cos(scene.sun.angle) * -1) + 1) / 2))
        gradient = ctx.createLinearGradient(front_x + this.width, 0, front_x + this.width + shadow_width, 0)
        gradient.addColorStop(0, 'rgba(0,0,0,0.6)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(front_x + this.width, y, shadow_width, this.height);

        // Side
        if (this.depth > 0) {
            if (Array.isArray(this.side_fill)) {
                let gradient = ctx.createLinearGradient(side_x, y, side_x + this.depth, y + this.height)
                ctx.fillStyle = add_colors_to_gradient(gradient, this.side_fill)
            } else {
                ctx.fillStyle = this.side_fill instanceof Color
                    ? this.side_fill.rgba
                    : this.side_fill
            }
            ctx.fillRect(side_x, y, this.depth, this.height)
        }

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