(function(J) {
  /**
   * Event triggering and handling.
   *
   * Based on [@mrdoob's](https://github.com/mrdoob/eventdispatcher.js) implementation.
   *
   * @class Triggerable
   * @constructor
   */
  var Triggerable = Class.extend({
    init: function() {
      this._handlers = {};
    },

    /**
     * Bind event handler
     * @param {String} type event type
     * @param {Function} handler
     * @return this
     */
    bind: function (type, handler) {
      if (this._handlers[type] === undefined) {
        this._handlers[type] = [];
      }
      if (this._handlers[type].indexOf(handler) === -1) {
        this._handlers[type].push(handler);
      }
      return this;
    },

    /**
     * Remove event handler
     * @param {String} type event type
     * @param {Function} handler
     * @return this
     */
    unbind: function (type, handler) {
      var index = this._handlers[type].indexOf(handler);
      if (index !== - 1) {
        this._handlers[ type ].splice( index, 1 );
      }
      return this;
    },

    /**
     * Triggers event type
     * @param {String} type event type
     * @param {Array} arguments arguments for callback
     * @param {Number} delay
     *  @optional
     */
    trigger: function (type, args, delay) {
      var handlers = this._handlers[type] || [],
          i = 0,
          length = handlers.length,
          self = this;

      args = args || [];
      delay = delay || 0;

      if (length > 0) {
        for (; i<length; ++i) {
          handlers[i].apply(this, args);
        }
      }
    }
  });

  // Exports module
  J.Triggerable = Triggerable;
})(Joy);
