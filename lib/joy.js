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
      /**
       * @property Events.UPDATE
       * @type {String}
       * @static
       * @readonly
       */
      UPDATE: 'update',

      /**
       * @property Events.COLLISION
       * @type {String}
       * @static
       * @readonly
       */
      COLLISION: 'collision',

      /**
       * @property Events.COLLISION_START
       * @type {String}
       * @static
       * @readonly
       */
      COLLISION_ENTER: 'collisionEnter',

      /**
       * @property Events.COLLISION_EXIT
       * @type {String}
       * @static
       * @readonly
       */
      COLLISION_EXIT: 'collisionExit'
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
