import { BounceString } from "./BounceString.js"

export class BouncingStringManager {
  add(info) {
    const pos = info.pos
    const sp = info.speed ? info.speed : 2
    const r = info.radius ? info.radius : 100
    const clr = info.color ? info.color : "black"

    this.strings.push(
      new BounceString(
        pos.x1, pos.y1,
        pos.x2, pos.y2,
        r, sp, clr
      )
    )
    return this
  }

  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.strings = []
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
  }

  onMove(e) {
    this.pos = {
      x: e.clientX,
      y: e.clientY
    }
  }

  onDown(e) { this.isClicked = true }
  onUp(e) { this.isClicked = false }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.strings.forEach(e => e.animate(
      this.ctx,
      this.pos.x, this.pos.y,
      this.isClicked
    ))
  }
}