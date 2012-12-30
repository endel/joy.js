/**
 * @class Scene
 */
(function(J) {
  var Scene = J.DisplayObjectContainer.extend({
    init: function(options) {
      options = options || {};
      this.engine = options.engine;
      this._super(options);
    },

    addChild: function(displayObject) {
      displayObject.setContext(this.ctx);
      this._super(displayObject);
    },

    /**
     * Set background
     * @method background
     * @param {Color, String} color
     */
    background: function (color) {
      this.fillStyle(color.toString());
      this.fillRect(0, 0, this.engine.width, this.engine.height);
      return this;
    }
  });

  J.Scene = Scene;
})(Joy);
