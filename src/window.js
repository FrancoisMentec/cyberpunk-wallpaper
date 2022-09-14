class Window {
    constructor({
        x,
        y,
        width,
        height
    }) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.light = random_bool()
    }

    draw ({
        ctx, 
        canvas,
        x, 
        y,
    }) {
        if (random() > 0.9999) this.light = !this.light

        ctx.fillStyle = this.light
            ? 'yellow'
            : 'gray'

        ctx.fillRect(x + this.x, y + this.y, this.width, this.height)
    }
}