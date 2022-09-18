let config = {
    sky: {
        day_sky: new Color({ hex: '#4e5dfc' }),
        night_sky: new Color({ hex: '#030733' }),
        dawn_sky: new Color({ hex: '#ff0000' }),
        dusk_sky: new Color({ hex: '#ff0000' }),
        sun_radius: 30,
        sun_fill: new Color({ hex: '#FFFF00' }),
        moon_radius: 60,
        moon_fill: ['#e6eced', '#616566'],
        star_color: new Color({ hex: '#FFFF00' })
    },
    windows: {
        min_margin: 3
    }
}

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

function resize_canvas () {
    canvas.width  = window.innerWidth + 20
    canvas.height = window.innerHeight + 20
}

window.addEventListener('resize', e => {
    resize_canvas()
    generate()
})
resize_canvas()

function generate () {
    window.scene = new Scene({
        width: canvas.width,
        ground_level: canvas.height * .66
    })
}

generate()

function draw () {
    scene.draw({
        ctx: ctx,
        canvas: canvas
    })

    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)