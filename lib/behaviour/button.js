/**
 * @module Joy.Behaviour
 */
(function(J) {
  /**
   * Built-in behaviour that handles OVER/OUT/CLICK events from mouse.
   * May be appended to any DisplayObject, by `behave` method.
   *
   * @class Button
   * @constructor
   *
   * @example
   *     play = new Joy.DisplayObject(...);
   *
   *     // Append Button behavior into a HUD instance.
   *     play.behave(Joy.Behaviour.Button);
   *
   *     // Bind event handlers
   *     play.bind(Joy.Events.CLICK, function() {
   *       console.log("Mouse is mine!");
   *     })
   *     play.bind(Joy.Events.MOUSE_OVER, function() {
   *       console.log("Mouse is mine!");
   *     })
   *     play.bind(Joy.Events.MOUSE_OUT, function() {
   *       console.log("Mouse is leaving me!");
   *     })
   */

  J.Behaviour.define('Button', {
    INIT: function (options) {
      /**
       * @attribute isOver
       * @type {Boolean}
       */
      this.isOver = false;
    },

    UPDATE: function () {
      var isOver = J.Mouse.isOver(this);

      if (isOver && !this.isOver) {
        this.trigger(J.Events.MOUSE_OVER);
      } else if (!isOver && this.isOver) {
        this.trigger(J.Events.MOUSE_OUT);
      }

      this.isOver = isOver;
    }
  });

})(Joy);

