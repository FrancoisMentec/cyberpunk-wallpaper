class Windows_Panel {
    constructor ({
        building_part,
        light_color = 'yellow'
    }) {
        this.building_part = building_part

        let full_width = Math.random() > 0.7

        this.min_margin = full_width
            ? random_int(3, 5)
            : random_int(3, 10)
        this.windows_width = full_width
            ? this.width - this.min_margin * 2 // full width windows
            : random_int(3,  clamp(this.width - this.min_margin * 2, 6, 20))
        this.windows_height = random_int(3, clamp(this.height - this.min_margin * 2, 6, 15))

        this.windows = []
        let n_cols = Math.floor(this.width / (this.windows_width + this.min_margin))
        let cols_margin = (this.width - n_cols * this.windows_width) / (n_cols + 1)

        let n_rows = Math.floor(this.height / (this.windows_height + this.min_margin))
        let rows_margin = (this.height - n_rows * this.windows_height) / (n_rows + 1)

        let window_x = cols_margin
        for (let col = 0; col < n_cols; col++) {
            let window_y = rows_margin
            for (let row = 0; row < n_rows; row++) {
                this.windows.push(new Window({
                    x: window_x,
                    y: window_y,
                    width: this.windows_width,
                    height: this.windows_height,
                    light_color
                }))
                window_y += this.windows_height + rows_margin
            }
            window_x += this.windows_width + cols_margin
        }
    }

    get width () {
        return this.building_part.width
    }

    get height () {
        return this.building_part.height
    }

    draw ({
        ctx, 
        canvas,
        x, 
        y,
    }) {
        this.windows.forEach(window => window.draw(arguments[0]))
    }
}