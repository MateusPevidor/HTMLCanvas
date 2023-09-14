class Square {
  constructor(i, j) {
    this.i = i
    this.j = j
    this.isOpen = false
    this.hasBomb = false
    this.flagged = false
    this.flagSprite = new Image()
    this.flagSprite.src = 'assets/flag.png'
    this.bombSprite = new Image()
    this.bombSprite.src = 'assets/bomb.png'
  }

  addBomb() {
    if (this.hasBomb) {
      return false
    }
    this.hasBomb = true
    return true
  }

  calcNearbyBombs() {
    this.nearbyBombs = 0
    if (this.hasBomb)
      return
    for (let deltaI = -1; deltaI < 2; deltaI++) {
      for (let deltaJ = -1; deltaJ < 2; deltaJ++) {
        if (!(deltaI == 0 && deltaJ == 0)) {
          if (board.getSquare(this.i + deltaI, this.j + deltaJ) != undefined) {
            this.nearbyBombs += board.getSquare(this.i + deltaI, this.j + deltaJ).hasBomb
          }
        }
          
      }
    }
  }

  draw() {
    c.font = 'bold 28px Arial'
    c.fillStyle = '#ffffff'
    c.strokeStyle = '#000000'
    if (this.isOpen) {
      c.fillStyle = '#cccccc'
      c.strokeStyle = '#999999'
    }
    c.fillRect(this.j * 32, this.i * 32, width / widthCoef , height / boardSize.rows)
    c.strokeRect(this.j * 32, this.i * 32, width / widthCoef , height / boardSize.rows)
    if (this.isOpen) {
      c.fillStyle = this.getColor(this.nearbyBombs)
      c.textBaseline = 'top'
      c.textAlign = 'center'
      c.fillText(this.nearbyBombs, this.j * 32 + 16, this.i * 32 + 4)
    }
    if (this.flagged) {
      c.drawImage(this.flagSprite, this.j * 32, this.i * 32)
    } else if (this.hasBomb && this.isOpen){
      c.drawImage(this.bombSprite, this.j * 32, this.i * 32)
    }


  }

  getColor(i) {
    const colors = [
      '#0000ff',
      '#008000',
      '#ff0000',
      '#000066',
      '#990066',
      '#007878',
      '#000000',
      '#666666'
    ];

    return colors[i - 1];
  }
}