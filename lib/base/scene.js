/**
 * @class Scene
 */
(function(J) {
  var Scene = J.DisplayObjectContainer.extend({
    init: function(options) {
      options = options || {};
      this.engine = options.engine;

      this.shaders = [];

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
    },

    render: function () {
      this._super();

      // Experimental: apply shaders
      if (this.shaders.length > 0) {
        for (var i=0, length = this.shaders.length; i < length; ++i) {
          var imageData = this.ctx.getImageData(0, 0, this.engine.width, this.engine.height);
          this.shaders[i].call(this, imageData);
          this.ctx.putImageData(imageData, 0, 0);
        }
      }

    },

    /**
     * Experimental: add post-processing pixel effect.
     * @method applyShader
     * @param {Function} shader
     */
    addShader: function(shader) {
      this.shaders.push(shader);
    }
  });

  J.Scene = Scene;
})(Joy);
