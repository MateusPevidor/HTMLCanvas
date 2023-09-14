const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const colors = [
  { r: 255, g: 0, b: 0 },
  { r: 0, g: 255, b: 0 },
  { r: 0, g: 0, b: 255 },
  { r: 255, g: 255, b: 0 },
  { r: 255, g: 0, b: 255 },
  { r: 0, g: 255, b: 255 },
];

canvas.width = 1280;
canvas.height = 720;

const points = [];
// const points = [
//   { x: 720, y: 0 },
//   { x: 720, y: 720 },
//   { x: 0, y: 360 },
//   { x: 1280, y: 360 },
//   { x: 720, y: 360 },
// ];

const width = canvas.width;
const height = canvas.height;

for (let i = 0; i < 25; i++) {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);

  points.push({ x, y });
}

function draw() {
  c.clearRect(0, 0, width, height);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let minDistance = 999999;
      let n = -1;
      for (let k = 0; k < points.length; k++) {
        const distance = Math.sqrt(Math.pow(points[k].x - j, 2) + Math.pow(points[k].y - i, 2));
        if (distance < minDistance) {
          minDistance = distance;
          n = k;
        }
      }

      const alpha = Math.floor(minDistance / 2) / 255;

      const color = colors[n % 6];
      const style = `rgba(${color.r}, ${color.g}, ${color.b}, ${1 - alpha})`;

      c.fillStyle = style;
      c.fillRect(j, i, 1, 1);
    }
  }
}

draw();

canvas.addEventListener('click', e => {
  points.push({ x: e.offsetX, y: e.offsetY });
  draw();
})