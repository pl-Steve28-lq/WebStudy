export class MouseManager {
  constructor() {
    this.pos = {
      x: 0,
      y: 0
    }

    this.onMoveBehavior = pos => {}
    this.onClickBehavior = pos => {}
    this.onUnclickBehavior = pos => {}
    this.onLeftSwipeBehavior = () => {}
    this.onRightSwipeBehavior = () => {}
    this.onUpSwipeBehavior = () => {}
    this.onDownSwipeBehavior = () => {}

    this.refreshable = true

    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    this.moveEvent = this.isMobile ? "touchmove" : "pointermove"
    this.clickEvent = this.isMobile ? "touchstart" : "pointerdown"
    this.unclickEvent = this.isMobile ? "touchend" : "pointerup"

    document.addEventListener(
      this.moveEvent,
      this.onMove.bind(this), false
    )
    document.addEventListener(
      this.clickEvent,
      this.onDown.bind(this), false
    )
    document.addEventListener(
      this.unclickEvent,
      this.onUp.bind(this), false
    )

    this.scrollEventListener()
  }

  setOnMoveListener = f => { this.onMoveBehavior = f }
  setOnClickListener = f => { this.onClickBehavior = f }
  setOnUnclickListener = f => { this.onUnclickBehavior = f }
  setOnLeftSwipeListener = f => { this.onLeftSwipeBehavior = f }
  setOnRightSwipeListener = f => { this.onRightSwipeBehavior = f }
  setOnUpSwipeListener = f => { this.onUpSwipeBehavior = f }
  setOnDownSwipeListener = f => { this.onDownSwipeBehavior = f }

  onMove(e) {
    this.pos = this.getEventPos(e)
    this.onMoveBehavior(this.pos)
  }

  onDown(e) { 
    this.isClicked = true
    this.onClickBehavior(this.pos)
  }

  onUp(e) { 
    this.isClicked = false
    this.onUnclickBehavior(this.pos)
  }

  setRefreshable(refreshable) {
    this.refreshable = refreshable
  }

  getEventPos = e => {
    return {
      x: this.isMobile ? e.targetTouches[0].pageX : e.clientX,
      y: this.isMobile ? e.targetTouches[0].pageY : e.clientY
    }
  }

  scrollEventListener() {
    let touchPoint

    let touchStartHandler = e => {
      touchPoint = this.getEventPos(e)
    }

    let touchMoveHandler = e => {
      let newPoint

      if (false) {
        touchPoint = null
        return
      }

      if (this.isClicked) {
        newPoint = this.getEventPos(e)

        let newX = newPoint.x,
            newY = newPoint.y,
            oldX = touchPoint.x,
            oldY = touchPoint.y
        
        let slope = (newY-oldY)/((newX-oldX) == 0 ? 0.1 : (newX-oldX))
        let range = 0.5
        let xslope = Math.abs(slope) < 0.5
        let yslope = Math.abs(slope) > 2

        if ((newX < oldX) && xslope) this.onLeftSwipeBehavior()
        if ((newX > oldX) && xslope) this.onRightSwipeBehavior()
        if ((newY < oldY) && yslope) this.onUpSwipeBehavior()
        if ((newY > oldY) && yslope) this.onDownSwipeBehavior()
        if ((newY > oldY) && !this.refreshable) e.preventDefault()
      }

      touchPoint = newPoint;
    }

    document.addEventListener(
      this.clickEvent,
      touchStartHandler,
      { passive: false }
    )
    
    document.addEventListener(
      this.moveEvent,
      touchMoveHandler,
      { passive: false }
    )
  }
}
