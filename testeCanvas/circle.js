class Circle {
  constructor() {
    this.radius = 7
    this.setPos()
    this.pickColor()
    this.setSpeed()
  }

  setPos() {
    this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius
    this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius
  }

  setSpeed() {
    this.xSpeed = Math.random() * 0.8
    this.ySpeed = 0.8 - this.xSpeed
    if (Math.random() > 0.5){
      this.xSpeed *= -1
    }
    if (Math.random() > 0.5){
      this.ySpeed *= -1
    }
  }

  pickColor() {
    let i = Math.random() * 3
    if (i < 1) {
      this.color = '#f2f2f2'
    } else if (i < 2) {
      this.color = '#ffffff'
    } else {
      this.color = '#00f6f3'
    }
  }

  checkColision() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.xSpeed *= -1
    } else if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.ySpeed *= -1
    }
  }

  checkMouseNearby() {
    if (Math.abs(mouseX - this.x) < 70 && Math.abs(mouseY - this.y) < 70) {
      if (this.radius < 50) {
        this.radius += 4.9
      }
    } else {
      if (this.radius > 7) {
        this.radius -= 3.5
      }
    }
  }

  update() {
    this.checkMouseNearby()
    this.checkColision()
    this.x += this.xSpeed
    this.y += this.ySpeed
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true)
    c.fill()
    c.fillStyle = this.color
  }
}