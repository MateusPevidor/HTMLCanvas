// ------ Canvas Setup ------ //
let canvas = document.querySelector('canvas')

canvas.width = width
canvas.height = height

const c = canvas.getContext('2d')

// -------------------------- //

let particles = new Array()

function setup() {
  for (let i = 0; i < 75; i++) {
    particles.push(new Particle())
  }
}

function draw() {
  requestAnimationFrame(draw)
  c.clearRect(0, 0, width, height)

  particles.forEach(particle => {
    particle.update(particles)
    particle.draw()
  })

}

setup()
draw()