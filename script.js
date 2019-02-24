// ------ Canvas Setup ------ //
let canvas = document.querySelector('canvas')

canvas.width = width
canvas.height = height

const c = canvas.getContext('2d')

// -------------------------- //

let particles = new Array()

function setup() {
  for (let i = 0; i < amount; i++) {
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

function reload() {
  document.body.style.backgroundColor = document.getElementById('input-background').value
  
  particles = new Array()
  setup()
}

function reset() {
  amount = 120
  radiusAmplifier = 1
  lineDistance = 200
  lineWidth = 1
  speedAmplifier = 1
  depth = 360
  fillColor = '#ffffff'
  strokeColor = '#ffffff'
  lineColor = '#ffffff'
  document.getElementById('fillBox').checked = true
  document.getElementById('strokeBox').checked = true
  document.getElementById('lineBox').checked = true
  document.getElementById('input-background').value = '#FF7070'
  document.getElementById('fillColor').value = '#FFFFFF'
  document.getElementById('strokeColor').value = '#FFFFFF'
  document.getElementById('lineColor').value = '#FFFFFF'
  fillFields()
  document.body.style.backgroundColor = document.getElementById('input-background').value
}

setup()
fillFields()
draw()