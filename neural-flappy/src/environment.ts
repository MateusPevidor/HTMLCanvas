import Time from "./time";

type Position = {
  x: number;
  y: number;
}

type Pipe = {
  position: Position;
  width: number;
  gapSize: number;
}

class Environment {

  private pipes: Pipe[];

  public WIDTH: number;
  public HEIGHT: number;

  private spawnPosition: Position;
  private gapSize = 200;
  private pipeLifeSpan = 6000;
  private pipeWidth = 120;
  private pipeSpeed = 600;

  private generationTimer: NodeJS.Timer;

  constructor(width: number, height: number) {
    this.pipes = [];

    this.WIDTH = width;
    this.HEIGHT = height;

    this.spawnPosition = {
      x: width,
      y: 100
    }
  }

  getNextPipePosition(position: Position) {
    return this.pipes.filter(pipe => {
      return position.x < pipe.position.x + this.pipeWidth / 2
    })[0]?.position;
  }

  getPipes() {
    return this.pipes;
  }

  startPipesGeneration() {
    this.generatePipe();
    this.generationTimer = setInterval(() => this.generatePipe(), 1600);
  }

  stopPipesGeneration() {
    clearInterval(this.generationTimer);
  }

  private generatePipe() {
    const position = Object.assign({}, this.spawnPosition);

    const gapVariation = Math.random() * (this.HEIGHT - position.y - this.gapSize - 100);
    position.y += Math.floor(gapVariation);

    this.pipes.push({ position, width: this.pipeWidth, gapSize: this.gapSize });
    setTimeout(() => this.pipes.splice(0, 1), this.pipeLifeSpan);
  }

  draw(c: CanvasRenderingContext2D) {
    this.pipes.forEach(pipe => {
      c.fillRect(pipe.position.x, 0, this.pipeWidth, pipe.position.y);
      c.fillRect(pipe.position.x, pipe.position.y + this.gapSize, this.pipeWidth, this.HEIGHT - this.gapSize - pipe.position.y);
    });
  }

  update() {
    const newPipes = this.pipes.map(pipe => {
      pipe.position.x -= this.pipeSpeed * Time.deltaTime;
      return pipe;
    });

    this.pipes = newPipes;
  }
}

export default Environment;