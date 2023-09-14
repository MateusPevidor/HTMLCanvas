import Board from './board.js';
import Piece from './piece.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const WIDTH = 450;
const HEIGHT = 900;

const board = new Board(WIDTH / 6, 6, 12);
let piece = new Piece(2, 0, WIDTH / 6);

function setup() {
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
}

function update() {
  if (board.checkPieceColision(piece, 0, 1)) {
    board.dropPiece(piece);
    piece = new Piece(2, 0, WIDTH / 6);
  }

  piece.move(0, 1);
}

function draw() {
  requestAnimationFrame(draw);
  c.clearRect(0, 0, WIDTH, HEIGHT);
  board.draw(canvas);

  piece.draw(canvas);
}

document.addEventListener('keydown', e => {
  if (e.key == 'ArrowLeft') {
    if (board.checkPieceColision(piece, -1, 0)) return;
    piece.move(-1, 0);
  }
  else if (e.key == 'ArrowRight') {
    if (board.checkPieceColision(piece, 1, 0)) return;
    piece.move(1, 0);
  }
  else if (e.key == 'ArrowDown') {
    if (board.checkPieceColision(piece, 0, 1)) return;
    piece.move(0, 1);
  }

  else if (e.key == 'd') {
    piece.rotate('clockwise');
  }
  else if (e.key == 's') {
    piece.rotate('counterClockwise');
  }
})

setup();
draw();
setInterval(() => {
  update();
}, 1200);