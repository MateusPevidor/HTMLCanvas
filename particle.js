class Particle {
  constructor() {
    this.x = Math.random() * (width - 100) + 50
    this.y = Math.random() * (height - 100) + 50
    this.z = Math.random() * 360
    this.radius = (3 + this.z / 60) * radiusAmplifier
    this.xSpeed = Math.random() * .6 - .3
    this.ySpeed = Math.random() * .6 - .3
    this.zSpeed = Math.random() * .6 - .3
  }
  
  drawLines(particles) {
    particles.forEach(particle => {
      let xDistance = Math.abs(particle.x - this.x)
      let yDistance = Math.abs(particle.y - this.y)
      let zDistance = Math.abs(particle.z - this.z)
      let distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2) + Math.pow(zDistance, 2))
      if (distance <= lineDistance) {
        this.drawLine(particle)
      }
    })
  }

  drawLine(particle) {
    c.beginPath()
    c.moveTo(this.x, this.y)
    c.lineTo(particle.x, particle.y)
    c.strokeStyle = `${hexToRgbA(lineColor)} ${(this.radius + particle.radius - 6) * radiusAmplifier * 0.084})`
    c.lineWidth = (lineWidth-1) + (this.radius + particle.radius - 6) * radiusAmplifier * 0.125
    c.stroke()
  }

  checkColision() {
    if (this.x + this.radius >= width || this.x - this.radius <= 0) {
      this.xSpeed *= -1
    }
    if (this.y + this.radius >= height || this.y - this.radius <= 0) {
      this.ySpeed *= -1
    }
    if (this.z <= 0 || this.z >= depth) {
      this.zSpeed *= -1
    }
  }

  update(particles) {
    this.checkColision()
    this.x += this.xSpeed * speedAmplifier
    this.y += this.ySpeed * speedAmplifier
    this.z += this.zSpeed * speedAmplifier
    this.radius = (3 + this.z / 60) * radiusAmplifier
    if (document.getElementById('lineBox').checked)
      this.drawLines(particles)
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI / 180, true)
    c.fillStyle = `${hexToRgbA(fillColor)} ${(this.z) / 360})`
    c.strokeStyle = `${hexToRgbA(strokeColor)} ${(this.z) / 360})`
    if (document.getElementById('fillBox').checked)
      c.fill()
    if (document.getElementById('strokeBox').checked)
      c.stroke()
  }
}