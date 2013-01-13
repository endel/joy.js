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
     * @property position
     * @type {Vector2d}
     */
    this.position = new J.Vector2d();

    this.setup(options);
  };

  Viewport.prototype.setup = function(options) {
    /**
     * DisplayObject that will be followed.
     * @property follow
     * @type {DisplayObject}
     */
    if (options.follow) {
      this.follow = options.follow;
    }

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

    //this.ctx.scale(this.ctx.canvas.width / this.width, this.ctx.canvas.height / this.height);
  };

  /**
   * TODO: not supported yet
   * @method setDeadzone
   * @param {Number} width
   * @param {Number} height
   * @return {Viewport} this
   */
  Viewport.prototype.setDeadzone = function(width, height) {
    this.deadzone = new J.Vector2d(width, height);
    return this;
  };

  Viewport.prototype.updateContext = function() {
    var translateX = 0,
        translateY = 0,
        widthLimit = this.ctx.canvas.width / 2,
        heightLimit = this.ctx.canvas.height / 2;

    if (this.follow.position.x > widthLimit) {
      this.position.x += this.follow.velocity.x / 2;
      translateX = this.follow.velocity.x;
    } else {
      this.position.x = 0;
    }

    if (this.follow.position.y > heightLimit) {
      this.position.y += this.follow.velocity.y / 2;
      translateY = this.follow.velocity.y;
    } else {
      this.position.y = 0;
    }

    this.ctx.translate(translateX * -1, translateY * -1);
  };

  J.Viewport = Viewport;
})(Joy);
