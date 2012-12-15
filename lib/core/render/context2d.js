/**
 * The Context2ding class is responsible for drawing everything at the canvas.
 * It works using a buffer of sprites, so you can use it alone, adding sprites to it.
 * Sprites are arranged into layers, so to speed up the Context2ding process.
 * You can have as much layers as you wish, although remember that, the more layers you have, the slower the Context2ding will be.
 * Animations are also handled by the class.
 *
 * @class Context2d
*/
(function(J) {
  // TODO: find a better way to reference currentContext instance.
  // What will happen when we have two canvas contexts at the same time? (like a mini-map?)
  var currentContext = null;

  /**
   * Initializes the currentContext.
   *
   * @method constructor
   * @option [context] {Object} 2d canvas context to be used on the Context2ding.
   */
  var Context2d = function(options) {
    currentContext = this;
    this.canvas = options.canvas;
    this.context = this.canvas.getContext('2d');
    this.setSmooth(false);
    this.spriteBuffer = {};
    this.pipeline = [];

    // requestAnimationFrame
    this.onEnterFrame();
  };

  /**
   * setSmooth
   * @param enabled {Boolean} Enable image smoothing?
   */
  Context2d.prototype.setSmooth = function(bool) {
    this.context.imageSmoothingEnabled = bool;
    this.context.mozImageSmoothingEnabled = bool;
    this.context.oImageSmoothingEnabled = bool;
    this.context.webkitImageSmoothingEnabled = bool;
    return this;
  };

  Context2d.prototype.setCanvas = function(canvas) {
    this.canvas = canvas;
    return this;
  };

  Context2d.prototype.addChild = function(node) {
    node.setContext(this.context);
    this.pipeline.push(node);
  };

  Context2d.prototype.removeChild = function() {
    // TODO
  };

  /**
   * Clears the entire screen.
   *
   * @method clear
   */
  Context2d.prototype.clear = function () {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    return this;
  };

  /**
   * Context2ds everything in the buffer to the screen.
   *
   * @method Context2d
   */
  Context2d.prototype.render = function () {
    var len = this.pipeline.length, i = 0;
    this.clear();

    for (; i < len; ++i) {
      this.pipeline[i].render();
    }
  };

  Context2d.prototype.onEnterFrame = function () {
    window.onEnterFrame(currentContext.onEnterFrame);
    currentContext.render();
  };

  // Exports Context2d module
  J.Context.Context2d = Context2d;
})(Joy);
