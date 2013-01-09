/**
 * @class Scene
 */
(function(J) {
  var Scene = J.DisplayObjectContainer.extend({
    init: function(options) {
      options = options || {};
      this.engine = options.engine;

      /**
       * @property viewport
       * @type {Viewport}
       */
      this.viewport = null;

      /**
       * Is the scene on paused state?
       * @property paused
       * @type {Boolean}
       */
      this.paused = false;

      /**
       * List of active shaders on the scene.
       * @property shaders
       * @type {Array}
       */
      this.shaders = [];

      this._super(options);
    },

    /**
     * @method createViewport
     * @see Viewport.constructor
     */
    createViewport: function (options) {
      this.viewport = new J.Viewport(options);
      return this;
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

    /**
     * @method pause
     * @param {Object} options
     * @param {Number} options.blur radius for gaussian blur filter (optional)
     * @return this
     */
    pause: function (options) {
      options = options || {};
      if (options.blur) {
        this.render();
        J.Shader.process(this.ctx, J.Shader.blur, options.blur);
      }
      this.paused = true;
      this.trigger('pause');
      return this;
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
     * @param {Object} options shader options (optional)
     * @return this
     */
    addShader: function(shader, args) {
      this.shaders.push([shader, args]);
      return this;
    }
  });

  J.Scene = Scene;
})(Joy);
