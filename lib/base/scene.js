/**
 * @module Joy
 */
(function(J) {
  var Scene = J.DisplayObjectContainer.extend({
    /**
     * @class Scene
     * @constructor
     * @param {Object} options
     */
    init: function(options) {
      if (!options) { options = {}; }

      // Initialize scenes as invisible as default.
      // Use Engine methods to toggle scene visibility
      if (typeof(options.visible) === "undefined") {
        options.visible = false;
      }

      this._super(options);

      /**
       * Is the scene on paused state?
       * @attribute paused
       * @type {Boolean}
       */
      this.paused = false;

      /**
       * List of active shaders on the scene.
       * @attribute shaders
       * @type {Array}
       */
      this.shaders = [];

      /**
       * @attribute viewport
       * @type {Viewport}
       */
      this.viewport = options.viewport || new J.Viewport({scene: this});
    },

    /**
     * Set background
     * @method background
     * @param {Color, String} color
     */
    background: function (color) {
      this._backgroundColor = color;
      this.fillStyle(color.toString());
      this.fillRect(0, 0, this.width, this.height);
      return this;
    },

    /**
     * @method pause
     * @param {Object} options
     * @param {Number} options.blur radius for gaussian blur filter (optional)
     * @return {Scene} this
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

    updateContext: function () {
      this._super();

      // Update viewport context, if it's set.
      if (this.viewport.follow) {
        this.viewport.updateContext();
      }
    },

    render: function () {
      // Don't render when paused
      if (this.paused) { return; }

      this.updateContext();
      this._super();

      this.viewport.render();

      // Experimental: apply shaders
      if (this.shaders.length > 0) {
        for (var i=0, length = this.shaders.length; i < length; ++i) {
          J.Shader.process(this.ctx, this.shaders[i][0], this.shaders[i][1]);
        }
      }
    },

    /**
     * @method fadeOut
     * @param {Number} milliseconds
     * @param {String, Color} color
     * @return {Scene} this
     */
    fadeOut: function (milliseconds, color) {
      var self = this,
          rectangle = new J.Rect({
        width: this.viewport.width,
        height: this.viewport.height,
        alpha: 0
      }).colorize(color);
      self.trigger('fadeOutStart');

      this.viewport.addHud(rectangle);
      var interval = setInterval(function () {
        rectangle.alpha += ((1000 / milliseconds) / 60) * J.deltaTime;
        if (rectangle.alpha >= 1) {
          clearInterval(interval);
          self.viewport.hud.removeChild(rectangle);
          self.trigger('fadeOutComplete');
        }
      }, 1);
      return this;
    },

    /**
     * @method fadeIn
     * @param {Number} milliseconds
     * @param {String, Color} color
     * @return {Scene} this
     */
    fadeIn: function (milliseconds, color) {
      var self = this,
          rectangle = new J.Rect({
        width: this.viewport.width,
        height: this.viewport.height,
        alpha: 1
      }).colorize(color);
      self.trigger('fadeInStart');

      this.viewport.addHud(rectangle);
      var interval = setInterval(function () {
        rectangle.alpha -= ((1000 / milliseconds) / 60) * J.deltaTime;
        if (rectangle.alpha <= 0) {
          clearInterval(interval);
          self.viewport.hud.removeChild(rectangle);
          self.trigger('fadeInComplete');
        }
      }, 1000 / 60);
      return this;
    },


    /**
     * Experimental: add post-processing pixel effect.
     * @method addShader
     * @param {Function} shader
     * @param {Object} options shader options (optional)
     * @return {Scene} this
     */
    addShader: function(shader, args) {
      this.shaders.push([shader, args]);
      return this;
    }
  });

  J.Scene = Scene;
})(Joy);
