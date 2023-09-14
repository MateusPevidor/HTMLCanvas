class Utils {
  public static createMatrix(rows: number, columns: number): number[][] {
    const matrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
      matrix[i] = new Array(columns);
    }
    return matrix;
  }

  public static multiplyMatrices(m: number[][], n: number[][]) {
    if (m[0].length != n.length) return;

    const result = Utils.createMatrix(m.length, n[0].length);
    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < n.length; j++) {
        let sum = 0;
        for (let k = 0; k < m[i].length; k++) {
          sum += m[i][k] * n[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  public static sumMatrices(m: number[][], n: number[][]) {
    const result = Utils.createMatrix(m.length, n[0].length);
    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < n.length; j++) {
        result[i][j] = m[i][j] + n[i][j];
      }
    }
    return result;
  }

  public static Sigmoid(n: number) {
    return 1 / (1 + Math.exp(-n));
  }
}

export default Utils;