// 封装一系列方法，使其可以链式调用
class Shape {
  constructor() {
    this.cmds = []
    this.active = false
  }
  moveTo() {
    this.cmds.push(['moveTo', arguments])
    return this
  }
  lineTo() {
    this.cmds.push(['lineTo', arguments])
    return this
  }
  lineCap() {
    this.cmds.push(['lineCap', arguments])
    return this
  }
  lineJoin() {
    this.cmds.push(['lineJoin', arguments])
    return this
  }
  lineWidth() {
    this.cmds.push(['lineWidth', arguments])
    return this
  }
  stroke() {
    this.cmds.push(['stroke', arguments])
    return this
  }
  strokeStyle() {
    this.cmds.push(['strokeStyle', arguments])
    return this
  }
  closePath() {
    this.cmds.push(['closePath', arguments])
    return this
  }
  beginPath() {
    this.cmds.push(['beginPath', arguments])
    return this
  }
  arc() {
    this.cmds.push(['arc', arguments])
    return this
  }
  fill() {
    this.cmds.push(['fill', arguments])
    return this
  }
  fillStyle() {
    this.cmds.push(['fillStyle', arguments])
    return this
  }
  save() {
    this.cmds.push(['save', arguments])
    return this
  }
  restore() {
    this.cmds.push(['restore', arguments])
    return this
  }
}

// 声明形状--对勾
class Correct extends Shape {
  constructor(x, y, size) {
    super();
    this.x = x
    this.y = y
    this.size = size
    this.touchArea = [x - size / 2, x + size / 2, y - size / 3, y + size / 3]
  }
  draw() {
    this.beginPath()
      .moveTo(-this.size / 2 + this.x, this.y)
      .lineTo(-this.size / 6 + this.x, this.size / 3 + this.y)
      .lineTo(this.size / 2 + this.x, -this.size / 3 + this.y)
      .strokeStyle('#38a935')
      .lineCap('round')
      .lineJoin('round')
      .lineWidth(this.size * .08)
      .stroke()
  }
  handleTouch() {
    this.active = true
    // 点击之后再现有图像外框加一个框，右上角绘制一个删除按钮
    this.beginPath()
      .moveTo(this.touchArea[0], this.touchArea[2])
      .lineTo(this.touchArea[1], this.touchArea[2])
      .lineTo(this.touchArea[1], this.touchArea[3])
      .lineTo(this.touchArea[0], this.touchArea[3])
      .closePath()
      .lineWidth(2)
      .strokeStyle('#68c15e')
      .stroke()
      .beginPath()
      .moveTo(this.touchArea[1] + 10, this.touchArea[2])
      .arc(this.touchArea[1], this.touchArea[2], 10, 0, Math.PI * 2, true)
      .fill()
  }
}
// 声明形状--打叉
class Wrong extends Shape {
  constructor(x, y, size) {
    super();
    this.x = x
    this.y = y
    this.size = size * .67
    this.touchArea = [x - this.size / 2, x + this.size / 2, y - this.size / 2, y + this.size / 2]
  }
  draw() {
    this.beginPath()
      .moveTo(-this.size / 2 + this.x, -this.size / 2 + this.y)
      .lineTo(this.size / 2 + this.x, this.size / 2 + this.y)
      .moveTo(this.size / 2 + this.x, -this.size / 2 + this.y)
      .lineTo(-this.size / 2 + this.x, this.size / 2 + this.y)
      .strokeStyle('#d72229')
      .lineCap('round')
      .lineJoin('round')
      .lineWidth(this.size * .12)
      .stroke()
  }
  handleTouch() {
    this.active = true
    // 点击之后再现有图像外框加一个框，右上角绘制一个删除按钮
    this.beginPath()
      .moveTo(this.touchArea[0], this.touchArea[2])
      .lineTo(this.touchArea[1], this.touchArea[2])
      .lineTo(this.touchArea[1], this.touchArea[3])
      .lineTo(this.touchArea[0], this.touchArea[3])
      .closePath()
      .lineWidth(2)
      .strokeStyle('#68c15e')
      .stroke()
      .beginPath()
      .moveTo(this.touchArea[1] + 10, this.touchArea[2])
      .arc(this.touchArea[1], this.touchArea[2], 10, 0, Math.PI * 2, true)
      .fill()
  }

}


// 元素管理器构造器
class Tools {
  constructor() {
    this.group = []
  }
  add(element) {
    // 在这里调用节点的 draw 方法，拿到 cmds
    element.draw()
    this.group.push(element)
  }

  getShapeIndex(touchX, touchY) {
    if (touchX == null || touchY == null) return
    let _index = -1
    this.group.forEach((item, index) => {
      if (touchX > item.touchArea[0] && touchX < item.touchArea[1] && touchY > item.touchArea[2] && touchY < item.touchArea[3]) {
        _index = index
      }
    })
    return _index
  }

  touchShape(touchX, touchY) {
    if (touchX == null || touchY == null) return
    let _index = -1
    this.group.forEach((item, index) => {
      // 在这里要做排他
      if (item.active) {
        item.active = false
        item.cmds = []
        item.draw()
      }
      if (touchX > item.touchArea[0] && touchX < item.touchArea[1] && touchY > item.touchArea[2] && touchY < item.touchArea[3]) {
        _index = index
      }
    })
    if (_index == -1) return
    this.group[_index].handleTouch()
  }

  // 删除，用name？id？使用id
  distory(index) {
    this.group.splice(index, 1)
  }
}

// 工作区，画布构造器
class WorkSpace {
  constructor(ctx) {
    this.ctx = ctx
    this.renderList = []
  }

  add(index, obj) {
    // 需要再传入一个index
    this.renderList[index] = obj
  }
  update(index) {
    // 同样需要一个index
    // 需要首先重置到没有绘制形状的状态
    // 应该是拿到对应的tools 进行渲染，而不是遍历所有tools
    this.renderList[index].group.forEach((item) => {
      item.cmds.forEach((item) => {
        if (item[1].length > 1) {
          this.ctx[item[0]](...item[1])
        } else if (item[1].length == 1) {
          this.ctx[item[0]] = item[1][0]
        } else {
          this.ctx[item[0]]()
        }
      })
    })
  }
}
module.exports = {
  Shape,
  Correct,
  Tools,
  WorkSpace,
  Wrong
}