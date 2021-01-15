import { inCircle } from './utils.js'

export class BounceString {
  constructor(x1, y1, x2, y2, r, sp, clr) {
    this.sp = sp
    this.p1 = {
      x: x1,
      y: y1
    }
    this.p2 = {
      x: x2,
      y: y2
    }
    this.r = r
    this.t = 0.73
    this.pos = {
      x: 0,
      y: 0
    }
    this.clr = clr
  }

  animate(ctx, posX, posY, click) {
    ctx.beginPath()

    const inside = inCircle(
      this.p1.x, this.p1.y,
      this.p2.x, this.p2.y,
      posX, posY, this.r
    )

    const touch = inCircle(
      this.p1.x, this.p1.y,
      this.p2.x, this.p2.y,
      posX, posY, 30
    )

    if (touch) this.touching = true
    if (!click) this.touching = false

    if (inside && this.touching) {
      this.t = 0.73
      this.pos = {
        x: posX,
        y: posY
      }
      ctx.moveTo(this.p1.x, this.p1.y)
      ctx.quadraticCurveTo(posX, posY, this.p2.x, this.p2.y)
    }
    else if (this.t < 50) {
      let coef = Math.sin(this.sp*Math.PI*this.t)/Math.pow(this.t, 1.5)
      let oldX = this.pos.x
      let oldY = this.pos.y
      let X = (this.p1.x + this.p2.x)/2
      let Y = (this.p1.y + this.p2.y)/2
      let newX = 2*X - oldX
      let newY = 2*Y - oldY

      let m = coef+1
      let n = 2-m
      let cx = (oldX*m + newX*n)/2
      let cy = (oldY*m + newY*n)/2

      ctx.moveTo(this.p1.x, this.p1.y)
      ctx.quadraticCurveTo(cx, cy, this.p2.x, this.p2.y)

      this.t += 0.1
    }
    else {
      ctx.moveTo(this.p1.x, this.p1.y)
      ctx.lineTo(this.p2.x, this.p2.y)
    }

    ctx.strokeStyle = this.clr
    ctx.stroke()
    ctx.closePath()
  }
}