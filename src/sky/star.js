class Star {
    constructor ({
        width,
        height,
        color = config.star_color
    }) {
        this.x = random_int(width)
        this.y = random_int(height)
        this.radius = random(.1, 1)
        this.color = color
    }

    draw ({
        ctx,
        canvas,
        scene,
        alpha
    }) {
        ctx.fillStyle = this.color.alpha(alpha).rgba
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
    }
}