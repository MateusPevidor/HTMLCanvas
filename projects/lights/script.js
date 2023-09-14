class Light {
  constructor(x, y, color, strength) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.strength = strength;

    this.xSpeed = Math.random() * 150 - 75;
    this.ySpeed = Math.random() * 150 - 75;
  }

  getIntensityAtPoint(x, y) {
    const distance = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2)) * 2;

    const intensity = (-Math.sqrt(distance) + this.strength * 0.2) * (this.strength / 4);
    return intensity >= 0 ? intensity : 0;
  }

  update() {
    this.x += this.xSpeed * deltaTime;
    this.y += this.ySpeed * deltaTime;

    if (this.x < 0) {
      this.xSpeed *= -1;
      this.x = 0;
    }
    if (this.x > canvas.width) {
      this.xSpeed *= -1;
      this.x = canvas.width;
    }
    if (this.y < 0){
      this.ySpeed *= -1;
      this.y = 0;
    }
    if (this.y > canvas.height) {
      this.ySpeed *= -1;
      this.y = canvas.height;
    }
  }
}

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const fpsRef = document.getElementById('fps');

canvas.width = 240;
canvas.height = 135;

const imageData = c.createImageData(canvas.width, canvas.height);

const lights = [];

const colors = [
  { r: 255, g: 0, b: 0 },
  { r: 0, g: 255, b: 0 },
  { r: 0, g: 0, b: 255 },
  { r: 255, g: 255, b: 0 },
  { r: 255, g: 0, b: 255 },
  { r: 0, g: 255, b: 255 },
  { r: 255, g: 255, b: 255 },
]

function setup() {
  const lightCount = 15;
  for (let i = 0; i < lightCount; i++) {
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);

    lights.push(new Light(x, y, colors[i % colors.length], Math.random() * 10 + 50));
  }
}

let deltaTime = 0;
let lastFrameTime = Date.now();
function draw() {
  requestAnimationFrame(draw);
  const currentTime = Date.now();
  deltaTime = (Date.now() - lastFrameTime) / 1000;
  lastFrameTime = currentTime;
  fpsRef.innerText = Math.floor(1 / deltaTime);
  c.fillStyle = "#000";
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < canvas.height; i++) {
    for (let j = 0; j < canvas.width; j++) {
      let brightness = 0;
      let color = { r: 0, g: 0, b: 0 };
      for (let k = 0; k < lights.length; k++) {
        const localBrightness = lights[k].getIntensityAtPoint(j, i);
        brightness += localBrightness
        color.r += lights[k].color.r / 255 * localBrightness;
        color.g += lights[k].color.g / 255 * localBrightness;
        color.b += lights[k].color.b / 255 * localBrightness;
      }
      
      const index = (i * canvas.width + j) * 4;

      imageData.data[index + 0] = color.r;
      imageData.data[index + 1] = color.g;
      imageData.data[index + 2] = color.b;
      imageData.data[index + 3] = brightness;
    }
  }
  c.putImageData(imageData, 0, 0);

  for (let k = 0; k < lights.length; k++) {
    lights[k].update();
  }

}

setup();
draw();