import Piece from "./piece";
export default class Board {
    private cols;
    private rows;
    private colors;
    private board;
    cellSize: number;
    constructor(cellSize: number, cols: number, rows: number);
    private initializeBoard;
    checkPieceColision(piece: Piece, dx: number, dy: number): boolean;
    dropPiece(piece: Piece): void;
    draw(canvas: HTMLCanvasElement): void;
}
