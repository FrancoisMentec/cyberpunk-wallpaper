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
    }

    draw ({
        ctx, 
        canvas,
        x, 
        y,
        scene,
    }) {
        //if (random() > 0.9999) this.light = !this.light
        this.light = this.light == null || random() > 0.9999
            ? scene.time > SUNRISE && scene.time < SUNSET
                ? random() > 0.9
                : random() > 0.2
            : random() > 0.9999
                ? !this.light
                : this.light

        ctx.fillStyle = this.light
            ? this.light_color
            : this.color

        ctx.fillRect(x + this.x, y + this.y, this.width, this.height)
    }
}