class Wall {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  draw() {
    c.fillStyle = '#ffffff'
    c.fillRect(this.x, this.y, this.w, this.h);
  }

  getInfo() {
    return {x: this.x, y: this.y, w: this.w, h: this.h}
  }
}