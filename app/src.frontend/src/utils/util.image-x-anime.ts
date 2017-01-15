interface Iconfigure {
  startPosition: number
  width: number
  step: number
  interval: number
  endPosition?: number
}

/**
 * Image x-axis moving animation function.
 *
 * @export
 * @param {HTMLElement} targetDom
 * @param {Iconfigure} configure
 */
export default function imageAnimationX (targetDom: HTMLElement, configure: Iconfigure) {
  targetDom.style.backgroundPositionX = configure.startPosition + 'px'  // Reset Background Image Position.

  let runStep = 1
  let interval = setInterval(intervalFunc, configure.interval)

  function intervalFunc () {
    if (runStep > configure.step) {

      if (configure.endPosition !== undefined) {
        targetDom.style.backgroundPositionX = configure.endPosition + 'px'
      }

      // Firefox can not recognise background-position-x & background-position-y.
      if (
        window.navigator.userAgent.indexOf('Firefox') > -1 &&
        configure.endPosition !== undefined
      ) {
         targetDom.style.backgroundPosition = configure.endPosition + 'px 0'
      }

      return clearInterval(interval)
    }

    targetDom.style.backgroundPositionX = configure.startPosition + (configure.width * runStep) + 'px'

    // Firefox Can not recognise background-position-x & background-position-y.
    if (window.navigator.userAgent.indexOf('Firefox') > -1) {
      targetDom.style.backgroundPosition = configure.startPosition + (configure.width * runStep) + 'px 0'
    }

    runStep++
  }

}
