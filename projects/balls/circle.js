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
    const angle = Math.random() * Math.PI * 2;
    this.xSpeed = Math.cos(angle) * 0.8;
    this.ySpeed = Math.sin(angle) * 0.8;
  }

  pickColor() {
    const colors = ['#f2f2f2', '#ffffff', '#00f6f3'];
    const index = Math.floor(Math.random() * 3);
    this.color = colors[index];
  }

  checkCollision() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.xSpeed *= -1
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.ySpeed *= -1
    }
  }

  checkMouseNearby() {
    if (Math.abs(mouseX - this.x) < 70 && Math.abs(mouseY - this.y) < 70) {
      if (this.radius < 50) {
        this.radius += 4.9
      } else {
        this.radius = 50;
      }
    } else {
      if (this.radius > 7) {
        this.radius -= 3.5
      } else {
        this.radius = 7;
      }
    }
  }

  update() {
    this.checkMouseNearby()
    this.checkCollision()
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