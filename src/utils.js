export const convertToHTML = (string) => {
  return string.replace(/(?:\r\n|\r|\n)/g, '<br />');
};

export class AnimateScroll {
  constructor () {
    // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();
  }

  scrollToY (scrollTargetY, speed) {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    this.scrollY = window.scrollY,
    this.scrollTargetY = scrollTargetY || 0;
    this.speed = speed || 2000;

    this.easing = 'easingType';
    this.currentTime = 0;

    // min time .1, max time .8 seconds
    this.time = Math.max(.1, Math.min(Math.abs(this.scrollY - this.scrollTargetY) / this.speed, .8));

    this.easingEquations = {
      easingType: function (pos) {
        return -(Math.pow((pos-1), 2) -1);
      }
    };

    // call it once to get started
    this.tick();
  }

  // add animation loop
  tick () {
    this.currentTime += 1 / 60;

    const p = this.currentTime / this.time;
    const t = this.easingEquations[this.easing](p);

    if (p < 1) {
      requestAnimFrame(() => this.tick());

      window.scrollTo(0, this.scrollY + ((this.scrollTargetY - this.scrollY) * t));
    } else {
      window.scrollTo(0, this.scrollTargetY);
    }
  }
}