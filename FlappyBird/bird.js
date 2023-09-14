const gravity = innerHeight/2000
let dead = false
let score = 0

class Bird {
  constructor() {
    this.radius = innerHeight / 30
    this.x = innerWidth / 5
    this.y = innerHeight / 4

    this.ySpeed = 0
  }

  checkCollision() {
    pipes.forEach(pipe => {
      if ((this.x + this.radius > pipe.x &&
           this.x - this.radius < pipe.x + pipe.w) &&
          (this.y - this.radius < pipe.gapY || 
           this.y + this.radius > pipe.gapY + pipe.gapHeight) ||
          (this.y + this.radius >= innerHeight ||
           this.y - this.radius <= 0
      )){
        dead = true
      }
    })
  }

  checkScored() {
    pipes.forEach(pipe => {
      if (!pipe.counted && pipe.x + pipe.w < this.x) {
        score++
        updateScore()
        pipe.counted = true
      }
    })
  }
  
  flap() {
    if (!dead)
      this.ySpeed = -innerHeight/100
  }

  update() {
    this.checkCollision()
    this.checkScored()
    this.ySpeed += gravity
    this.y += this.ySpeed
  }

  draw() {
    c.fillStyle = '#ff0'
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    c.fill()
    c.stroke()
  }
}