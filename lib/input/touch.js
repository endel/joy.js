/**
 * @module Joy
 */
var Support = require('../core/support');
var Events = require('../consts/events');

// Only bind touch events when devise supports it.
if (!Support.touch) { return; }

var Touch = {};

/**
 * Events.TOUCH_START
 * @type {String}
 * @static
 * @final
 */
Events.TOUCH_START = 'touchstart';

/**
 * Events.TOUCH_MOVE
 * @type {String}
 * @static
 * @final
 */
Events.TOUCH_MOVE = 'touchmove';

/**
 * Events.TOUCH_END
 * @type {String}
 * @static
 * @final
 */
Events.TOUCH_END = 'touchend';

module.exports = Touch;
