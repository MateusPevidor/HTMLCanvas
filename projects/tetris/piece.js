class Piece {
  constructor() {
    this.pos = [4, 1]
    this.key = Math.floor(Math.random()*7)
    this.matrix = pieceMatrixes[this.key]
    this.color = colors[this.key]
    this.collided = false
    this.rotation = 0
  }

  draw() {
    this.matrix.forEach((row, index) => {
      row.forEach((brick, idx) => {
        if (brick == 1) {
          c.fillStyle = this.color;
          c.fillRect(40 *( this.pos[0] ) + 40*idx, 40 *( this.pos[1] ) + 40*index, 40, 40)
        }
      })
    })
  }

  getFullMatrixCoords() {
    let coords = new Array()
    this.matrix.forEach((row, index) => {
      row.forEach((block, idx) => {
        if (block == 1)
          coords.push({ x: this.pos[0] + idx, y: this.pos[1] + index})
      })
    })
    return coords
  }

  checkCollidePieces() {
    let fullMatrix = []
    pieces.forEach(piece => {
      if (piece.collided)
        fullMatrix.push(piece.getFullMatrixCoords())
    })
    
    let pieceCoords = this.getFullMatrixCoords()
    pieceCoords.forEach(pieceBlock => {
      fullMatrix.forEach(setPiece => {
        setPiece.forEach(setBlock => {
          if (setBlock.x == pieceBlock.x && setBlock.y == pieceBlock.y ) {
            controller.currentPiece.collided = true
            return true
          }
        })
      })
    })
  }

  move(action) {
    switch(action) {
      case 'left':
        if (this.pos[0] > 0)
          this.pos[0] -= 1
        break
      case 'turn':
        this.rotate()
        break
      case 'right':
        if (this.pos[0] + this.matrix[0].length < 10)
          this.pos[0] += 1
        break
      case 'down':
        break
      
    }
  }

  rotate() {
    if (this.verifyCollisionBorders()) {
      return
    }

    this.matrix.reverse()
    this.matrix = this.matrix[0].map((col, i) => this.matrix.map(row => row[i]))
    this.rotation++
    this.rotation = this.rotation % 4
    
    

    if (this.key == 1) {
      if (this.rotation == 0) {
        this.pos[0]--
        this.pos[1]++
      }
      if (this.rotation == 1) {
        this.pos[0]
        this.pos[1]--
      }
      if (this.rotate == 2) {
        this.pos[1]--
      }
      if (this.rotation == 3) {
        this.pos[0]++
      }
    }

    if (this.key == 2) {
      if (this.rotation == 0) {
        this.pos[0]--
        this.pos[1]++
      }
      if (this.rotation == 1) {
        this.pos[1]--
      }
      if (this.rotation == 3) {
        this.pos[0]++
      }
    }

    if (this.key == 3) {
      if (this.rotation == 0 || this.rotation == 2) {
        this.pos[0] -= 2
        this.pos[1] += 2
      }
      if (this.rotation == 1 || this.rotation == 3) {
        this.pos[0] += 2
        this.pos[1] -= 2
      }
    }

    if (this.key == 4) {
      if (this.rotation == 0 || this.rotation == 2) {
        this.pos[0]--
        this.pos[1]++
      }
      if (this.rotation == 1 || this.rotation == 3) {
        this.pos[0]++
        this.pos[1]--
      }
    }

    if (this.key == 5) {
      if (this.rotation == 0 || this.rotation == 2) {
        this.pos[0]--
        this.pos[1]++
      }
      if (this.rotation == 1 || this.rotation == 3) {
        this.pos[0]++
        this.pos[1]--
      }
    }

    if (this.key == 6) {
      if (this.rotation == 0) {
        this.pos[0]--
        this.pos[1]++
      }
      if (this.rotation == 1) {
        this.pos[1]--
      }
      if (this.rotation == 3) {
        this.pos[0]++
      }
    }

    
  }

  verifyCollisionBorders() {
    if ((this.key == 1 || this.key == 2) && ((this.rotation == 3 && this.pos[0] == 0) || (this.rotation == 1 && this.pos[0] == 8))) {
      return true
    }
    if (this.key == 3 && (this.rotation == 1 || this.rotation == 3) && this.pos[0] < 2 || this.pos[0] > 8) {
      return true
    }
    if ((this.key == 4 || this.key == 5) && (this.rotation == 1 || this.rotation == 3) && this.pos[0] == 0) {
      return true
    }
    console.log(this.key, this.rotation, this.pos[0])
    if (this.key == 6 && (this.rotation == 3 && this.pos[0] == 0) || (this.rotation == 1 && this.pos[0] == 8)) {
      return true
    }
  }

  shift() {
    if ((this.pos[1] + this.matrix.length == 16 || this.checkCollidePieces()) && !this.collided){
      console.log('colidido')
      this.collided = true
    }
    if (!this.collided && this.pos[1] + this.matrix.length < 16)
      this.pos[1]++
  }

  
}