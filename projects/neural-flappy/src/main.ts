import Agent from './agent.js';
import Environment from './environment.js';
import Time from './time.js';
import Utils from './utils.js';

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
