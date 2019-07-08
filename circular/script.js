// ------ Canvas Setup ------ //
let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext('2d')

// -------------------------- //

let particles = new Array()

for (let i = 0; i < 30; i++) {
  particles.push(new Particle((i+1)*19 + 30))
}

function draw() {
  requestAnimationFrame(draw)
  c.clearRect(0, 0, innerWidth, innerHeight)

  particles.forEach(particle => {
    particle.update()
    particle.draw()
  })

}

draw()