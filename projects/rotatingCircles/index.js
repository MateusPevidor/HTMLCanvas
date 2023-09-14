const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const WIDTH = 1280;
const HEIGHT = 720;

canvas.width = WIDTH;
canvas.height = HEIGHT;

class Circle {
  constructor(distance, speed) {
    this.distance = distance;
    this.angle = 0;
    this.speed = speed;
    this.linkedTo = undefined;
  }

  update() {
    this.angle += this.speed;
  }

  draw() {
    const coordinates = this.getCoordinates();
    c.beginPath();
    c.arc(coordinates.x, coordinates.y, 6, 0, Math.PI * 2);
    c.fill();
    c.closePath();

    if (this.linkedTo) {
      const targetCoordinates = this.linkedTo.getCoordinates();
      c.beginPath();
      c.lineTo(coordinates.x, coordinates.y);
      c.lineTo(targetCoordinates.x, targetCoordinates.y);
      c.stroke();
      c.closePath();
    }

  }

  getCoordinates() {
    return {
      x: Math.cos(this.angle / 180 * Math.PI) * this.distance + WIDTH / 2,
      y: Math.sin(this.angle / 180 * Math.PI) * this.distance + HEIGHT / 2
    }
  }
}

const circles = [];
const circleCount = 20;
const globalSpeed = 0.15;

function setup() {
  for (let i = 0; i < circleCount; i++) {
    const speed = globalSpeed;
    circles.push(new Circle(i * 16, i * 1 * speed));
  }
  for (let i = 0; i < circleCount - 1; i++) {
    circles[i].linkedTo = circles[i + 1];
  }
}

function draw() {
  requestAnimationFrame(draw);
  c.clearRect(0, 0, WIDTH, HEIGHT);

  circles.forEach(circle => {
    circle.draw();
    circle.update();
  });
}

setup();
draw();