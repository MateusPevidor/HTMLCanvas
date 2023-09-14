// ------ Canvas Setup ------ //

const canvas = document.querySelector('canvas')
canvas.width = width
canvas.height = height
const c = canvas.getContext('2d')

// -------------------------- //

let flags = 0
let score = 0

const bombCount = 990
const boardSize = { rows: 16, cols: 300 }
const board = new Board(boardSize.rows, boardSize.cols)

function setup() {
  for (let k = 0; k < bombCount; k++) {
    let i = Math.floor(Math.random()*boardSize.rows)
    let j = Math.floor(Math.random()*boardSize.cols)
    
    while(!board.getSquare(i, j).addBomb()) {
      i = Math.floor(Math.random()*boardSize.rows)
      j = Math.floor(Math.random()*boardSize.cols)
    }
  }

  board.squares.forEach((row) => {
    row.forEach((square) => {
      square.calcNearbyBombs()
    })
  })
}

function draw() {
  requestAnimationFrame(draw)
  c.clearRect(0, 0, width, height)

  board.draw()
}

let scrolling = false
let mouseX = 0
let deltaX = 0
let shouldOpen = true

canvas.addEventListener('mousedown', e => {
  shouldOpen = true
  scrolling = true
  mouseX = e.offsetX
})

canvas.addEventListener('mouseup', e => {
  if (e.which == 1 && shouldOpen){
    board.openSquare(Math.floor(e.offsetY/32), Math.floor((e.offsetX + (-deltaX))/32))
  }
  scrolling = false
})

window.addEventListener('mousemove', e => {
  if (scrolling) {
    let variation = e.offsetX - mouseX
    if (variation > 1 || variation < 1) {
      shouldOpen = false
    }
    mouseX = e.offsetX
    deltaX += variation
    if (deltaX > 0)
      deltaX = 0
    if (deltaX < -((boardSize.cols-30)*32))
      deltaX = -(boardSize.cols-30)*32
    c.resetTransform()
    c.translate(deltaX, 0)
  }
})

addEventListener('contextmenu', e => {
  board.addFlag(Math.floor(e.offsetY/32), Math.floor((e.offsetX + (-deltaX))/32))

  e.preventDefault()
  return false;
}, false);

addEventListener('keydown', e => {
  if (e.keyCode == 37) {
    deltaX += 320
  } else if (e.keyCode == 39) {
    deltaX -= 320
  }
  if (deltaX > 0)
    deltaX = 0
  else if (deltaX < -((boardSize.cols-30)*32))
    deltaX = -(boardSize.cols-30)*32
  c.resetTransform()
  c.translate(deltaX, 0)
})

setup()
draw()

function increaseScore() {
  score++
  document.getElementById('score').innerHTML = `Score: ${score}`
}

function changeFlagCount() {
  document.getElementById('flags').innerHTML = `Flags: ${flags}`
}

///////////////////////

$('#runner_4').css('width', '988px')
$('#runner_1').css('width', '988px')

let colors = [
  {r: 255, g: 255, b: 0},
  {r: 255, g: 0, b: 0},
  {r: 0, g: 192, b: 255},
  {r: 0, g: 255, b: 0},
]
for (let i = 1; i < 5; i++) {
  $(`#runner_${i}`).css('background-color', `rgba(${colors[i-1].r}, ${colors[i-1].g}, ${colors[i-1].b}, 0.5)`)
  $(`#runner_${i}`).css('border-right', `2px solid rgba(${colors[i-1].r}, ${colors[i-1].g}, ${colors[i-1].b}, 1)`)
}