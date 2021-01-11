import { inCircle } from './utils.js'

export class BounceString {
  constructor(x1, y1, x2, y2, r) {
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
  }

  animate(ctx, posX, posY, click) {
    ctx.beginPath()

    const inside = inCircle(
      this.p1.x, this.p1.y,
      this.p2.x, this.p2.y,
      posX, posY, this.r
    )

    if (inCircle(
      this.p1.x, this.p1.y,
      this.p2.x, this.p2.y,
      posX, posY, this.r
    ) && click) {
      this.t = 0.73
      this.pos = {
        x: posX,
        y: posY
      }
      ctx.moveTo(this.p1.x, this.p1.y)
      ctx.quadraticCurveTo(posX, posY, this.p2.x, this.p2.y)
    }
    else if (this.t < 40) {
      let coef = Math.sin(Math.PI*this.t)/this.t
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

    ctx.stroke()
    ctx.closePath()
  }
}