import { BounceString } from './BounceString.js'

export class App {
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
    
    this.pos = {
      x: 0,
      y: 0
    }
    this.isClicked = false

    document.addEventListener("pointermove", this.onMove.bind(this), false)
    document.addEventListener("pointerdown", this.onDown.bind(this), false)
    document.addEventListener("pointerup", this.onUp.bind(this), false)

    window.requestAnimationFrame(
      this.animate.bind(this)
    )

    this.test = []
    for (let i = 0; i < 80; i++) {
      this.test.push(
        new BounceString(20 + 6*i, 100, 20 + 6*i, 200, 100)
      )
    }
  }

  onMove(e) {
    this.pos = {
      x: e.clientX,
      y: e.clientY
    }
  }

  onDown(e) { this.isClicked = true }
  onUp(e) { this.isClicked = false }

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

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    
    this.ctx.clearRect(0, 0, this.Width, this.Height)
    for (let i of this.test) {
      i.animate(this.ctx, this.pos.x, this.pos.y, this.isClicked)
    }
  }
}


window.onload = () => {
  const v = new App()
}