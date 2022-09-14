let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

function resize_canvas () {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
}

window.addEventListener('resize', e => resize_canvas())
resize_canvas()

function generate () {
    window.scene = new Scene({
        width: canvas.width,
        ground_level: canvas.height * 2 / 3
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