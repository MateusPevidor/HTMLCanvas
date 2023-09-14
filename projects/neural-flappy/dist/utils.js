class Utils {
    static createMatrix(rows, columns) {
        const matrix = new Array(rows);
        for (let i = 0; i < rows; i++) {
            matrix[i] = new Array(columns);
        }
        return matrix;
    }
    static multiplyMatrices(m, n) {
        if (m[0].length != n.length)
            return;
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
    static sumMatrices(m, n) {
        const result = Utils.createMatrix(m.length, n[0].length);
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < n.length; j++) {
                result[i][j] = m[i][j] + n[i][j];
            }
        }
        return result;
    }
    static Sigmoid(n) {
        return 1 / (1 + Math.exp(-n));
    }
}
export default Utils;
//# sourceMappingURL=utils.js.map