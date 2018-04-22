/*
 * @Author: 张敏 
 * @Date: 2018-04-21 17:54:43 
 * @Last Modified by: 张敏
 * @Last Modified time: 2018-04-21 18:49:46
 */

const Toolkit = {
  /**
   * 生成一个n*n矩阵
   * @param {矩阵大小} n 
   */
  buildMatrix(n) {
    const matrix = new Array(n);
    for (let index of matrix.keys()) {
      let element = new Array(n);
      element.fill(0);
      matrix[index] = element;
    }
    return matrix;
  },
  /**
   * 洗牌算法
   * @param {一维数组} row 
   */
  shuffle(row) {
    const endIndex = row.length - 2;
    for (let i = 0; i <= endIndex; i++) {
      const j = i + Math.floor(Math.random() * (row.length - i)); //随机选取选取当前位置之后的位置
      [row[i], row[j]] = [row[j], row[i]]; //利用es6的数据解构进行交换赋值
    }
    return row;
  },
  buildRow(n) {
    const result = new Array(n);
    result.fill(0);
    return result;
  }
}
export default Toolkit