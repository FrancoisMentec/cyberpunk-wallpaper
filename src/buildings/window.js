class Window {
    constructor({
        x,
        y,
        width,
        height,
        color = 'gray',
        light_color = 'yellow'
    } = {}) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.light_color = light_color

        this.light = null

        this.time_until_light_change = 0
    }

    draw ({
        ctx, 
        canvas,
        x, 
        y,
        scene,
    }) {
        // Light change
        this.time_until_light_change -= scene.seconds_per_tick
        if (this.time_until_light_change <= 0) {
            if (scene.is_day) this.light = Math.random() > 0.9
            else if (scene.is_twilight)  this.light = Math.random() > 0.2
            else this.light = Math.random() > 0.6
            this.time_until_light_change = random_int(.5 * SECONDS_IN_AN_HOUR, 24 * SECONDS_IN_AN_HOUR)
        }

        ctx.fillStyle = this.light
            ? this.light_color
            : this.color

        ctx.fillRect(x + this.x, y + this.y, this.width, this.height)
    }
}