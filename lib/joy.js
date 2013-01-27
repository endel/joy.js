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
       * Triggered when DisplayObject is initialized.
       * @property Events.INIT
       * @type {String}
       * @static
       * @readonly
       */
      INIT: 'init',

      /**
       * Triggered when scene is loaded.
       * @property Events.SCENE_ACTIVE
       * @type {String}
       * @static
       * @readonly
       */
      SCENE_ACTIVE: 'sceneActive',

      /**
       * Triggered when DisplayObject is added into DisplayObjectContainer.
       * @property Events.ADDED
       * @type {String}
       * @static
       * @readonly
       */
      ADDED: 'added',

      /**
       * Triggered when DisplayObject is removed from DisplayObjectContainer.
       * @property Events.REMOVED
       * @type {String}
       * @static
       * @readonly
       */
      REMOVED: 'removed',

      /**
       * Triggered at every frame.
       * @property Events.UPDATE
       * @type {String}
       * @static
       * @readonly
       */
      UPDATE: 'update',

      /**
       * Triggered on collision update.
       * @property Events.COLLISION
       * @type {String}
       * @static
       * @readonly
       */
      COLLISION: 'collision',

      /**
       * Triggered at the moment collision starts.
       * @property Events.COLLISION_START
       * @type {String}
       * @static
       * @readonly
       */
      COLLISION_ENTER: 'collisionEnter',

      /**
       * Triggered at the moment collision ends.
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

  /**
   * @method generateUniqueId
   * @return {String}
   */
  Joy.generateUniqueId = function () {
    return "joy" + (new Date().getTime());
  };

  global.Joy = Joy;
})(window);
