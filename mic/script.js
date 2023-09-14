start();

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const WIDTH = 1280;
const HEIGHT = 720;

canvas.width = WIDTH;
canvas.height = HEIGHT;

let offset = 0;
const scrollSpeed = 12;

const noteRange = 9;

function draw() {
  requestAnimationFrame(draw);
  c.clearRect(0, 0, WIDTH, HEIGHT);
  c.fillStyle = '#000000';
  c.strokeStyle = '#000000';

  c.fillStyle = '#005';
  notes.forEach((note, i) => {
    if (note.note) {
      c.strokeRect((WIDTH - offset + note.position), (noteRange - 1 - note.note) * 80, note.duration * 100, 80);
      c.fillRect((WIDTH - offset + note.position), (noteRange - 1 - note.note) * 80, note.duration * 100, 80);
    }
  });

  for (let i = 0; i < noteRange; i++) {
    if (noteRange - 1 - currentNote == i && currentVolume > 0.1) {
      c.fillStyle = '#555';
      c.fillRect(20, i * 80, 20, 80);
    } else {
      c.strokeRect(20, i * 80, 20, 80)
    }
  }

  offset += scrollSpeed;
}

draw();