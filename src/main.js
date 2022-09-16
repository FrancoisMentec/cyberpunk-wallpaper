let config = {
    sun_radius: 30,
    moon_radius: 60,
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