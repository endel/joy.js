/**
 * @module Joy
 */

var Class = require('./class');
var Behaviour = require('../behaviour/behaviour');
var Events = require('../consts/events');

/**
 * Event triggering and handling.
 *
 * @class Triggerable
 * @constructor
 */
var Triggerable = Class.extend({
  init: function(options) {
    this._handlers = (options && options._handlers) || {};
    this._behaviours = (options && options._behaviours) || [];

    if (options && options.behaviour) {
      console.log(options.behaviour);
      this.behave(options.behaviour);
    }
  },

  /**
   * Behave like a {Behaviour}
   * @method behave
   * @param {String | Behaviour} behaviour
   * @return {Triggerable} this
   */
  behave: function (behaviourClass, options) {
    var i;

    // Split behaviours if string was given
    if (typeof(behaviourClass)==="string") {
      var last, behaviours = behaviourClass.split(",");
      for (i = 0, l = behaviours.length; i < l; i ++) {
        last = this.behave(Behaviour.get(behaviours[i].replace(" ", '')), options);
      }
      return last;
    }

    this._behaviours.push(behaviourClass.id);
    var behaviour = new behaviourClass(options);

    for (i in behaviour) {
      if (typeof(Events[i])==="string") {
        this.bind(Events[i], behaviour[i]);

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
   * @param {String} behaviourName
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
Triggerable.register(Events.INIT, function(evt) {
  evt.handler.call(this);
});

// Exports module
module.exports = Triggerable;
