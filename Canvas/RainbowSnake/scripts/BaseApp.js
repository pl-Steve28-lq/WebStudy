export class BaseCanvasApp {
  constructor() {
    location.protocol !== "https:" ?
      location.protocol = "https:" : null
    
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

    this.init()
  }

  init() {}

  check(item, gets) {
    return item || gets
  }
}