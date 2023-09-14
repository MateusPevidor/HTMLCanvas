import Environment from "./environment.js";
import NN from "./nn.js";
declare type Position = {
    x: number;
    y: number;
};
declare class Agent {
    private environment;
    private beliefState;
    bird: Position;
    private birdSize;
    private acceleration;
    fitness: number;
    startTime: number;
    deathTime: number;
    dead: boolean;
    nn: NN;
    ancient: boolean;
    constructor(environment: Environment, parent?: Agent);
    getCurrentFitness(): number;
    act(): void;
    percept(): void;
    start(): void;
    die(): void;
    draw(c: CanvasRenderingContext2D): void;
    update(): void;
}
export default Agent;
