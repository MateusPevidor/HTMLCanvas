import Time from "./time.js";
class Environment {
    constructor(width, height) {
        this.gapSize = 200;
        this.pipeLifeSpan = 6000;
        this.pipeWidth = 120;
        this.pipeSpeed = 600;
        this.pipes = [];
        this.WIDTH = width;
        this.HEIGHT = height;
        this.spawnPosition = {
            x: width,
            y: 100
        };
    }
    getNextPipePosition(position) {
        var _a;
        return (_a = this.pipes.filter(pipe => {
            return position.x < pipe.position.x + this.pipeWidth / 2;
        })[0]) === null || _a === void 0 ? void 0 : _a.position;
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
    generatePipe() {
        const position = Object.assign({}, this.spawnPosition);
        const gapVariation = Math.random() * (this.HEIGHT - position.y - this.gapSize - 100);
        position.y += Math.floor(gapVariation);
        this.pipes.push({ position, width: this.pipeWidth, gapSize: this.gapSize });
        setTimeout(() => this.pipes.splice(0, 1), this.pipeLifeSpan);
    }
    draw(c) {
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
//# sourceMappingURL=environment.js.map