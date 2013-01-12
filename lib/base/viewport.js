(function(J) {
  /**
   * @class Viewport
   * @constructor
   *
   * @param {Object} options
   * @param {DisplayObject} options.follow
   * @param {Number} options.width
   * @param {Number} options.height
   */
  var Viewport = function(options) {
    this.setup(options);
    this.lastTranslateX = 0;
  };

  Viewport.prototype.setup = function(options) {
    /**
     * @property position
     * @type {Vector2d}
     */
    this.position = new J.Vector2d();

    /**
     * DisplayObject that will be followed.
     * @property follow
     * @type {DisplayObject}
     */
    if (options.follow) {
      this.follow = options.follow;
    }

    console.log("Setup viewport!", options, options.scene);

    /**
     * Container DisplayObject
     * @property scene
     * @type {DisplayObject}
     */
    if (options.scene) {
      this.scene = options.scene;
      this.ctx = this.scene.ctx;
    }

    /**
     * @property width
     * @type {Number}
     */
    if (options.width) {
      this.width = options.width;
    }

    /**
     * @property height
     * @type {Number}
     */
    if (options.height) {
      this.height = options.height;
    }
  };

  Viewport.prototype.updateContext = function() {
    if (this.follow.position.x > this.ctx.canvas.width / 2) {
      this.ctx.translate(  -(this.follow.position.x) - this.position.x, 0  );
      this.position.x = -this.follow.position.x;
    }
  };

  J.Viewport = Viewport;
})(Joy);
