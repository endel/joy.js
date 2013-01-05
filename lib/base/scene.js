/**
 * @class Scene
 */
(function(J) {
  var Scene = J.DisplayObjectContainer.extend({
    init: function(options) {
      options = options || {};
      this.engine = options.engine;
      this.paused = false;
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

    pause: function (options) {
      options = options || {};
      if (options.blur) {
        this.render();
        J.Shader.process(this.ctx, J.Shader.blur, options.blur);
        this.trigger('pause');
      }
      this.paused = true;
    },

    render: function () {
      // Don't render when paused
      if (this.paused) { return; }

      this._super();

      // Experimental: apply shaders
      if (this.shaders.length > 0) {
        for (var i=0, length = this.shaders.length; i < length; ++i) {
          J.Shader.process(this.ctx, this.shaders[i][0], this.shaders[i][1]);
        }
      }

    },

    /**
     * Experimental: add post-processing pixel effect.
     * @method addShader
     * @param {Function} shader
     */
    addShader: function(shader, arguments) {
      this.shaders.push([shader, arguments]);
    }
  });

  J.Scene = Scene;
})(Joy);
