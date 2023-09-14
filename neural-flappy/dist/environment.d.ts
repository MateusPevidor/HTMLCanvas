declare type Position = {
    x: number;
    y: number;
};
declare type Pipe = {
    position: Position;
    width: number;
    gapSize: number;
};
declare class Environment {
    private pipes;
    WIDTH: number;
    HEIGHT: number;
    private spawnPosition;
    private gapSize;
    private pipeLifeSpan;
    private pipeWidth;
    private pipeSpeed;
    private generationTimer;
    constructor(width: number, height: number);
    getNextPipePosition(position: Position): Position;
    getPipes(): Pipe[];
    startPipesGeneration(): void;
    stopPipesGeneration(): void;
    private generatePipe;
    draw(c: CanvasRenderingContext2D): void;
    update(): void;
}
export default Environment;
