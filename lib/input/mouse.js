/**
 * @module Joy
 */

var Joy = require('../joy.js');
var Triggerable = require('../core/triggerable');
var RectCollider = require('../collider/rect_collider');
var Vector2d = require('../math/vector2d');
var Events = require('../consts/events');

/**
 * @class Mouse
 * @static
 * @readonly
 */
var Mouse = {
  // Create a 1x1 collider
  collider: new RectCollider(new Vector2d(), 1, 1),

  lastEvent: null,

  updateColliderPosition: function (e) {
    Mouse.collider.position.x = e.offsetX * Joy.currentEngine.currentScene.viewport.scale.x;
    Mouse.collider.position.y = e.offsetY * Joy.currentEngine.currentScene.viewport.scale.y;
    Mouse.collider.updateColliderPosition(Joy.currentEngine.currentScene.viewport.position);
  },

  /**
   * @method isOver
   * @param {DisplayObject} displayObject
   * @static
   * @return {Booelan}
   */
  isOver: function (displayObject) {
    return displayObject.collider.collide(Mouse.collider);
  },

  enable: function(engine) {
    var triggerMouseEvents = function (e) {
      var handlers = Mouse.handlers[e.type];

      this.lastEvent = e;
      Mouse.updateColliderPosition(e);

      for (var i=0, length = handlers.length; i<length; ++i) {
        if ( handlers[i].target.visible && Mouse.isOver(handlers[i].target) ) {
          handlers[i].handler.apply(handlers[i].target, [e]);
        }
      }
    };

    // Bind all mouse events
    engine.context.canvas['on' + Events.CLICK] = triggerMouseEvents;
    engine.context.canvas['on' + Events.DOUBLE_CLICK] = triggerMouseEvents;
    engine.context.canvas['on' + Events.MOUSE_MOVE] = triggerMouseEvents;
    engine.context.canvas['on' + Events.MOUSE_DOWN] = triggerMouseEvents;
    engine.context.canvas['on' + Events.MOUSE_UP] = triggerMouseEvents;
  },

  handlers: {},
  timers: {}
};

/**
 * Events.MOUSE_DOWN
 * @type {String}
 * @static
 * @final
 */
Events.MOUSE_DOWN = 'mousedown';

/**
 * Events.MOUSE_UP
 * @type {String}
 * @static
 * @final
 */
Events.MOUSE_UP = 'mouseup';

/**
 * Events.MOUSE_MOVE
 * @type {String}
 * @static
 * @final
 */
Events.MOUSE_MOVE = 'mousemove';

/**
 * Events.CLICK
 * @type {String}
 * @static
 * @final
 */
Events.CLICK = 'click';

/**
 * Events.DOUBLE_CLICK
 * @type {String}
 * @static
 * @final
 */
Events.DOUBLE_CLICK = 'dblclick';

/**
 * TODO: not implemented yet
 *       only available attaching Joy.Behaviour.Button behaviour
 *
 * Events.MOUSE_OVER
 * @type {String}
 * @static
 * @final
 */
Events.MOUSE_OVER = 'mouseover';

/**
 * TODO: not implemented yet
 *       only available attaching Joy.Behaviour.Button behaviour
 *
 * Events.MOUSE_OUT
 * @type {String}
 * @static
 * @final
 */
Events.MOUSE_OUT = 'mouseout';

[Events.CLICK, Events.DOUBLE_CLICK, Events.DOUBLE_CLICK, Events.MOUSE_MOVE, Events.MOUSE_DOWN, Events.MOUSE_UP].forEach(function(eventType) {
  Mouse.handlers[eventType] = [];

  Triggerable.register(eventType, function(evt) {
    if (Mouse.handlers[eventType].indexOf(evt) === -1) {
      Mouse.handlers[eventType].push(evt);
    }
  }, function(evt) {
    var index = Mouse.handlers[eventType].indexOf(evt);
    if (index !== -1) {
      Mouse.handlers[eventType].splice(index, 1);
    }
  });
});

module.exports = Mouse;
