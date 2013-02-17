/**
 * @module Joy
 */
(function(J) {
  /**
   * Event triggering and handling.
   *
   * @class Triggerable
   * @constructor
   */
  var Triggerable = J.Object.extend({
    init: function() {
      this._handlers = {};
      this._behaviours = [];
    },

    /**
     * Behave like a {Behaviour}
     * @method behave
     * @param {Behaviour}
     * @return {Triggerable} this
     */
    behave: function (Behaviour) {
      this._behaviours.push(Behaviour);

      var behaviour = new Behaviour();
      for (var i in behaviour) {
        if (typeof(Joy.Events[i])==="string") {
          this.bind(Joy.Events[i], behaviour[i]);

        } else if (i !== "constructor") { // Deny 'constructor' method of being overwritten
          // Define methods on this instance
          this[i] = behaviour[i];
        }
      }
      return this;
    },

    /**
     * This object behaves as {target} behaviour?
     * @method hasBehaviour
     * @param {Behaviour} target
     * @return {Boolean}
     */
    hasBehaviour: function (behaviour) {
      return this._behaviours.indexOf(behaviour) >= 0;
    },

    /**
     * Bind event handler
     * @method bind
     * @param {String} type event type
     * @param {Function} handler
     * @return {Triggerable} this
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
     * @method unbind
     * @param {String} type event type
     * @return {Triggerable} this
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
     * @method trigger
     * @param {String} type event type
     * @param {Array} arguments arguments for callback
     * @param {Number} delay
     *  @optional
     */
    trigger: function (type, args, delay) {
      var handlers = this._handlers[type] || [];

      args = args || [];
      delay = delay || 0;

      for (var i = 0, length = handlers.length; i<length; ++i) {
        handlers[i].apply(this, args);
      }
    },

    broadcast: function (type, args, delay) {
      this.trigger(type, args, delay);
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

  // 'init' is triggered right when it's binded.
  Triggerable.register(Joy.Events.INIT, function(evt) {
    evt.handler.call(this);
  });

  // Exports module
  J.Triggerable = Triggerable;
})(Joy);
