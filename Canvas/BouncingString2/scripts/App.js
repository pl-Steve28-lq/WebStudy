import { BaseCanvasApp } from './BaseApp.js'
import { BouncingStringManager } from './BouncingString.js'
import { Guitar } from './utils/SoundUtils.js'

class App extends BaseCanvasApp {
  constructor() { super() }

  init() {
    this.manager = this.check(
      this.manager, BouncingStringManager,
      this.canvas
    )
    this.manager.mouse.setRefreshable(false)
    
    this.guitar = this.check(
      this.guitar, Guitar
    )
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
}