const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const WIDTH = 1280;
const HEIGHT = 720;

canvas.width = WIDTH;
canvas.height = HEIGHT;

function degToRad(t) {
  return t * Math.PI / 180;
}

function angleBetweenTwoVectors(v1, v2) {
  const n = v1.x * v2.x + v1.y * v2.y;
  const d = Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2)) * Math.sqrt(Math.pow(v2.x, 2) + Math.pow(v2.y, 2));
  const angle = Math.acos(n / d) / Math.PI * 180;
  return angle;
}

function angleOfVector(v) {
  return -Math.atan2(v.y, v.x) / Math.PI * 180;
}

class Circle {
  constructor() {
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
    this.oldX = this.x;
    this.oldY = this.y;
    this.radius = 32;
    this.angle = 0;

    this._angle = 0;
    this.distance = 100;
  }

  update() {
    this.angle = angleOfVector({ x: this.x - this.oldX, y: this.y - this.oldY });
    
    this.oldX = this.x;
    this.oldY = this.y;

    this._angle += 0.1 * simSpeed;
    this.distance += 0.002 * simSpeed;
  }

  draw() {
    c.save();

    c.translate(this.x, this.y);
    c.rotate(Math.PI / 2 - degToRad(this.angle));

    c.strokeStyle = "rgb(141, 114, 46)";
    c.fillStyle = "rgb(83, 78, 63)";

    c.lineWidth = 4;

    c.beginPath();
    c.arc(0, 0, this.radius - 2, 0, Math.PI * 2, true);
    c.fill();
    c.closePath();

    c.beginPath();
    c.arc(0, 0, this.radius, 0, Math.PI, true);
    c.stroke();
    c.closePath();

    c.restore();
  }
}

const circle = new Circle();
const simSpeed = 10;

function draw() {
  requestAnimationFrame(draw);

  circle.update();
  circle.draw();
}

canvas.addEventListener("click", e => {
  c.clearRect(0, 0, WIDTH, HEIGHT);
});

canvas.addEventListener("mousemove", e => {
  circle.x = e.offsetX;
  circle.y = e.offsetY;
});

draw();
