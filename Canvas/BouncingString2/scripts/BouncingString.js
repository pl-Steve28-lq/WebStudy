import { BounceString } from "./BounceString.js"
import { MouseManager } from "./utils/MouseUtils.js"

export class BouncingStringManager {
  add(info) {
    const pos = info.pos
    const sp = info.speed || 2
    const r = info.radius || 100
    const clr = info.color || "black"
    const onbounce = info.onBounce || (() => {})

    this.strings.push(
      new BounceString(
        pos.x1, pos.y1,
        pos.x2, pos.y2,
        r, sp, clr,
        onbounce
      )
    )
    return this
  }

  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.strings = []

    window.requestAnimationFrame(
      this.animate.bind(this)
    )

    this.mouse = new MouseManager()
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.strings.forEach(e => e.animate(
      this.ctx,
      this.mouse.pos.x, this.mouse.pos.y,
      this.mouse.isClicked
    ))
  }
}