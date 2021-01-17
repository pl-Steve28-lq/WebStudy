import { BouncingStringManager } from './BouncingString.js'
import { Guitar } from './utils/SoundUtils.js'

if (location.protocol !== "https:") location.protocol = "https:"

export class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    this.manager = new BouncingStringManager(this.canvas)
    this.manager.mouse.setRefreshable(false)

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1
    console.log(this.pixelRatio)
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

  init(guitar) {
    this.guitar = guitar || this.guitar
    this.manager.strings = []

    let wlen = this.Width
    let hlen = this.Height
    let offset = 128
    
    let xdist = wlen/7
    let ydist = hlen/6
    let interval = (hlen-2*ydist)/5

    for (let i = 0; i < 6; i++) {
      let j = i%20 > 9 ? 20 - i%20 : i%20
      let r = offset + Math.random()*(256 - offset) | 0
      let g = offset + Math.random()*(256 - offset) | 0
      let b = offset + Math.random()*(256 - offset) | 0
      this.manager.add({
        pos: {
          x1: xdist, y1: ydist + interval*i,
          x2: wlen-xdist, y2: ydist + interval*i
        },
        color: `rgb(${r}, ${g}, ${b})`,
        onBounce: () => this.guitar.play(40+5*i)
      })
    }
  }
}

window.onload = () => {
  const v = new App()
  const guitar = new Guitar()

  v.init(guitar)
}