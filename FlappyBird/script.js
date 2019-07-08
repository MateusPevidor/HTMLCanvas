// ------ Canvas Setup ------ //
let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext('2d')

// ------------------------- //

let bird = new Bird()
let pipes = new Array()

for (let i = 0; i < 6; i++) {
  pipes.push(new Pipe(i*400))
}

function draw() {
  requestAnimationFrame(draw)
  c.clearRect(0, 0, innerWidth, innerHeight)

  pipes.forEach(pipe => {
    pipe.update()
    pipe.draw()
  })

  bird.update()
  bird.draw()
}

function updateScore() {
  document.getElementById('score').innerHTML = `Score: ${score}`
}

draw()

window.addEventListener('mousedown', event => {
  bird.flip()
})