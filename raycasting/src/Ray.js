class Ray {
  fire(x, y, angle, precision, walls, count, limit) {
    if (
      count == limit ||
      x < (-limit)*precision ||
      x > 800 + limit*precision ||
      y < (-limit)*precision ||
      y > 800 + limit*precision
    ) {
      return {x, y}
    }
    for (let i = 0; i < walls.length; i++) {
      if (x >= walls[i].x && x <= walls[i].x + walls[i].w &&
          y >= walls[i].y && y <= walls[i].y + walls[i].h) {
        return {x, y}
      }
    }
    const newX = x + precision * (Math.cos(angle))
    const newY = y + precision * (Math.sin(angle))
    count++
    return this.fire(newX, newY, angle, precision, walls, count, limit)
  }
}