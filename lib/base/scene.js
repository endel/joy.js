/**
 * @class Scene
 */
(function(J) {
  var Scene = J.DisplayObjectContainer.extend({
    init: function(options) {
      this._super(options || {});
    },

    addChild: function(displayObject) {
      displayObject.setContext(this.ctx);
      this._super(displayObject);
    }
  });

  J.Scene = Scene;
})(Joy);
