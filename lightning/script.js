const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const WIDTH = 1280;
const HEIGHT = 720;

canvas.width = WIDTH;
canvas.height = HEIGHT;

class LightningBranch {
  constructor(prev, direction, strength) {
    this.prev = prev;
    this.direction = direction;
    this.strength = strength;
    this.setPos();
    if (strength > 1) {
      this.next = new LightningBranch(this, this.direction, this.strength - 1.5);
    }

    const shouldBranch = Math.random() * 10 < 4;
    if (shouldBranch) {
      const directionDiff = Math.random() * Math.PI / 1.5 - Math.PI / 3;
      this.branch = new LightningBranch(this, this.direction + directionDiff, this.strength / 1.6);
    }
    this.shouldDraw = false;
  }

  setPos() {
    const directionDiff = Math.random() * Math.PI / 3 - Math.PI / 6; // [-30, 30] deg
    const newDirection = this.direction + directionDiff;

    this.pos = {
      x: this.prev.pos.x + this.strength * Math.cos(newDirection),
      y: this.prev.pos.y + this.strength * Math.sin(newDirection),
    }
  }

  draw() {
    if (this.shouldDraw) {
      if (this.next) {
        c.beginPath();
        c.lineTo(this.pos.x, this.pos.y);
        c.lineTo(this.next.pos.x, this.next.pos.y);
    
        c.lineWidth = this.next.strength / 10;
        c.strokeStyle = "#fff";
        c.stroke();
        this.next.draw();
        this.next.shouldDraw = true;
      }
      if (this.branch) {
        c.beginPath();
        c.lineTo(this.pos.x, this.pos.y);
        c.lineTo(this.branch.pos.x, this.branch.pos.y);
    
        c.lineWidth = this.branch.strength / 10;
        c.strokeStyle = "#fff";
        c.stroke();
        this.branch.draw();
        this.branch.shouldDraw = true;
      }
    }
  }
}

class Lightning {
  constructor(x, y) {
    this.pos = { x, y };
    this.direction = Math.random() * Math.PI;
    this.strength = 50;
    this.next = new LightningBranch(this, this.direction, this.strength);
  }

  draw() {
    if (this.next) {
      c.beginPath();
      c.lineTo(this.pos.x, this.pos.y);
      c.lineTo(this.next.pos.x, this.next.pos.y);
  
      c.lineWidth = this.strength / 10;
      c.strokeStyle = "#fff";
      c.stroke();

      this.next.draw();
      this.next.shouldDraw = true;
    }
  }
}

let lightning;

function draw() {
  requestAnimationFrame(draw);
  if (lightning) {
    c.clearRect(0, 0, WIDTH, HEIGHT);
    lightning.draw();
  }
}

canvas.addEventListener('mousedown', e => {
  lightning = new Lightning(e.offsetX, e.offsetY);
});

draw();
