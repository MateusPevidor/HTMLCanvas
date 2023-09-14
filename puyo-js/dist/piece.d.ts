export default class Piece {
    x: number;
    y: number;
    type1: number;
    type2: number;
    rotation: number;
    private cellSize;
    private colors;
    constructor(x: number, y: number, cellSize: number, type1?: number, type2?: number);
    move(dx: number, dy: number): void;
    rotate(direction: 'clockwise' | 'counterClockwise'): void;
    getPositions(): {
        x: number;
        y: number;
    }[];
    draw(canvas: HTMLCanvasElement): void;
}
