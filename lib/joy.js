(function(global) {
  /**
   * Joy namespace
   * @class Joy
   */
  var Joy = global.Joy || {
    Init: {},
    Render: {},
    Input: {},
    Context: {},

    Events: {
      UPDATE: 'update'
    },

    /**
     * @property debug
     * @type {Boolean}
     * @static
     * @default false
     */
    debug: false,

    /**
     * @property deltaTime
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

  global.Joy = Joy;
})(window);
