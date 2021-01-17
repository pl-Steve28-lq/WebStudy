export class MouseManager {
  constructor() {
    this.pos = {
      x: 0,
      y: 0
    }

    this.onMoveBehavior = (pos) => {}
    this.onClickBehavior = (pos) => {}
    this.onUnclickBehavior = (pos) => {}
    this.refreshable = true

    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    document.addEventListener(
      this.isMobile ? "touchmove" : "pointermove",
      this.onMove.bind(this), false
    )
    document.addEventListener(
      this.isMobile ? "touchstart" : "pointerdown",
      this.onDown.bind(this), false
    )
    document.addEventListener(
      this.isMobile ? "touchend" : "pointerup",
      this.onUp.bind(this), false
    )

    this.doRefreshable()
  }

  setOnMoveListener = (f) => { this.onMoveBehavior = f }
  setOnClickListener = (f) => { this.onClickBehavior = f }
  setOnUnclickListener = (f) => { this.onUnclickBehavior = f }

  onMove(e) {
    this.pos = {
      x: this.isMobile ? e.targetTouches[0].pageX : e.clientX,
      y: this.isMobile ? e.targetTouches[0].pageY : e.clientY
    }
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
    this.doRefreshable()
  }

  /*
  prevent pull-down-to-refresh in mobile web
  https://stackoverflow.com/a/55832568
  */
  doRefreshable() {
    let touchStartHandler,
        touchMoveHandler,
        touchPoint
    if (
      this.isMobile &&
      "ontouchstart" in document.documentElement
    ) {
      touchStartHandler = function() {
        touchPoint = event.touches.length === 1 ? event.touches[0].clientY : null
      };
      touchMoveHandler = function(event) {
        let newTouchPoint
        if (event.touches.length !== 1) {
          touchPoint = null
          return
        }
        // We only need to defaultPrevent when scrolling up
        newTouchPoint = event.touches[0].clientY;
        if (newTouchPoint > touchPoint)
          event.preventDefault();
        touchPoint = newTouchPoint;
      }
      document.addEventListener(
        "touchstart", ev => { 
          if (!this.refreshable) touchStartHandler(ev)
        }, { passive: false }
      )
      document.addEventListener(
        "touchmove", ev => { 
          if (!this.refreshable) touchMoveHandler(ev)
        }, { passive: false }
      )
    }
  }
}