const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let WIDTH;
let HEIGHT;

let resolution;

const boardSize = 20;
const path = new HamiltonianPath(boardSize);

function setup() {
  canvas.width = 800;
  canvas.height = 800;

  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  resolution = WIDTH / boardSize;

  const startTime = Date.now();
  path.generate(10000);
  const endTime = Date.now();
  console.log(endTime - startTime);
}
let k = 0;
function draw() {
  requestAnimationFrame(draw);
  c.clearRect(0, 0, WIDTH, HEIGHT);

  

  // Drawing vertices
  for (let i = 0; i < path.size; i++) {
    for (let j = 0; j < path.size; j++) {
      c.beginPath();
      c.arc(j * resolution + resolution / 2, i * resolution + resolution / 2, resolution / 14, 0, Math.PI * 2);
      if (i * path.size + j == path.head) {
        c.fillStyle = "#f00";
      } else if (i * path.size + j == path.tail) {
        c.fillStyle = "#00f";
      } else if (path.graph.getNeighbors(i * path.size + j).length == 0) {
        c.fillStyle = "#0ff";
      }
      c.fill();
      c.fillStyle = "#000";
    }
  }

  // Drawing edges
  for (let i = 0; i < path.graph.getVertexCount(); i++) {
    const sourceX = (i % boardSize) * resolution + resolution / 2;
    const sourceY = Math.floor(i / boardSize) * resolution + resolution / 2;
    for (let j = 0; j < path.graph.getNeighbors(i).length; j++) {
      index = path.graph.getNeighbors(i)[j];

      const targetX = (index % boardSize) * resolution + resolution / 2;
      const targetY = Math.floor(index / boardSize) * resolution + resolution / 2;

      c.beginPath();
      c.lineTo(sourceX, sourceY);
      c.lineTo(targetX, targetY);
      c.stroke();
      c.beginPath();

      // const x = sourceX + (targetX - sourceX) * 0.8;
      // const y = sourceY + (targetY - sourceY) * 0.8;
      // c.arc(x, y, 2, 0, Math.PI * 2);
      // c.fillStyle = "#f00";
      // c.fill();
      // c.fillStyle = "#000";
    }
  }
}

// const id = setInterval(() => path.backbite(), 30)

setup();
draw();