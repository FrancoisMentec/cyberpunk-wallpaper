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
        ground_level: 800
    })
}

generate()

function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    scene.draw({
        ctx: ctx,
        canvas: canvas
    })
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)