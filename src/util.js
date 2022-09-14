function random () {
    return Math.random()
}

function random_int (a, b, normal=false) {
    let min = 0
    let max = null
    if (typeof a == 'number') {
        if (typeof b == 'number') {
            min = a
            max = b
        } else max = a
    } else throw new Error('a is required')
    let r = normal
        ? random_bm()
        : Math.random()
    return Math.floor(r * (max - min) + min)
}

function random_bool () {
    return Math.random() >= 0.5
}

function random_bm () { // bm stands for Box-Muller
    let u = 0, v = 0
    while(u === 0) u = Math.random()
    while(v === 0) v = Math.random()
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) return random_bm() // resample between 0 and 1
    return num
  }