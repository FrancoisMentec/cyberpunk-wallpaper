class Orbiter {
    constructor ({
        orbit_center_x,
        orbit_center_y,
        orbit_radius,
        fill,
        radius
    }) {
        this.orbit_center_x = orbit_center_x
        this.orbit_center_y = orbit_center_y
        this.orbit_radius = orbit_radius
        this.fill = fill
        this.radius = radius

        this.angle = 0
    }

    get angle () {
        return this._angle
    }

    set angle (value) {
        this._angle = value
        this._center_x = null
        this._center_y = null
    }

    get center_x () {
        if (this._center_x == null ) this._center_x = this.orbit_center_x + this.orbit_radius * Math.cos(this.angle)
        return this._center_x
    }

    get center_y () {
        if (this._center_y == null ) this._center_y = this.orbit_center_y - this.orbit_radius * Math.sin(this.angle)
        return this._center_y
    }

    draw ({
        ctx,
        canvas
    }) {
        ctx.fillStyle = Array.isArray(this.fill)
            ? make_gradient(ctx, this.center_x - this.radius, this.center_y - this.radius, this.radius * 2, this.radius * 2, this.fill)
            : rgba(this.fill)
        ctx.beginPath()
        ctx.arc(this.center_x, this.center_y, this.radius, 0, Math.PI * 2)
        ctx.fill()
    }
}