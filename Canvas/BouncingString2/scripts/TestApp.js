import { BouncingStringManager } from './BouncingString.js'

export class TestApp {
  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1
    window.addEventListener(
      'resize',
      this.resize.bind(this),
      false
    )
    this.resize()

    this.manager = new BouncingStringManager(this.canvas)
  }

  resize() {
    this.Width = window.innerWidth
    this.Height = window.innerHeight

    this.canvas.width = this.Width * this.pixelRatio
    this.canvas.height = this.Height * this.pixelRatio
    this.ctx.scale(
      this.pixelRatio,
      this.pixelRatio
    )
  }
}

window.onload = () => {
  const v = new TestApp()
  for (let i = 0; i < 20; i++) {
    let j = i > 9 ? 20 - i : i
    let r = Math.random()*256 | 0
    let g = Math.random()*256 | 0
    let b = Math.random()*256 | 0
    v.manager.add({
      pos: {
        x1: 100 + 15*i, y1: 50,
        x2: 100 + 15*i, y2: 100 + 15*j
      },
      color: "rgb(" + r + "," + g + "," + b + ")"
    })
  }
}