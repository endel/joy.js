/**
 * @module Joy
 */
(function(J) {
  var userAgent = navigator.userAgent;
  var browserPrefix = ((userAgent.match(/opera/i) && "o") ||
                       (userAgent.match(/webkit/i) && "webkit") ||
                       (userAgent.match(/msie/i) && "ms") ||
                       (userAgent.match(/mozilla/i) && "moz") || "");

  function prefix(name) {
    if (browserPrefix !== "") {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    return browserPrefix + name;
  }

  /*
   * Extend HTMLElement to support addEventListener method.
   */
  if (typeof(window.addEventListener)!=="function") {
    HTMLElement.prototype.addEventListener = function (type, callback, useCapture) {
      attachEvent('on' + type, callback);
    };
  }

  /**
   * Browser support configuration and constants.
   * @class Support
   */
  J.Support = {
    /**
     * Device supports touch events?
     * @attribute touch
     * @type {Boolean}
     * @static
     * @readonly
     */
    touch: ('ontouchstart' in window),

    /**
     * Device supports Retina Display?
     * @attribute retina
     * @type {Boolean}
     * @static
     * @readonly
     */
    retina: window.devicePixelRatio > 1 || window.matchMedia('(min-resolution: 1.1dppx)').matches,

    /*
     * Misc / Interal use
     */
    'imageSmoothingEnabled' : prefix("imageSmoothingEnabled")
  };

  /**
   * window.onEnterFrame
   */
  window.onEnterFrame = (function(){
    return  window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function( callback ) { window.setTimeout(callback, 1000 / 60); }; // TODO: use FPS rate from render module
  })();
})(Joy);
