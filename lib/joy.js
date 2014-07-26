/**
 * @module Joy
 * @static
 */

module.exports = {
  Init: {},
  Render: {},
  Input: {},
  Context: {},

  /**
   * @attribute debug
   * @type {Boolean}
   * @static
   * @default false
   */
  debug: false,

  /**
   * @attribute deltaTime
   * @type {Number}
   * @default 1
   * @static
   */
  deltaTime: 1,

  // TODO: find a better way to reference currentEngine instance.
  // What will happen when we have two canvas contexts at the same time? (like a mini-map?)
  currentEngine: null,

  /**
   * @method ready
   * @static
   */
  ready: function(callback) {
    document.onload = callback;
  }
};
