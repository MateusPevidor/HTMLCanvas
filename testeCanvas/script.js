let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d')

let mouseX, mouseY, mouseIsDown

window.addEventListener('mousemove', (event) => {
  mouseX = event.x
  mouseY = event.y
})

let circles = new Array()
for (let i = 0; i < 1000; i++) {
  circles.push(new Circle())
}

function draw() {
  requestAnimationFrame(draw)
  c.clearRect(0, 0, innerWidth, innerHeight)
  
  circles.forEach(circle => {
    circle.update()
    circle.draw()
  })
}

draw()