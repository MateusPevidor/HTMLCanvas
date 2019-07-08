class Particle {
  constructor(radius) {
    this.radius = radius
    this.angle = Math.random() * 360
    this.x = innerWidth/2
    this.y = innerHeight/2
    this.color = this.pickColor()
    this.speed = Math.random() * 2 + 2
  }

  pickColor() {
    let i = Math.floor(Math.random() * 5) + 2
    switch(i) {
      case 2:
        return '#ccf7ff'
      case 3:
        return '#9cebff'
      case 4:
        return '#76e3ff'
      case 5:
        return '#46d9f9'
    }
  }

  update() {
    this.angle += this.speed
    this.x = (this.radius * Math.cos(this.angle * Math.PI/180)) + innerWidth/2
    this.y = (this.radius * Math.sin(this.angle * Math.PI/180)) + innerHeight/2
    if (this.angle >= 360)
      this.angle = 0
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, 10, 0, Math.PI*2, true)
    c.fillStyle = this.color
    c.fill()
    this.drawTail()
  }

  drawTail() {
    c.beginPath()
    c.arc(innerWidth/2, innerHeight/2, this.radius, this.angle * Math.PI/180, (this.angle - 120) * Math.PI/180, true)
    c.strokeStyle = this.color
    c.lineWidth = 20
    c.stroke()
  }
}