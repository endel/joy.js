(function(J) {
  /**
   * Built-in behaviour that handles OVER/OUT/CLICK events from mouse.
   * May be appended to any DisplayObject, by `behave` method.
   *
   * @example Append Button behavior into a HUD instance.
   *   play.behave(Joy.Behaviour.Button);
   *   play.bind(J.Events.CLICK, function() {
   *     console.log("Mouse is mine!");
   *   })
   *   play.bind(J.Events.MOUSE_OVER, function() {
   *     console.log("Mouse is mine!");
   *   })
   *   play.bind(J.Events.MOUSE_OUT, function() {
   *     console.log("Mouse is leaving me!");
   *   })
   *
   * @class Behaviour.Button
   */

  var Button = J.Behaviour.extend({
    INIT: function (options) {
      /**
       * @property isOver
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

  J.Behaviour.Button = Button;
})(Joy);

