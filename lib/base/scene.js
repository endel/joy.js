/**
 * @class Scene
 */
(function(J) {
  var Scene = J.DisplayObjectContainer.extend({
    init: function(context) {
      this._super();
    },

    addChild: function(displayObject) {
      displayObject.setContext(this.ctx);
      this._super(displayObject);
    }
  });

  J.Scene = Scene;
})(Joy);
