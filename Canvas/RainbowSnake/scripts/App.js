import { BaseCanvasApp } from './BaseApp.js'
import { MouseManager } from './utils/MouseUtils.js'

class App extends BaseCanvasApp {
  constructor() { super() }

  draw(s) {
    this.ctx.beginPath()
    s(this.ctx)
    this.ctx.stroke()
    this.ctx.closePath()
  }

  init() {
    this.mouse = this.check(
      this.mouse, new MouseManager()
    )
    this.circles = this.check(
      this.circles, []
    )
    this.clr = this.check(
      this.clr, {r: 0, g: 0, b: 0}
    )
    this.rad = 20

    this.mouse.setOnMoveListener(pos => {
      let wut = c => (c + (3*(c <= Math.random()*150 | 0) - 1)*(Math.random()*15 | 0) | 0)

      this.clr = {
        r: wut(this.clr.r),
        g: wut(this.clr.g),
        b: wut(this.clr.b),
      }

      if (!this.circles.map(e => e.pos).includes(this.mouse.pos)) {
        this.circles.push({
          pos: this.mouse.pos,
          clr: this.clr,
          rad: this.rad
      }) }
    })
    this.mouse.setOnScrollListener(dir => {
      let r = this.rad
      this.rad += 
        ( (5 < r && r < 41) ||
        ([5, 41].includes(r) && dir == 2*(r == 5)-1
        ) ? dir : 0)*1.5
    })

    this.animate()
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    if (this.circles.length > 20) {
      this.circles.shift()
      this.circles.shift()
    }

    let makeCircle = (x, y, rad, clr) => {
      let clrs = clr ? `rgb(${clr.r}, ${clr.g}, ${clr.b})` : "white"
      this.draw(
        ctx => {
          ctx.fillStyle = clrs
          ctx.strokeStyle = clrs
          ctx.arc(
            x, y, rad, 0, Math.PI*2 
          )
          ctx.fill()
          ctx.closePath()
        }
      )
    }

    for (let c of this.circles) {
      makeCircle(
        c.pos.x,
        c.pos.y, c.rad, c.clr
      )
    }

    makeCircle(
      this.mouse.pos.x,
      this.mouse.pos.y, this.rad, this.clr
    )
  }
}

window.onload = () => {
  const v = new App()
}