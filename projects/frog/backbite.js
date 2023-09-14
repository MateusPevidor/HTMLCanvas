
class Graph {
  constructor(directed) {
    this.list = [];
    this.directed = directed;
  }

  addVertex() {
    this.list.push([]);
  }

  getNeighbors(i, except = undefined) {
    if (except == undefined) {
      return this.list[i];
    } else {
      const list = this.list[i].slice();
      const index = list.indexOf(except);
      list.splice(index, 1);
      return list;
    }
  }

  removeNeighbor(vertex, neighbor) {
    const index1 = this.list[vertex].indexOf(neighbor);
    this.list[vertex].splice(index1, 1);

    if (this.directed) return;

    const index2 = this.list[neighbor].indexOf(vertex);
    this.list[neighbor].splice(index2, 1);
  }

  addNeighbor(vertex, neighbor) {
    this.list[vertex].push(neighbor);

    if (this.directed) return;

    this.list[neighbor].push(vertex);
  }

  disconnectVertex(index) {
    this.list[index].forEach(neighbor => {
      this.removeNeighbor(index, neighbor);
    });
  }

  isNeighbor(vertex, neighbor) {
    return this.list[vertex].includes(neighbor);
  }

  getVertexCount() {
    return this.list.length;
  }

  DFS(startVertex) {
    this.dfsCount++;
    const visited = [];
    const stack = [startVertex];
    let hasCycle = false;

    while (stack.length > 0) {
      const vertex = stack.pop();
      visited.push(vertex);
      
      const neighbors = this.getNeighbors(vertex, visited[visited.length - 2]);
      for (let i = 0; i < neighbors.length; i++) {
        if (visited.includes(neighbors[i])) {
          hasCycle = true;
          return { visited, hasCycle, cycleVertex: neighbors[i] };
        }
      }
      stack.push(...neighbors);
    }

    return { visited, hasCycle, cycleVertex: null };
  }
}

class HamiltonianPath {

  constructor(size) {
    this.list = [];
    this.graph = new Graph(false);
    this.size = size;
    
    this.obstacleCount = 0;
    this.obstacleCount = Math.floor(this.size ** 2 / 4);
    this.dfsCount = 0;
    this.head = 0;

    this.initialize();
    this.createDefaultPath();
  }

  initialize() {
    for (let i = 0; i < this.size ** 2; i++) {
      this.graph.addVertex();
    }
  }

  createDefaultPath() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size - 1; j++) {
        const index = i * this.size + j;
        this.graph.addNeighbor(index, index + 1);
      }
    }

    for (let i = 0; i < Math.floor(this.size / 2); i++) {
      let index = this.size - 1 + this.size * 2 * i;
      this.graph.addNeighbor(index, index + this.size);

      index++;

      if (index >= this.size ** 2 - this.size) continue;
      this.graph.addNeighbor(index, index + this.size);
    }

    // Creating obstacles
    const { visited } = this.graph.DFS(this.head);

    for (let i = 0; i < this.obstacleCount; i++) {
      this.graph.disconnectVertex(visited[i]);
      this.head = visited[i + 1];
    }
    this.tail = visited[visited.length - 1];
  }

  generate(n) {
    for (let i = 0; i < n; i++) {
      this.backbite();
    }
  }

  backbite() {
    const vertexIndex = Math.random() > 0.5 ? this.head : this.tail;
    const isHead = vertexIndex == this.head;

    const borders = [
      vertexIndex % this.size == this.size - 1, // right
      vertexIndex % this.size == 0, // left
      vertexIndex > this.size ** 2 - this.size - 1, // bottom
      vertexIndex < this.size, // top
    ]

    const candidates = [
      vertexIndex + 1, // right
      vertexIndex - 1, // left
      vertexIndex + this.size, // bottom
      vertexIndex - this.size // top
    ];

    const possibleCandidates = candidates.filter((_, i) => !borders[i]);

    const validCandidates = possibleCandidates.filter(neighbor => {
      return !this.graph.isNeighbor(vertexIndex, neighbor);
    });

    const choice = Math.floor(Math.random() * validCandidates.length);
    const chosenVertex = validCandidates[choice];

    // Avoid to connect head to tail
    if (isHead) {
      if (chosenVertex == this.tail) return;
    } else {
      if (chosenVertex == this.head) return;
    }

    this.graph.addNeighbor(vertexIndex, chosenVertex);
    if (this.graph.getNeighbors(chosenVertex, vertexIndex).length == 0) {
      // Obstacle change
      if (isHead) {
        const [neighbor] = this.graph.getNeighbors(this.tail);
        this.graph.removeNeighbor(neighbor, this.tail);
        this.head = chosenVertex;
        this.tail = neighbor;
      } else {
        const [neighbor] = this.graph.getNeighbors(this.head);
        this.graph.removeNeighbor(neighbor, this.head);
        this.tail = chosenVertex;
        this.head = neighbor;
      }
    } else {
      this.removeCycle(chosenVertex, vertexIndex, isHead);
    }
  }

  removeCycle(n, avoid, isHead) {
    const neighbors = this.graph.getNeighbors(n).filter(v => v != avoid);

    const prevHead = this.head;
    const prevTail = this.tail;
    for (let i = 0; i < neighbors.length; i++) {
      this.graph.removeNeighbor(n, neighbors[i]);
      if (isHead) {
        this.head = neighbors[i];
      } else {
        this.tail = neighbors[i];
      }
      const { hasCycle, visited } = this.graph.DFS(this.head);
      if (hasCycle || visited.length != this.size ** 2 - this.obstacleCount) {
        this.graph.addNeighbor(n, neighbors[i]);
        if (isHead) {
          this.head = prevHead;
        } else {
          this.tail = prevTail;
        }
      } else {
        return neighbors[i];
      }
    }
  }
}