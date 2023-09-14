const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let WIDTH;
let HEIGHT;

let center;
let radius;
let numPoints;
let points;
let pointsSequences;
let numSequences;

function setup() {
  canvas.width = 800;
  canvas.height = 800;
  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  center = {
    x: WIDTH / 2,
    y: HEIGHT / 2
  }
  radius = 150;
  numPoints = 12;

  numSequences = 0;
  pointsSequences = [];

  generatePoints();
}

function draw() {
  c.clearRect(0, 0, WIDTH, HEIGHT);

  // Drawing points
  points.forEach(point => {
    c.beginPath();
    c.arc(point.x, point.y, 3, 0, Math.PI * 2);
    c.fill();
    c.closePath();
  });

  // Drawing lines
  pointsSequences.forEach(ps => {
    if (ps.length) {
      let index = 0;
      let numIter = 0;

      c.beginPath();
      while ((index % numPoints != 0 || numIter % ps.length != 0) || numIter == 0) {
        index += ps[numIter % ps.length];
        index = index % numPoints;
        c.lineTo(points[index].x, points[index].y);

        numIter++;
        if (numIter > 10000) break;
      }
      c.closePath();
      c.stroke();
    }
  });
}

function generatePoints() {
  points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (Math.PI * 2 / numPoints) * i - Math.PI / 2;
    const point = {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    }
    points.push(point);
  }
}

setup();
draw();