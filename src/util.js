function clamp (number, min, max) {
    return Math.min(Math.max(number, min), max)
}

function random (a=1, b) {
    let min = typeof b == 'number'
        ? a
        : 0
    let max = typeof b == 'number'
        ? b
        : a
    if (min == max) return min
    else if (min > max) throw new Error(`min (${min}) > max (${max})`)
    return Math.random() * (max - min) + min
}

function random_int (a=1, b) {
    return Math.floor(random(a, b))
}

function random_bool () {
    return Math.random() >= 0.5
}

function make_gradient (ctx, x, y, width, height, fill, from='top left', to='bottom right') {
    let gradient = ctx.createLinearGradient(
        from.includes('left')
            ? x
            : from.includes('right')
                ? x + width
                : x + width / 2,
        from.includes('top')
            ? y
            : from.includes('bottom')
                ? y + height
                : y + height / 2,
        to.includes('left')
            ? x
            : to.includes('right')
                ? x + width
                : x + width / 2,
        to.includes('top')
            ? y
            : to.includes('bottom')
                ? y + height
                : y + height / 2)
    
    return add_colors_to_gradient(gradient, fill)
}

function fill_rect (ctx, x, y, width, height, fill, from='top left', to='bottom right') {
    ctx.fillStyle = Array.isArray(fill)
        ? make_gradient(ctx, x, y, width, height, fill, from, to)
        : fill instanceof Color
            ? fill.rgba
            : fill
    ctx.fillRect(x, y, width, height)
}

function normal (x, std, mean) {
    return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-.5*((x-mean) / std) ** 2)
}