import Piece from "./piece";

export default class Board {
  private cols: number;
  private rows: number;

  /**
   * 0: empty
   * 1: red
   * 2: green
   * 3: purple
   * 4: blue
   * 5: yellow
   * 6: gray
   */
  private colors = [null, '#f00', '#0f0', '#f0f', '#00f', '#ff0', '#888'];

  private board: number[][];

  public cellSize: number;

  constructor(cellSize: number, cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;

    this.cellSize = cellSize;

    this.initializeBoard();
  }

  private initializeBoard() {
    this.board = [];
    for (let i = 0; i < this.rows; i++) {
      this.board.push([]);
      for (let j = 0; j < this.cols; j++) {
        this.board[i].push(0);
        // this.board[i].push(Math.floor(Math.random() * 7));
      }
    }
  }

  public checkPieceColision(piece: Piece, dx: number, dy: number) {
    const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = piece.getPositions();
    console.log(x1, y1, "  ", x2, y2);
    
    if (y1 + dy == this.rows) return true;
    if (y2 + dy == this.rows) return true;

    if (this.board[y1 + dy][x1] != 0) return true;
    if (this.board[y1][x1 + dx] != 0) return true;

    if (this.board[y2 + dy][x2] != 0) return true;
    if (this.board[y2][x2 + dx] != 0) return true;
  }

  public dropPiece(piece: Piece) {

    function dropSingle(x: number, board: number[][], rows: number, type: number) {
      const drop = board.findIndex(row => {
        return row[x] != 0;
      });
      if (drop == -1) {
        board[rows - 1][x] = type;
      } else {
        board[drop - 1][x] = type;
      }
      return board;
    }

    const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = piece.getPositions();

    if (y1 > y2) {
      this.board = dropSingle(x1, this.board, this.rows, piece.type1);
      this.board = dropSingle(x2, this.board, this.rows, piece.type2);
    } else {
      this.board = dropSingle(x2, this.board, this.rows, piece.type2);
      this.board = dropSingle(x1, this.board, this.rows, piece.type1);
    }

    console.table(this.board);
  }

  public draw(canvas: HTMLCanvasElement) {
    const c = canvas.getContext('2d');
    
    const offset = 4;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.board[i][j] == 0) continue;

        const type = this.board[i][j];
        const color = this.colors[type];

        const neighbors = [
          i > 0 && this.board[i - 1][j] == type,
          j < this.cols && this.board[i][j + 1] == type,
          i < this.rows - 1 && this.board[i + 1][j] == type,
          j > 0 && this.board[i][j - 1] == type
        ];
        
        const centerX = j * this.cellSize + this.cellSize / 2;
        const centerY = i * this.cellSize + this.cellSize / 2;

        c.beginPath();
        c.arc(centerX, centerY, this.cellSize / 2 - offset, 0, Math.PI * 2);
        c.fillStyle = color;
        c.fill();

        neighbors.forEach((hasNeighbor, n) => {
          if (hasNeighbor) {
            let x: number, y: number, w: number, h: number;

            if (n == 0) {
              x = j * this.cellSize + offset;
              y = i * this.cellSize - this.cellSize / 2;
              w = this.cellSize - offset * 2;
              h = this.cellSize;
            } else if (n == 1) {
              x = j * this.cellSize + this.cellSize / 2;
              y = i * this.cellSize + offset;
              w = this.cellSize;
              h = this.cellSize - offset * 2;
            } else if (n == 2) {
              x = j * this.cellSize + offset;
              y = i * this.cellSize + this.cellSize / 2;
              w = this.cellSize - offset * 2;
              h = this.cellSize;
            } else if (n == 3) {
              x = j * this.cellSize - this.cellSize / 2;
              y = i * this.cellSize + offset;
              w = this.cellSize;
              h = this.cellSize - offset * 2;
            }
            c.fillRect(x, y, w, h);
          }
        });
      }
    }
  }
}