import Agent from './agent';
import Environment from './environment';
import Time from './time';
import Utils from './utils';

const canvas = document?.querySelector('canvas');
const c = canvas.getContext('2d');

let environment: Environment;
let agents: Agent[];

const agentsCount = 100;

const text = document?.getElementById("text");
const currFitness = document?.getElementById("current-fitness");
const highestFitness = document?.getElementById("best-fitness");
const generationRef = document?.getElementById("generation");

function setup() {
  canvas.width = 1280;
  canvas.height = 720;
  agents = [];

  environment = new Environment(canvas.width, canvas.height);

  for (let i = 0; i < agentsCount; i++) {
    agents.push(new Agent(environment));
  }

  // agents[0].nn.bias1 = 147.35227988717085;
  // agents[0].nn.bias2 = 145.32419383448274;
  // agents[0].nn.bias3 = 175.81733957331392;
  // agents[0].nn.weights01[0][0] = -60.99523360262583;
  // agents[0].nn.weights01[0][1] = 174.02721799856874;
  // agents[0].nn.weights11[0][0] = 174.45510998188388;
  // agents[0].nn.weights11[0][1] = 0.964872005970121;
  // agents[0].nn.weights22[0][0] = -89.51769963109363;
  // agents[0].nn.weights22[0][1] = -244.51084342483665;

  for (let i = 0; i < agentsCount; i++) {
    agents[i].start();
  }

  environment.startPipesGeneration();
}

function draw() {
  requestAnimationFrame(draw);
  Time.calculateDeltaTime();

  c.clearRect(0, 0, canvas.width, canvas.height);

  environment.draw(c);
  environment.update();

  agents.forEach(agent => {
    agent.update();
    agent.draw(c);
  })

  const alive = agents.filter(agent => !agent.dead);
  const agentCount = alive.length;

  let highestFit = -1;
  alive.forEach(ag => ag.getCurrentFitness() > highestFit ? highestFit = ag.getCurrentFitness() : null);
  
  text.innerHTML = agentCount.toString();
  highestFitness.innerHTML = highest.toFixed(0);
  currFitness.innerHTML = highestFit.toFixed(0);

  if (agentCount == 0) nextPopulation();
}

let highest = -1;
let bestAgent: Agent;
let generation = 1;
function nextPopulation() {
  generation++;
  generationRef.innerHTML = generation.toString();
  agents.forEach(agent => {
    if (agent.fitness > highest) {
      highest = agent.fitness;
      bestAgent = agent;
    }
  });
  console.log(bestAgent);

  agents = [];
  environment = new Environment(canvas.width, canvas.height);
  environment.startPipesGeneration();

  for (let i = 0; i < agentsCount; i++) {
    agents.push(new Agent(environment, bestAgent));
  }

  // const previous = new Agent(environment);
  // previous.nn = bestAgent.nn;
  // previous.ancient = true;
  // agents.push(previous);
  

  agents.forEach(agent => {
    agent.start();
  });
}

setup();
draw();
