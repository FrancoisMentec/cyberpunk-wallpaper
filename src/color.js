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
}

function color_fusion (color_a, color_b, balance) {
    if (balance <= 0) return color_a
    else if (balance >= 1) return color_b
    else return new Color({
        r: color_a.r * (1 - balance) + color_b.r * balance,
        g: color_a.g * (1 - balance) + color_b.g * balance,
        b: color_a.b * (1 - balance) + color_b.b * balance
    })
}