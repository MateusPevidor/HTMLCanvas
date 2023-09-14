const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const boardSize = 800;
const gridSize = 10;

canvas.width = boardSize;
canvas.height = boardSize;

const cellSize = boardSize / gridSize;

const snake = [[3, 3]];

let vX = 1, vY = 0;

let food = [Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)];

function update() {
  const [headPosX, headPosY] = snake[0];
  const newPos = [headPosX + vX, headPosY + vY];

  const snakeBody = snake.slice(1);

  if (snakeBody.find(s => s[0] == newPos[0] && s[1] == newPos[1])) return;
  if (newPos[0] < 0 || newPos[0] >= gridSize || newPos[1] < 0 || newPos[1] >= gridSize) return;
  
  if (newPos[0] == food[0] && newPos[1] == food[1]) {
    snake.push([food[0], food[1]]);
    food = [Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)];
  }

  snake.unshift(newPos);
  snake.pop();

}

function draw() {
  update();

  c.fillStyle = '#000';
  c.fillRect(0, 0, boardSize, boardSize);
  
  snake.forEach((s, i) => {
    if (i == 0) c.fillStyle = '#f00';
    else c.fillStyle = '#fff';

    const [x, y] = s;

    c.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  });

  c.fillStyle = '#0f0';
  c.fillRect(food[0] * cellSize, food[1] * cellSize, cellSize, cellSize);
}

document.addEventListener('keydown', (e) => {
  if (e.key == 'd') {
    if (vX == -1) return;
    vX = 1; vY = 0;
  } else if (e.key == 'a') {
    if (vX == 1) return;
    vX = -1; vY = 0;
  } else if (e.key == 'w') {
    if (vY == 1) return;
    vX = 0; vY = -1;
  } else if (e.key == 's') {
    if (vY == -1) return;
    vX = 0; vY = 1;
  }
});

setInterval(() => {
  draw();
}, 1000 / 6);