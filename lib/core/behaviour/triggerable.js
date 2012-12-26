(function(J) {
  /**
   * Event triggering and handling.
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
      var data = handler;

      // Custom bind
      if (Triggerable._custom.bind[type] !== undefined) {
        data = { target: this, handler: handler };
        Triggerable._custom.bind[type].call(this, data);
      }

      // Register bind in the instance
      if (this._handlers[type] === undefined) {
        this._handlers[type] = [];
      }
      if (this._handlers[type].indexOf(data) === -1) {
        this._handlers[type].push(data);
      }
      return this;
    },

    /**
     * Remove event handlers
     * @param {String} type event type
     * @return this
     */
    unbind: function (type) {
      // Custom unbind
      if (Triggerable._custom.unbind[type] !== undefined) {
        for (var i=0, length=this._handlers[type].length; i<length;++i) {
          Triggerable._custom.unbind[type].call(this, this._handlers[type][i]);
        }
      }

      // Unbind from this instance
      this._handlers[type] = null;
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

  Triggerable._custom = {
    'bind': {},
    'unbind' : {}
  };

  /**
   * Register default method handler.
   * @method register
   * @param {String} type
   * @param {Function} bindCallback
   * @param {Function} unbindCallback
   *
   * @static
   */
  Triggerable.register = function(type, bindCallback, unbindCallback) {
    Triggerable._custom.bind[type] = bindCallback;
    Triggerable._custom.unbind[type] = unbindCallback;
    return this;
  };

  // Exports module
  J.Triggerable = Triggerable;
})(Joy);
