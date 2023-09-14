export default class Piece {
    constructor(x, y, cellSize, type1 = 0, type2 = 0) {
        this.rotation = 0;
        this.colors = [null, '#f00', '#0f0', '#f0f', '#00f', '#ff0', '#888'];
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        if (type1) {
            this.type1 = type1;
        }
        else {
            this.type1 = Math.floor(Math.random() * 5 + 1);
        }
        if (type2) {
            this.type2 = type2;
        }
        else {
            this.type2 = Math.floor(Math.random() * 5 + 1);
        }
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
    rotate(direction) {
        if (direction == 'clockwise')
            this.rotation -= Math.PI / 2;
        else
            this.rotation += Math.PI / 2;
    }
    getPositions() {
        const p1 = {
            x: this.x,
            y: this.y
        };
        const p2 = {
            x: this.x + Math.round(Math.cos(this.rotation)),
            y: this.y - Math.round(Math.sin(this.rotation))
        };
        return [p1, p2];
    }
    draw(canvas) {
        const c = canvas.getContext('2d');
        const offset = 4;
        let x = this.x * this.cellSize + this.cellSize / 2;
        let y = this.y * this.cellSize + this.cellSize / 2;
        c.beginPath();
        c.arc(x, y, this.cellSize / 2 - offset, 0, Math.PI * 2);
        c.fillStyle = this.colors[this.type1];
        c.fill();
        x += Math.round(Math.cos(this.rotation)) * this.cellSize;
        y -= Math.round(Math.sin(this.rotation)) * this.cellSize;
        c.beginPath();
        c.arc(x, y, this.cellSize / 2 - offset, 0, Math.PI * 2);
        c.fillStyle = this.colors[this.type2];
        c.fill();
    }
}
//# sourceMappingURL=piece.js.map