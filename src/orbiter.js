class Orbiter {
    constructor ({
        orbit_center_x,
        orbit_center_y,
        orbit_radius,
        starting_angle,
        speed,
        color,
        radius
    }) {
        this.orbit_center_x = orbit_center_x
        this.orbit_center_y = orbit_center_y
        this.orbit_radius = orbit_radius
        this.angle = starting_angle
        this.speed = speed
        this.color = color
        this.radius = radius
    }

    draw ({
        ctx,
        canvas
    }) {
        ctx.fillStyle = this.color
        this.angle = (this.angle - this.speed) % (Math.PI * 2)
        ctx.beginPath()
        ctx.arc(this.orbit_center_x + this.orbit_radius * Math.cos(this.angle), this.orbit_center_y - this.orbit_radius * Math.sin(this.angle), this.radius, 0, Math.PI * 2)
        ctx.fill()
    }
}