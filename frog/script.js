const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 800;

let WIDTH;
let HEIGHT;

let playerPosition;
let targetPosition;

const boardSize = 10;
let obstacleCount;

let resolution;

const path = new HamiltonianPath(boardSize);

/**
 * 0: empty
 * 1: visited
 * 2: obstacle
 */
const board = [];
const moves = [];

function setup() {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  resolution = WIDTH / boardSize;

  for (let i = 0; i < boardSize; i++) {
    board.push([]);
  }
  const startTime = Date.now();
  path.generate(10000);
  const endTime = Date.now();
  console.log(endTime - startTime)

  const { player, target, obstacles } = convertPath();
  playerPosition = player;
  targetPosition = target;
  obstacles.forEach(({ x, y }) => {
    board[x][y] = 2;
  });
}

function draw() {
  c.clearRect(0, 0, WIDTH, HEIGHT);

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[j][i] == 1) {
        const index = moves.findIndex(move => move.x == j && move.y == i);
        const colorShift = (moves.length - index) / (boardSize ** 2 - obstacleCount);
        const alpha = colorShift > 0.8 ? 0.2 : 1 - colorShift;

        c.fillStyle = `rgba(0, 255, ${parseInt(colorShift * 1023) % 255}, ${alpha})`;
      }
      if (playerPosition.x == j && playerPosition.y == i) {
        c.fillStyle = "#f00";
      }
      if (targetPosition.x == j && targetPosition.y == i) {
        c.fillStyle = "#fff";
      }
      if (targetPosition.x == playerPosition.x && targetPosition.y == playerPosition.y
          && moves.length == boardSize ** 2 - obstacleCount - 1) {
        c.fillStyle = "#fff";
      }
      if (board[j][i] == 2) {
        // c.fillStyle = "#ff0";
        continue;
      }
      c.fillRect(j * resolution + 1, i * resolution + 1, resolution - 2, resolution - 2);
      c.fillStyle = "#000";
    }
  }
}

setup();
draw();

document.addEventListener('keydown', e => {
  move(e.key);
});

function move(direction) {
  const prev = playerPosition;
  let nextPosition = Object.assign({}, playerPosition);
  switch (direction) {
    case 'ArrowUp': {
      nextPosition.y -= 1;
      break;
    }
    case 'ArrowDown': {
      nextPosition.y += 1;
      break;
    }
    case 'ArrowRight': {
      nextPosition.x += 1;
      break;
    }
    case 'ArrowLeft': {
      nextPosition.x -= 1;
      break;
    }
    default: {
      return;
    }
  }

  if (nextPosition.y < 0 || nextPosition.y >= boardSize) return;
  if (nextPosition.x < 0 || nextPosition.x >= boardSize) return;
  const boardCell = board[nextPosition.x][nextPosition.y];
  if (boardCell == 2) return;
  if (boardCell == 1) {
    const previousMove = moves[moves.length - 1];
    if (nextPosition.x != previousMove.x || nextPosition.y != previousMove.y) return;
  }

  if (boardCell == 1) {
    moves.pop();
    board[nextPosition.x][nextPosition.y] = 0;
  } else {
    board[prev.x][prev.y] = 1;
    moves.push(prev);
  }
  playerPosition = nextPosition;
  draw();
}

function convertPath() {
  const player = {
    x: path.head % boardSize,
    y: Math.floor(path.head / boardSize),
  };

  const target = {
    x: path.tail % boardSize,
    y: Math.floor(path.tail / boardSize),
  };

  const obstacleVertices = path.graph.list.map((vertex, i) => (
    vertex.length == 0 ? i : undefined
  )).filter(n => n != undefined);

  const obstacles = obstacleVertices.map(obstacle => {
    return {
      x: obstacle % boardSize,
      y: Math.floor(obstacle / boardSize),
    }
  });

  obstacleCount = obstacles.length;

  return { player, target, obstacles };
}