import Utils from "./utils.js";
class NN {
    constructor() {
        this.input = [[10], [20]];
        const n = 2;
        const variance = 500;
        this.weights01 = Utils.createMatrix(1, n);
        this.weights11 = Utils.createMatrix(1, n);
        this.weights22 = Utils.createMatrix(1, n);
        for (let i = 0; i < n; i++) {
            this.weights01[0][i] = Math.random() * variance - variance / 2;
        }
        for (let i = 0; i < n; i++) {
            this.weights11[0][i] = Math.random() * variance - variance / 2;
        }
        for (let i = 0; i < n; i++) {
            this.weights22[0][i] = Math.random() * variance - variance / 2;
        }
        this.bias1 = Math.random() * variance - variance / 2;
        this.bias2 = Math.random() * variance - variance / 2;
        this.bias3 = Math.random() * variance - variance / 2;
    }
    set(nn, variance) {
        this.weights01 = [[nn.weights01[0][0], nn.weights01[0][1]]];
        this.weights11 = [[nn.weights11[0][0], nn.weights11[0][1]]];
        this.weights22 = [[nn.weights22[0][0], nn.weights22[0][1]]];
        this.bias1 = nn.bias1;
        this.bias2 = nn.bias2;
        this.bias3 = nn.bias3;
        this.weights01[0][0] += Math.random() * variance - variance / 2;
        this.weights01[0][1] += Math.random() * variance - variance / 2;
        this.weights11[0][0] += Math.random() * variance - variance / 2;
        this.weights11[0][1] += Math.random() * variance - variance / 2;
        this.weights22[0][0] += Math.random() * variance - variance / 2;
        this.weights22[0][1] += Math.random() * variance - variance / 2;
        this.bias1 += Math.random() * variance - variance / 2;
        this.bias2 += Math.random() * variance - variance / 2;
        this.bias3 += Math.random() * variance - variance / 2;
    }
    feedForward() {
        const n1 = Utils.Sigmoid(Utils.multiplyMatrices(this.weights01, this.input)[0][0] + this.bias1);
        const n2 = Utils.Sigmoid(Utils.multiplyMatrices(this.weights11, this.input)[0][0] + this.bias2);
        const hLayer = [[n1], [n2]];
        const n3 = Utils.Sigmoid(Utils.multiplyMatrices(this.weights22, hLayer)[0][0] + this.bias3);
        return n3;
    }
    setInput(x, y) {
        this.input = [[x], [y]];
    }
}
export default NN;
//# sourceMappingURL=nn.js.map