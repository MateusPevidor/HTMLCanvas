import Environment from "./environment.js";
import NN from "./nn.js";
import Time from "./time.js";

type Position = {
  x: number,
  y: number
}

class Agent {

  private environment: Environment;
  private beliefState: Position;

  public bird: Position;
  private birdSize = 20;
  private acceleration = 0;

  public fitness = 0;
  public startTime: number = -1;
  public deathTime: number = -1;
  public dead = false;
  public nn: NN;

  public ancient = false;

  constructor(environment: Environment, parent: Agent = null) {
    this.environment = environment;

    this.bird = { x: 150, y: this.environment.HEIGHT / 2 };

    if (parent) {
      const mutation = Math.random() * 1000 > 900;
      const change = mutation ? 350 : 10;
      this.nn = new NN();
      this.nn.set(parent.nn, change);
    } else {
      this.nn = new NN();
    }
  }

  getCurrentFitness() {
    return this.fitness + (Date.now() - this.startTime);
  }

  act() {
    // Flap

    this.nn.setInput(this.beliefState.x, this.beliefState.y);
    const result = this.nn.feedForward();

    if (result > 0.5) {
      this.acceleration = -650;
    }
  }

  percept() {
    const pipePosition = this.environment.getNextPipePosition(this.bird);
    if (!pipePosition) return;

    const distance = { x: (pipePosition.x - this.bird.x) / 1000, y: pipePosition.y - this.bird.y };
    this.beliefState = distance;

    // Collision
    const pipes = this.environment.getPipes();
    pipes.forEach(pipe => {
      if (this.bird.x + this.birdSize < pipe.position.x || this.bird.x - this.birdSize > pipe.position.x + pipe.width) return;
      if (this.bird.y + this.birdSize < pipe.position.y + pipe.gapSize && this.bird.y - this.birdSize > pipe.position.y) return;
      this.die();
    });

    if (this.bird.y + this.birdSize > this.environment.HEIGHT) {
      this.die();
    }
  }

  start() {
    this.bird = { x: 150, y: this.environment.HEIGHT / 2 };
    this.acceleration = 0;
    this.startTime = Date.now();
    this.fitness = 0;
    this.dead = false;
    this.deathTime = -1;
  }

  die() {
    this.deathTime = Date.now();
    this.dead = true;

    this.fitness += (Date.now() - this.startTime) * 1;
  }

  draw(c: CanvasRenderingContext2D) {
    if (this.dead) return;
  
    c.fillStyle = "rgba(0, 0, 0, 0.2)";
    if (this.ancient) {
      c.fillStyle = "rgba(255, 0, 0, 0.5)";
    }
    c.beginPath();
    c.arc(this.bird.x, this.bird.y, this.birdSize, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#000";
  }

  update() {
    if (this.startTime == -1 || this.dead) return;

    this.acceleration += 1800 * Time.deltaTime;

    this.percept();
    this.act();

    // this.fitness = this.startTime != -1 ? Date.now() - this.startTime : 0;
    if (this.bird.y > this.environment.HEIGHT / 2 - 200 && this.bird.y < this.environment.HEIGHT / 2 + 200) {
      this.fitness += 500 * Time.deltaTime;
    }

    if (this.bird.y > this.environment.HEIGHT / 2 - 50 && this.bird.y < this.environment.HEIGHT / 2 + 50) {
      this.fitness += 1500 * Time.deltaTime;
    }
    
    this.bird.y += this.acceleration * Time.deltaTime;
    // console.log(Time.deltaTime, this.acceleration, this.bird.y);
    if (this.bird.y - this.birdSize < 0) {
      this.bird.y = this.birdSize;
      this.acceleration = 0;
    }
  }
}

export default Agent;