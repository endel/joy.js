/*
 * Normalizes browser support
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

  /**
   * Browser support configuration and constants.
   * @class Support
   */
  J.Support = {
    'imageSmoothingEnabled' : prefix("imageSmoothingEnabled"),
    touch: ('ontouchstart' in window)
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
      function( callback ) { window.setTimeout(callback, 1000 / 60); };		// TODO: use FPS rate from render module
  })();
})(Joy);

