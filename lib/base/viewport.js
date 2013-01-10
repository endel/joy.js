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
    /**
     * Container DisplayObject
     * @property scene
     * @type {DisplayObject}
     */
    this.scene = options.scene;

    /**
     * DisplayObject that will be followed.
     * @property follow
     * @type {DisplayObject}
     */
    this.follow = options.follow;

    /**
     * @property width
     * @type {Number}
     */
    this.width = options.width;

    /**
     * @property height
     * @type {Number}
     */
    this.height = options.height;
    this.lastTranslateX = 0;
  };

  Viewport.prototype.updateContext = function(ctx) {
    if (this.follow.x > ctx.canvas.width / 2) {
      ctx.translate(  -(this.follow.x) - this.lastTranslateX, 0  );
      this.lastTranslateX = -this.follow.x;
    }
  };

  J.Viewport = Viewport;
})(Joy);
