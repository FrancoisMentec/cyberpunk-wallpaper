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