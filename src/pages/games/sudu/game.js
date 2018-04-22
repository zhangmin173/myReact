/*
 * @Author: 张敏 
 * @Date: 2018-04-21 17:53:51 
 * @Last Modified by: 张敏
 * @Last Modified time: 2018-04-22 14:38:07
 */

import Toolkit from './toolkit';
class Game {
  constructor() {
    
  }

  init() {
    while(!this.generateMatrix()) {
      console.log('成功');
    }
  }

  generateMatrix() {
    this.matrix = Toolkit.buildMatrix(9).map(row => row.map((v, i) => 0));
    this.orders = Toolkit.buildMatrix(9)
      .map(row => row.map((v, i) => i))
      .map(row => Toolkit.shuffle(row));

    for (let n = 1; n <= 9; n++) {
      //按数字1-9循环每列填入
      if (!this.fillNum(n, 0)) {
        return false;
      }
    }
    return true;
  }

  fillNum(n, rowIndex) {
    if (rowIndex > 8) {
      return true;
    }
    const row = this.matrix[rowIndex];
    const order = this.orders[rowIndex];

    for (let i = 0; i < 9; i++) {
      const colIndex = order[i];
      // 当前位置有值，跳过
      if (row[colIndex]) {
        continue;
      }
      // 当前位置不可以填写n，跳过
      if (!this.check(rowIndex, colIndex, n)) {
        continue;
      }
      // 进行填写
      row[colIndex] = n;
      // 去下一行填写n失败，继续寻找当前行的下一个位置
      if (!this.fillNum(n, rowIndex + 1)) {
        row[colIndex] = 0;
        continue;
      }
      return true;
    }
    return false;
  }

  check(rowIndex, colIndex, n) {
    const row = this.matrix[rowIndex];
    const column = Toolkit.buildRow(9).map((v,i) => this.matrix[i][colIndex]);
    const { boxIndex, cellIndex } = this.convertToBoxIndex(rowIndex,colIndex);
    const box = this.getBoxCells(this.matrix,boxIndex);

    for (let i = 0; i < 9; i++) {
      if (row[i] === n || column[i] === n || box[i] === n) {
        return false;
      }
    }
    return true;
  }
  getBoxCells(matrix,boxIndex) {
    const startRowIndex = Math.floor(boxIndex/3)*3,
      startColIndex = boxIndex%3*3;
    
    const result = [];
    let rowIndex,colIndex;
    for (let celIndex = 0; celIndex < 9; celIndex++) {
      rowIndex = startRowIndex + Math.floor(celIndex/3);
      colIndex = startColIndex + celIndex%3;
      result.push(matrix[rowIndex][colIndex]);
    }
    return result;
  }
  convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    };
  }
  convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    };
  }
}

export default Game;
