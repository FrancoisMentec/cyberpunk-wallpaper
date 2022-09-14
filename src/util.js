function random () {
    return Math.random()
}

function random_int (a, b) {
    let min = 0
    let max = null
    if (typeof a == 'number') {
        if (typeof b == 'number') {
            min = a
            max = b
        } else max = a
    } else throw new Error('a is required')
    return Math.floor(Math.random() * (max - min) + min)
}

function random_bool () {
    return Math.random() >= 0.5
}