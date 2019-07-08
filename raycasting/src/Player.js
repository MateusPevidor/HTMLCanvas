class Player {
  constructor() {
    this.x = 400
    this.y = 400
    this.size = 10
    this.angle = 0

    this.speed = {x: 0, y: 0}
    this.acceleration = 0.5;

    this.fov = 30
    this.viewDistance = 500
    this.rayCount = 90

    this.rays = new Array()
    for (let i = 0; i < this.rayCount; i++)
      this.rays.push(new Ray())

    this.prevPosition = {x: 400, y: 400}
  }

  updateLook(mouse) {
    let distX = mouse.x - this.x
    let distY = this.y - mouse.y

    this.angle = Math.atan2(distY, distX) * 180/Math.PI
  }

  verifyColision(walls) {
    for (let i = 0; i < walls.length; i++) {
      if (this.x >= walls[i].x && this.x <= walls[i].x + walls[i].w &&
          this.y >= walls[i].y && this.y <= walls[i].y + walls[i].h) {
          this.speed.x = 0
          this.speed.y = 0
          this.x = this.prevPosition.x
          this.y = this.prevPosition.y
          return
      }
    }
    this.prevPosition.x = this.x
    this.prevPosition.y = this.y
  }

  move(inputs, walls) {
    let friction = 0.02
    if (this.speed.x > 0) {
      this.speed.x -= this.speed.x * friction
    } else if (this.speed.x < 0) {
      this.speed.x += -this.speed.x * friction
    }
    if (this.speed.y > 0) {
      this.speed.y -= this.speed.y * friction
    } else if (this.speed.y < 0) {
      this.speed.y += -this.speed.y * friction
    }

    if (inputs.up) {
      this.speed.y -= this.acceleration
    }
    if (inputs.down) {
      this.speed.y += this.acceleration
    }
    if (inputs.left) {
      this.speed.x -= this.acceleration
    }
    if (inputs.right) {
      this.speed.x += this.acceleration
    }

    this.verifyColision(walls);

    this.x += this.speed.x
    this.y += this.speed.y
  }

  draw() {
    this.drawRays()
    
    c.fillStyle = '#ffffff'
    c.beginPath()
    c.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
    c.fill()
    c.closePath()

  }

  drawRays() {
    let rayOffset = this.fov / (this.rayCount - 1)
    c.beginPath()
    c.fillStyle = 'rgba(255, 255, 255, 0.3)'
    c.moveTo(this.x, this.y)
    for (let i = 0; i < this.rays.length; i++) {
      let pos = this.rays[i].fire(this.x, this.y, (rayOffset*i - this.angle - this.fov/2) /180*Math.PI, 1, walls, 0, this.viewDistance/1)
      if (pos != null) {
        c.lineTo(pos.x, pos.y)
      } else {
        
      }
    }
    c.closePath()
    c.fill()
  }
}