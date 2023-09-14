declare class NN {
    weights01: number[][];
    weights11: number[][];
    weights22: number[][];
    bias1: number;
    bias2: number;
    bias3: number;
    input: number[][];
    constructor();
    set(nn: NN, variance: number): void;
    feedForward(): number;
    setInput(x: number, y: number): void;
}
export default NN;
