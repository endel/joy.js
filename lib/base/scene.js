/**
 * @class Scene
 */
(function(J) {
  var Scene = J.DisplayObjectContainer.extend({
    init: function(context) {
      this._super();
      this.actors = [];
    },

    addChild: function(node) {
      var displayObject;

      if (node instanceof J.Actor) {
        this.actors.push(node);
        displayObject = node.graphic;
      } else {
        displayObject = node;
      }

      displayObject.setContext(this.ctx);
      this._super(displayObject);
    }
  });

  J.Scene = Scene;
})(Joy);
