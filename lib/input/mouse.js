(function(J) {
  /**
   * Events.MOUSE_DOWN
   * @type {String}
   * @static
   * @final
   */
  J.Events.MOUSE_DOWN = (J.Support.touch) ? 'touchstart' : 'mousedown';

  /**
   * Events.MOUSE_UP
   * @type {String}
   * @static
   * @final
   */
  J.Events.MOUSE_UP = (J.Support.touch) ? 'touchend' : 'mouseup';

  /**
   * Events.MOUSE_MOVE
   * @type {String}
   * @static
   * @final
   */
  J.Events.MOUSE_MOVE = (J.Support.touch) ? 'touchmove' : 'mousemove';

  /**
   * Events.CLICK
   * @type {String}
   * @static
   * @final
   */
  J.Events.CLICK = 'click';

  /**
   * Events.DOUBLE_CLICK
   * @type {String}
   * @static
   * @final
   */
  J.Events.DOUBLE_CLICK = 'dblclick';

  /**
   * TODO: not implemented yet
   *       only available attaching Joy.Behaviour.Button behaviour
   *
   * Events.MOUSE_OVER
   * @type {String}
   * @static
   * @final
   */
  J.Events.MOUSE_OVER = 'mouseover';

  /**
   * TODO: not implemented yet
   *       only available attaching Joy.Behaviour.Button behaviour
   *
   * Events.MOUSE_OUT
   * @type {String}
   * @static
   * @final
   */
  J.Events.MOUSE_OUT = 'mouseout';

  var Mouse = {
    // Create a 1x1 collider
    collider: new J.RectCollider(new J.Vector2d(), 1, 1),

    lastEvent: null,

    updateColliderPosition: function (e) {
      Mouse.collider.position.x = e.offsetX * J.currentEngine.currentScene.viewport.scale.x;
      Mouse.collider.position.y = e.offsetY * J.currentEngine.currentScene.viewport.scale.y;
      Mouse.collider.updateColliderPosition(J.currentEngine.currentScene.viewport.position);
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
      var triggerMouseEvents = function (event) {
        var handlers = Mouse.handlers[event.type];

        this.lastEvent = event;
        Mouse.updateColliderPosition(event);

        for (var i=0, length = handlers.length; i<length; ++i) {
          if ( handlers[i].target.visible && Mouse.isOver(handlers[i].target) ) {
            handlers[i].handler.apply(handlers[i].target, [event]);
          }
        }
      };

      engine.context.canvas.onclick = triggerMouseEvents;
      engine.context.canvas.ondblclick = triggerMouseEvents;
      engine.context.canvas['on' + J.Events.MOUSE_DOWN] = triggerMouseEvents;
      engine.context.canvas['on' + J.Events.MOUSE_UP] = triggerMouseEvents;
      engine.context.canvas.onmousemove = triggerMouseEvents;
    },

    handlers: {}
  };

  [J.Events.CLICK, J.Events.DOUBLE_CLICK, J.Events.DOUBLE_CLICK, J.Events.MOUSE_MOVE, J.Events.MOUSE_DOWN, J.Events.MOUSE_UP].forEach(function(eventType) {
    Mouse.handlers[eventType] = [];

    J.Triggerable.register(eventType, function(evt) {
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

  J.Mouse = Mouse;
})(Joy);
