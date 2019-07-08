class Controller {
  constructor() {
    this.addEventListeners()
    this.pressedKeys = {
      up: false,
      left: false,
      right: false,
      down: false
    }
  }

  setCurrentPiece(piece) {
    this.currentPiece = piece
  }

  addEventListeners() {
    addEventListener('keydown', e => {
      switch(e.keyCode) {
        case 37:
          if (!this.pressedKeys.left) {
            this.pressedKeys.left = true
            this.currentPiece.move('left')
          }
          break
        case 38:
          if (!this.pressedKeys.up) {
            this.pressedKeys.up = true
            this.currentPiece.move('turn')
          }
          break
        case 39:
          if (!this.pressedKeys.right) {
            this.pressedKeys.right = true
            this.currentPiece.move('right')
          }
          break
        case 40:
          if (!this.pressedKeys.down) {
            this.pressedKeys.down = true
            this.currentPiece.move('down')
          }
          break
      }
    })
    
    addEventListener('keyup', e => {
      switch(e.keyCode) {
        case 37:
          this.pressedKeys.left = false
          break
        case 38:
          this.pressedKeys.up = false
          break
        case 39:
          this.pressedKeys.right = false
          break
        case 40:
          this.pressedKeys.down = false
          break
      }
    })
  }
}