class Color {
    constructor ({
        r = 0,
        g = 0,
        b = 0,
        a = 1,
        hex = null
    } = {}) {
        if (hex) {
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            this.r = parseInt(result[1], 16)
            this.g = parseInt(result[2], 16)
            this.b = parseInt(result[3], 16)
        } else {
            this.r = r
            this.g = g
            this.b = b
        }

        this.a = a
    }

    get rgb () {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }

    get rgba () {
        return `rgb(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }

    get serialize () {
        return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a
        }
    }

    alpha (value) {
        return new Color({
            ...this.serialize,
            a: value
        })
    }

    multiply (value) {
        return new Color({
            r: Math.max(0, Math.min(255, this.r * value)),
            g: Math.max(0, Math.min(255, this.g * value)),
            b: Math.max(0, Math.min(255, this.b * value)),
            a: this.a,
        })
    }
}

function color_fusion (color_a, color_b, balance) {
    if (balance <= 0) return color_a
    else if (balance >= 1) return color_b
    else return new Color({
        r: color_a.r * (1 - balance) + color_b.r * balance,
        g: color_a.g * (1 - balance) + color_b.g * balance,
        b: color_a.b * (1 - balance) + color_b.b * balance,
        a: color_a.a * (1 - balance) + color_b.a * balance
    })
}

function add_colors_to_gradient (gradient, colors) {
    if (!Array.isArray(colors) || colors.length < 2)
        throw new Error(`Colors must be an array (${Array.isArray(colors)}) with a length greater or equal to 2`)
    colors.forEach((color, i) => {
        gradient.addColorStop(
            i / (colors.length - 1),
            color instanceof Color
                ? color.rgba
                : color)
    })
    return gradient
}