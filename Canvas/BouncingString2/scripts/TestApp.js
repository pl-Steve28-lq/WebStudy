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
    this.Width = document.body.clientWidth
    this.Height = document.body.clientHeight

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

  let interval = 30
  let wlen = (v.Width - 100)/interval
  let hlen = v.Height
  let offset = 64

  for (let i = 0; i < wlen; i++) {
    let j = i%20 > 9 ? 20 - i%20 : i%20
    let r = offset + Math.random()*(256 - offset) | 0
    let g = offset + Math.random()*(256 - offset) | 0
    let b = offset + Math.random()*(256 - offset) | 0
    v.manager.add({
      pos: {
        x1: 50 + interval*i, y1: 10,
        x2: 50 + interval*i, y2: hlen-10
      },
      color: "rgb(" + r + "," + g + "," + b + ")"
    })
  }
}