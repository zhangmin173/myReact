/*
 * @Author: 张敏 
 * @Date: 2018-04-21 17:53:51 
 * @Last Modified by: 张敏
 * @Last Modified time: 2018-04-23 09:14:14
 */

import Toolkit from './toolkit';
import { format } from 'url';
class Game {
  constructor() {
    this.pre = null;
    this.now = null;
  }

  init() {
    // 初始化canvas
    const canvasWidth = 600;
    this.canvas = document.getElementById('myCanvas');
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasWidth;
    this.ctx = this.canvas.getContext('2d');

    // 初始化数据
    this.matrixN = 3;
    this.start = false;
    this.canvasData = this.getCanvasData();

    // 预加载图片
    this.reset();

    // 事件监听
    this.events();
    
  }

  events() {
    const width = $('#app').width() / this.matrixN;

    window.addEventListener('click', e => {
      if (!this.start) return;
      if (e.layerY > width * this.matrixN) return;
      
      const rowIndex = Math.floor(e.layerY / width);
      const colIndex = Math.floor(e.layerX / width);
      
      if (this.pre) {
        this.now = {rowIndex,colIndex};
        this.clear(0,0,this.canvas.width,this.canvas.height);
        const preData = this.imageData[this.pre.rowIndex][this.pre.colIndex];
        const nowData = this.imageData[this.now.rowIndex][this.now.colIndex];
        this.imageData[this.pre.rowIndex][this.pre.colIndex] = nowData;
        this.imageData[this.now.rowIndex][this.now.colIndex] = preData;
        this.layout();
        this.pre = this.now = null;
        if (this.check()) {
          this.start = false;
          this.reset()
        }
      } else {
        this.pre = {rowIndex,colIndex};
      }
    });

    $('#app .next').on('click',() => {
      this.reset();
    })
  }

  reset() {
    this.img = new Image();
    this.img.onload = () => {
      this.img.minWidth = Math.min(this.img.width,this.img.height);     
      this.imageData = this.getImageData().map(row => Toolkit.shuffle(row));;
      this.layout();
      this.start = true;
    };
    this.img.src =
      '//uploadbeta.com/api/pictures/random/?' + new Date();
    // this.img.src =
    //   '//uploadbeta.com/api/pictures/random/?key=%E6%8E%A8%E5%A5%B3%E9%83%8E';
  }

  layout() {
    const n = this.matrixN;
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        this.drawImage(
          this.img,
          this.imageData[i][j].x,
          this.imageData[i][j].y,
          this.imageData[i][j].w,
          this.imageData[i][j].h,
          this.canvasData[i][j].x,
          this.canvasData[i][j].y,
          this.canvasData[i][j].w,
          this.canvasData[i][j].h
        );
      }
    }
  }

  /**
   * 获取canvas绘图坐标数据
   */
  getCanvasData() {
    const n = this.matrixN;
    const result = this.makeRow(n).map(row => this.makeRow(n).map(row => 0));
    const boxWidth = this.canvas.width/n;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        result[i][j] = {
          x: j*boxWidth,
          y: i*boxWidth,
          w: boxWidth,
          h: boxWidth
        }
      }
    }
    return result;
  }

  /**
   * 获取图片上的位置数据
   */
  getImageData() {
    const n = this.matrixN;
    const { startX, startY } = this.getImgStartXY()
    const boxWidth = this.img.minWidth/n;
    const result = this.makeRow(n).map(row => this.makeRow(n).map(row => 0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        result[i][j] = {
          id: i*n+j,
          x: startX + j * boxWidth,
          y: startY + i * boxWidth,
          w: boxWidth,
          h: boxWidth
        }
      }
    }
    return result;
  }

  // 选中样式
  drawRect(x,y,w,h) {
    this.ctx.rect(x,y,w,h);
    this.ctx.stroke();
  }

  // 绘图
  drawImage(img, sx, sy, swidth, sheight, x, y, width, height) {
    this.ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
  }

  // 清屏
  clear(x,y,w,h) {
    this.ctx.clearRect(x,y,w,h);
  }

  // 获取图片位置起点
  getImgStartXY() {
    let startX = 0;
    let startY = (this.img.height - this.img.width) / 2;
    if (this.img.width > this.img.height) {
      startX = (this.img.width > this.img.height) / 2;
      startY = 0;
    }
    return { startX, startY }
  }

  /**
   * 构建数组
   * @param {元素个数} n 
   */
  makeRow(n) {
    const row = new Array(n);
    row.fill(0);
    return row;
  }

  /**
   * 检测是否完成
   */
  check() {
    const n = this.matrixN;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (this.imageData[i][j].id !== i*n + j) {
          return false;
        }
      }
    }
    return true;
  }
}

export default Game;
