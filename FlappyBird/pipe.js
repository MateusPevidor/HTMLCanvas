class Pipe {
  constructor(startingPosition) {
    this.x = innerWidth + startingPosition
    this.y = 300
    this.w = innerWidth / 10
    this.h = 100
    this.gapY = this.getGapPosition()
    this.gapHeight = innerHeight / 3

    this.xSpeed = 5
    this.counted = false;
  }

  update() {
    this.checkReset()
    if (!dead)
      this.x -= this.xSpeed
  }

  checkReset() {
    if (this.x + this.w < 0) {
      for (let i = 0; i < 6; i++) {
        if (this.x == pipes[i].x) {
          let idx
          if (i == 0) {
            idx = 5
          } else {
            idx = i-1
          }
          this.x = pipes[idx].x + 400
          this.gapY = this.getGapPosition()
          this.counted = false
        }
      }
    }
  }

  getGapPosition() {
    return Math.random() * innerHeight / 2 + 50
  }

  draw() {
    c.fillStyle = '#73be2e'
    c.beginPath()
    c.fillRect(this.x, 0, this.w, this.gapY)
    c.strokeRect(this.x, 0, this.w, this.gapY)

    c.beginPath()
    c.fillRect(this.x, this.gapY + this.gapHeight, this.w, innerHeight - this.gapY - this.gapHeight)
    c.strokeRect(this.x, this.gapY + this.gapHeight, this.w, innerHeight - this.gapY - this.gapHeight)
  }
}