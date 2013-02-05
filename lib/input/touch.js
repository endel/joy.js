/**
 * @module Joy
 */
(function(J) {
  // Only bind touch events when devise supports it.
  if (!J.Support.touch) { return; }

  var Touch = {};

  /**
   * Events.TOUCH_START
   * @type {String}
   * @static
   * @final
   */
  J.Events.TOUCH_START = 'touchstart';

  /**
   * Events.TOUCH_MOVE
   * @type {String}
   * @static
   * @final
   */
  J.Events.TOUCH_MOVE = 'touchmove';

  /**
   * Events.TOUCH_END
   * @type {String}
   * @static
   * @final
   */
  J.Events.TOUCH_END = 'touchend';

  J.Touch = Touch;
})(Joy);
