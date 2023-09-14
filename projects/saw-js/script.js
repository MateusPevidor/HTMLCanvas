const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let resolution;
let xOffset;

let grid;
let path;

function setup() {
  grid = [];
  path = [];
  for (let i = 0; i < data.rows; i++) {
    grid.push([]);
    for (let j = 0; j < data.columns; j++) {
      grid[i].push(false);
    }
  }

  // Scale based on columns and rows count
  resolution = Math.min(
    Math.floor(canvas.width / data.columns),
    Math.floor(canvas.height / data.rows)
  );

  // Center the grid inside the canvas
  xOffset = (canvas.width - data.columns * resolution) / 2;

  draw();
}

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.fillStyle = "#fff";
  c.strokeStyle = "#fff";
  c.shadowBlur = 10;
  c.shadowColor = "#5d00ff";

  c.lineWidth = 1;
  for (let i = 0; i < data.rows; i++) {
    for (let j = 0; j < data.columns; j++) {
      c.beginPath();
      c.arc(xOffset + j * resolution + resolution / 2, i * resolution + resolution / 2, resolution / 8, 0, Math.PI * 2);
      c.fill();
    }
  }

  c.lineWidth = 2;
  c.beginPath();
  for (const cell of path) {
    c.lineTo(xOffset + cell[0] * resolution + resolution / 2, cell[1] * resolution + resolution / 2);
  }
  c.stroke();
}

setup();
