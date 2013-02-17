(function(global) {
  /**
   * @module Joy
   * @static
   */
  var Joy = global.Joy || {
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

    /**
     * @method ready
     * @static
     */
    ready: function(callback) {
      document.onload = callback;
    }
  };

  /**
   * @method generateUniqueId
   * @return {String}
   */
  Joy.generateUniqueId = function () {
    return "joy" + (new Date().getTime());
  };

  global.Joy = Joy;
})(window);
