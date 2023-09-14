const width = 800
const height = 800

const player = new Player()
const playerInputs = {up: false, down: false, left: false, right: false, ctrl: false, mouse: {x: 0, y: 0}}

const walls = new Array()

walls.push(new Wall(50, 50, 50, 100))
walls.push(new Wall(600, 50, 150, 50))
walls.push(new Wall(700, 50, 50, 700))


// ------ Canvas Setup ------ //
const canvas = document.querySelector('canvas')

canvas.width = width
canvas.height = height

const c = canvas.getContext('2d')

// -------------------------- //

function draw() {
  requestAnimationFrame(draw)
  c.clearRect(0, 0, innerWidth, innerHeight)
  c.fillStyle = '#8080a0'
  c.fillRect(0, 0, width, height)
  
  player.move(playerInputs, walls)
  player.updateLook(playerInputs.mouse)
  player.draw()

  for (let i = 0; i < walls.length; i++)
    walls[i].draw()

}

draw()

function createSquare(x, y) {
  walls.push(new Wall(x, y, 10, 10))
}

canvas.addEventListener("mousemove", e => {
  if (playerInputs.ctrl) {
    createSquare(e.offsetX, e.offsetY)
  }
  playerInputs.mouse.x = e.offsetX
  playerInputs.mouse.y = e.offsetY
})

document.addEventListener("keydown", e => {
  switch (e.key) {
    case 'w':
      playerInputs.up = true
      break
    case 'a':
      playerInputs.left = true
      break
    case 's':
      playerInputs.down = true
      break
    case 'd':
      playerInputs.right = true
      break
    case "Control":
      playerInputs.ctrl = true
      break
  }
})

document.addEventListener("keyup", e => {
  switch (e.key) {
    case 'w':
      playerInputs.up = false
      break
    case 'a':
      playerInputs.left = false
      break
    case 's':
      playerInputs.down = false
      break
    case 'd':
      playerInputs.right = false
      break
    case "Control":
      playerInputs.ctrl = false
      break
  }
})