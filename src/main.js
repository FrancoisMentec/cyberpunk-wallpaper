let config = {
    sky: {
        day_sky: new Color({ hex: '#4e5dfc' }),
        night_sky: new Color({ hex: '#030733' }),
        dawn_sky: new Color({ hex: '#ee0979' }),
        dusk_sky: new Color({ hex: '#ee0979' }),
        sun_radius: 30,
        sun_fill: new Color({ hex: '#FFFF00' }),
        moon_radius: 60,
        moon_fill: ['#e6eced', '#616566'],
        star_color: new Color({ hex: '#FFFF00' })
    },
    windows: {
        min_margin: 3
    },
    seconds_per_tick: 60,
    ground_level: .66
}

window.wallpaperPropertyListener = {
    applyUserProperties: (properties) => {
        if (properties.seconds_per_tick) config.seconds_per_tick = properties.seconds_per_tick.value
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
        ground_level: canvas.height * config.ground_level
    })
}

generate()

function draw () {
    //ctx.save()
    scene.draw({
        ctx: ctx,
        canvas: canvas
    })
    //ctx.restore()

    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)