// ------ Canvas Setup ------ //

const canvas = document.querySelector('canvas')
canvas.width = width
canvas.height = height
const c = canvas.getContext('2d')

// -------------------------- //

const controller = new Controller()
const pieces = new Array()

function setup() {
  pieces.push(new Piece())
  controller.setCurrentPiece(pieces[0])
}

function draw() {
  requestAnimationFrame(draw)
  c.clearRect(0, 0, width, height)
  pieces.forEach(piece => {
    piece.draw()
  })
}

setup()
draw()
setInterval(() => {
  pieces.forEach(piece => {
    piece.shift()
  })
  if (controller.currentPiece.collided) {
    const newPiece = new Piece()
    pieces.push(newPiece)
    controller.setCurrentPiece(newPiece)
  }
}, 200)
