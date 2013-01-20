(function(J) {
  /**
   * Events.MOUSE_DOWN
   * @type {String}
   * @static
   * @final
   */
  J.Events.MOUSE_DOWN = 'mousedown';

  /**
   * Events.MOUSE_UP
   * @type {String}
   * @static
   * @final
   */
  J.Events.MOUSE_UP = 'mouseup';

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
   * Events.MOUSE_MOVE
   * @type {String}
   * @static
   * @final
   */
  J.Events.MOUSE_MOVE = 'mousemove';

  /**
   * Events.MOUSE_OVER
   * @type {String}
   * @static
   * @final
   */
  J.Events.MOUSE_OVER = 'mouseover';

  /**
   * Events.MOUSE_OUT
   * @type {String}
   * @static
   * @final
   */
  J.Events.MOUSE_OUT = 'mouseout';

  var Mouse = {
    // Create a 1x1 collider
    collider: new J.RectCollider(new J.Vector2d(), 1, 1),

    enable: function(engine) {
      var updateColliderPosition = function (e) {
        Mouse.collider.position.x = e.offsetX * engine.currentScene.viewport.scale.x;
        Mouse.collider.position.y = e.offsetY * engine.currentScene.viewport.scale.y;
        Mouse.collider.updateColliderPosition(engine.currentScene.viewport.position);
      };

      engine.context.canvas.onclick = function(e) {
        var i, length,
            handlers = Mouse.handlers[e.type];

        updateColliderPosition(e);

        for (i=0, length = handlers.length; i<length; ++i) {
          console.log("Mouse collider: ", Mouse.collider.collidePosition.toString(), "Target collider: ", handlers[i].target.collidePosition.toString());

          if (handlers[i].target.visible && handlers[i].target.collider.collide(Mouse.collider)) {
            handlers[i].handler.apply(handlers[i].target, [e]);
          }
        }
      };

      engine.context.canvas.onmousedown = function(e) {
        updateColliderPosition(e);
      };

      engine.context.canvas.onmouseup = function(e) {
        updateColliderPosition(e);
      };

      engine.context.canvas.onmousemove = function(e) {
        updateColliderPosition(e);
      };
    },

    handlers: {}
  };

  [J.Events.CLICK, J.Events.DOUBLE_CLICK, J.Events.MOUSE_MOVE, J.Events.MOUSE_DOWN, J.Events.MOUSE_UP].forEach(function(eventType) {
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
