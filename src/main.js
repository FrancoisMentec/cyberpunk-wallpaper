let config = {
    // Sky
    day_sky: new Color({ hex: '#4e5dfc' }),
    night_sky: new Color({ hex: '#030733' }),
    dawn_sky: new Color({ hex: '#ee0979' }),
    dawn_height: 300,
    dusk_sky: new Color({ hex: '#ee0979' }),
    dusk_height: 300,
    sun_radius: 30,
    sun_fill: new Color({ hex: '#FFFF00' }),
    moon_radius: 60,
    moon_fill: ['#e6eced', '#616566'],
    star_color: new Color({ hex: '#FFFF00' }),
    // Windows
    windows_min_margin: 3,
    // Other
    fps: 0,
    seconds_per_seconds: 60 * 60, // Fake seconds per real seconds
    ground_level: .66
}

window.wallpaperPropertyListener = {
    applyUserProperties: (properties) => {
        if (properties.seconds_per_seconds) config.seconds_per_seconds = properties.seconds_per_seconds.value
    }
}

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let stars_canvas = document.getElementById('stars_canvas')
let stars_ctx = stars_canvas.getContext('2d')

function resize_canvas () {
    canvas.width  = window.innerWidth + 20
    canvas.height = window.innerHeight + 20

    stars_canvas.width  = canvas.width
    stars_canvas.height = canvas.height * config.ground_level
}

window.addEventListener('resize', e => {
    resize_canvas()
    generate()
})
resize_canvas()

function generate () {
    window.scene = new Scene({
        width: canvas.width,
        height: canvas.height
    })
}

generate()

let last_tick = performance.now()
let fps_threshold = 0

function draw () {
    requestAnimationFrame(draw)

    // fps limitation
    let now = performance.now()
    if (config.fps > 0 && now - last_tick < 1000 / config.fps) return
    scene.time = (scene.time + (now - last_tick) * config.seconds_per_seconds / 1000) % SECONDS_IN_A_DAY // Update time
    last_tick = now

    ctx.save()
    scene.draw({
        ctx: ctx,
        canvas: canvas
    })
    ctx.restore()
}

requestAnimationFrame(draw)