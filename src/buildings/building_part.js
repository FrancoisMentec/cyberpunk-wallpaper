const CAP_Y_OFFSET = 1 // To correct the weird transparency border

class Building_Part {
    constructor ({
        width,
        height,
        depth,
        windows = true,
        front_fill = ['#aa4b6b', '#6b6b83', '#3b8d99'],
        side_fill = ['#e1eec3', '#f05053'],
        windows_light_color = 'yellow',
        x_offset = 0,
        cap_fill = null
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

        this.cap_height = typeof cap_height == 'number'
            ? cap_height
            : random_int(1, Math.min(5, this.depth / 2))
        this.cap_fill = cap_fill == null
            ? Array.isArray(this.side_fill)
                ? this.side_fill[0]
                : this.side_fill
            : cap_fill
    }

    get total_width () {
        return this.width + this.depth
    }

    get total_height () {
        return this.height + this.cap_height - CAP_Y_OFFSET
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
        /*let shadow_width = scene.time >= SUNRISE && scene.time <= NOON
            ? Math.max(1, this.depth / 3 * (1 - ((scene.time - SUNRISE) / (NOON - SUNRISE))))
            : 1
        fill_rect(ctx, front_x + this.width, y - this.cap_height, shadow_width, this.total_height, ['rgba(0,0,0,0.6)', 'transparent'])*/
        fill_rect(ctx, front_x + this.width, y - this.cap_height, 1, this.total_height, 'rgba(0,0,0,0.6)')

        // Side
        if (this.depth > 0)
            fill_rect(ctx, side_x, y, this.depth, this.height, this.side_fill)

        // Front
        fill_rect(ctx, front_x, y, this.width, this.height, this.front_fill)

        // Windows
        if (this.windows_panel) this.windows_panel.draw({
            ...arguments[0],
            x: front_x,
            y: y
        })

        // Cap
        if (this.cap_height > 0) {
            fill_rect(ctx, side_x, y - this.cap_height + CAP_Y_OFFSET, this.total_width, this.cap_height, this.cap_fill)
        }  
            
    }
}