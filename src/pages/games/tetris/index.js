import './index.less';
/**
 * 产生俄罗斯方块儿
 */
class Square {
  constructor(type, dir) {
    this.type = type; // 方块类型
    this.dir = dir; // 方块方向
    this.origin = {
      x: 0,
      y: 4
    };
    this.blocks = [
      [
        [[2, 2, 2, 0], [0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 2, 0, 0], [0, 2, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0]],
        [[2, 0, 0, 0], [2, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[2, 2, 0, 0], [2, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]]
      ],
      [
        [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]],
        [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]]
      ],
      [
        [[0, 2, 2, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 2, 2, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 2, 2, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 2, 2, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
      ],
      [
        [[2, 2, 0, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 2, 2, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[2, 0, 0, 0], [2, 2, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0]],
        [[0, 2, 2, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
      ]
    ];
    this.block = this.blocks[this.type];
    this.data = this.block[this.dir];
  }

  rotate() {
    this.dir += 1;
    if (this.dir == 4) {
      this.dir = 0;
    }
    this.data = this.block[this.dir];
  }

  down() {
    this.origin.x += 1;
  }

  right() {
    this.origin.y += 1;
  }

  left() {
    this.origin.y -= 1;
  }
}
/**
 * 俄罗斯方块儿基础类
 */
class Tetris {
  constructor(ele, opts) {
    this.debug = true;
    this.w = opts.w;
    this.color = ['none', 'done', 'active'];
    this.type = 4;
    // 游戏区
    this.gameBox = ele;
    this.data = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.gameDoms = [];
    // 预览区
    this.nextBox = opts.preview;
    this.nextDoms = [];
    // 当前方块儿
    this.cur = null;
    // 下一个方块儿
    this.next = null;
    // 定时器
    this.timer = null;
    // 回调
    this.call = opts.call ? opts.call : null;
    this.gameOver = opts.gameOver ? opts.gameOver : null;
  }

  // 日志
  log(msg) {
    if (this.debug) {
      console.log(msg);
    }
  }

  // 初始化
  init() {
    let _this = this;
    (this.cur = this.generateSquare()), (this.next = this.generateSquare());

    this.initDom(this.gameBox, this.data, this.gameDoms);
    this.initDom(this.nextBox, this.next.data, this.nextDoms);

    this.setData();
    this.updateDom(this.data, this.gameDoms);
    this.updateDom(this.next.data, this.nextDoms);

    this.move();
  }
  // 随机生产方块
  generateSquare() {
    let dir = Math.floor(Math.random() * 4),
      type = Math.floor(Math.random() * this.type),
      obj = new Square(type, dir);
    return obj;
  }
  // 快速坠落
  fall() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.down();
    }, 50);
  }
  // 缓慢坠落
  move() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.down();
    }, 500);
  }
  // 左
  left() {
    if (this.canLeft()) {
      this.clearData();
      this.cur.left();
      this.setData();
      this.updateDom(this.data, this.gameDoms);
    }
  }
  // 上
  top() {
    if (this.canRotate()) {
      this.clearData();
      this.cur.rotate();
      this.setData();
      this.updateDom(this.data, this.gameDoms);
    }
  }
  // 右
  right() {
    if (this.canRight()) {
      this.clearData();
      this.cur.right();
      this.setData();
      this.updateDom(this.data, this.gameDoms);
    }
  }
  // 下
  down() {
    if (this.canDown()) {
      this.clearData();
      this.cur.down();
      this.setData();
      this.updateDom(this.data, this.gameDoms);
    } else {
      clearInterval(this.timer);
      this.bindData();
      this.eliminate();
      this.updateDom(this.data, this.gameDoms);
      if (this.isOver()) {
        this.gameOver();
      } else {
        this.cur = this.next;
        this.next = this.generateSquare();
        this.setData();
        this.updateDom(this.data, this.gameDoms);
        this.updateDom(this.next.data, this.nextDoms);
        this.move();
      }
    }
  }
  // 是否结束
  isOver() {
    let _this = this;
    for (let j = 0, len = this.data[0].length; j < len; j++) {
      if (this.data[0][j] == 1) {
        return true;
      }
    }
    return false;
  }
  // 消行
  eliminate() {
    let _this = this,
      isClear = true,
      length = this.data.length,
      len = this.data[0].length,
      n = 0;

    for (let i = length - 1; i >= 0; i--) {
      isClear = true;
      for (let j = 0; j < len; j++) {
        if (_this.data[i][j] != 1) {
          isClear = false;
        }
      }
      if (isClear) {
        n++;
        for (let m = i; m > 0; m--) {
          for (let n = 0; n < len; n++) {
            _this.data[m][n] = _this.data[m - 1][n];
          }
        }
        for (let n = 0; n < len; n++) {
          _this.data[0][n] = 0;
        }
        i++;
      }
    }
    _this.call(n);
  }
  // 是否能下移
  canDown() {
    let test = {};
    test.x = this.cur.origin.x + 1;
    test.y = this.cur.origin.y;
    return this.isValid(test, this.cur.data);
  }
  // 是否能左移
  canLeft() {
    let test = {};
    test.x = this.cur.origin.x;
    test.y = this.cur.origin.y - 1;
    return this.isValid(test, this.cur.data);
  }
  // 是否能右移
  canRight() {
    let test = {};
    test.x = this.cur.origin.x;
    test.y = this.cur.origin.y + 1;
    return this.isValid(test, this.cur.data);
  }
  // 是否能旋转
  canRotate() {
    let dir = this.cur.dir + 1;
    if (dir == 4) {
      dir = 0;
    }
    let data = this.cur.block[dir];
    return this.isValid(this.cur.origin, data);
  }
  // 检测点是否合法
  check(pos, x, y) {
    if (pos.x + x < 0) {
      return false;
    } else if (pos.x + x >= this.data.length) {
      return false;
    } else if (pos.y + y < 0) {
      return false;
    } else if (pos.y + y >= this.data[0].length) {
      return false;
    } else if (this.data[pos.x + x][pos.y + y] == 1) {
      return false;
    } else {
      return true;
    }
  }
  // 检测数据是否合法
  isValid(pos, data) {
    let _this = this;
    /**
     * 为什么这里不用foreach
     * 因为ruturn不能再foreach结束之前结束遍历
     */
    for (let i = 0, length = data.length; i < length; i++) {
      for (let j = 0, len = data[i].length; j < len; j++) {
        if (data[i][j] != 0) {
          if (!_this.check(pos, i, j)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  // 清除数据
  clearData() {
    let _this = this;
    this.cur.data.forEach(function(element, i) {
      element.forEach(function(ele, j) {
        if (_this.check(_this.cur.origin, i, j)) {
          _this.data[_this.cur.origin.x + i][_this.cur.origin.y + j] = 0;
        }
      });
    });
  }
  // 设置数据
  setData() {
    let _this = this;
    this.cur.data.forEach(function(element, i) {
      element.forEach(function(ele, j) {
        if (_this.check(_this.cur.origin, i, j)) {
          _this.data[_this.cur.origin.x + i][_this.cur.origin.y + j] =
            _this.cur.data[i][j];
        }
      });
    });
  }
  // 固定数据
  bindData() {
    let _this = this;
    this.data.forEach(function(element, i) {
      element.forEach(function(ele, j) {
        if (_this.data[i][j] == 2) {
          _this.data[i][j] = 1;
        }
      });
    });
    this.updateDom(this.data, this.gameDoms);
  }
  // 初始化dom元素
  initDom(container, data, divs) {
    let _this = this;

    data.forEach(function(element, i) {
      let div = [];
      element.forEach(function(ele, j) {
        let parent = document.createElement('div'),
          node = document.createElement('span');

        node.style.width = _this.w + 'px';
        node.style.height = _this.w + 'px';
        node.className = _this.color[0];
        div.push(node);
        container.appendChild(node);
      });
      divs.push(div);
    });
  }
  // 更新dom
  updateDom(data, divs) {
    let _this = this;
    data.forEach(function(element, i) {
      element.forEach(function(ele, j) {
        divs[i][j].className = _this.color[data[i][j]];
      });
    });
  }
}

$(function() {
  let w = Math.floor($('#app').width() / 16),
    ele = document.getElementById('main'),
    preview = document.getElementById('preview'),
    score = document.getElementById('score'),
    time = document.getElementById('time'),
    over = document.getElementById('over');

    ele.style.height = w * 20+"px";
    ele.style.width = w * 10+"px";

  preview.style.height = w * 4+"px";
  preview.style.width = w * 4+"px";

  const scoreWraper = document.querySelector('.app-display');
  scoreWraper.style.top = w * 6 + "px";
  scoreWraper.style.height = w * 4+"px";
  scoreWraper.style.width = w * 4+"px";

  const control = document.querySelector('.app-control');
  control.style.top = w * 23 + 'px';

  let game = new Tetris(ele, {
    w,
    preview,
    call: n => {
      score.innerHTML = score.innerHTML - 0 + n;
    },
    gameOver: () => {
      clearInterval(t);
      over.innerHTML = '游戏结束';
    }
  });

  game.init();
  let t = setInterval(() => {
    time.innerHTML = time.innerHTML - 0 + 1;
  }, 1000);

  $('.app-control').on('click',(e) => {
    console.log(e.target.className)
    switch (e.target.className) {
      case 'fall':
        game.fall();
        break;
      case 'left':
        game.left();
        break;
      case 'up':
        game.top();
        break;
      case 'right':
        game.right();
        break;
      case 'down':
        //game.down();
        break;
      default:
        break;
    }
  })
});
