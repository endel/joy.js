/**
 * The Context2d class is responsible for drawing everything at the canvas.
 * It works using a buffer of sprites, so you can use it alone, adding sprites to it.
 * Sprites are arranged into layers, so to speed up the Context2ding process.
 * You can have as much layers as you wish, although remember that, the more layers you have, the slower the Context2ding will be.
 * Animations are also handled by the class.
 *
 * @class Context2d
*/
(function(J) {
  /**
   * Initializes 2d context
   * @param {Object} options
   * @constructor
   */
  var Context2d = function(options) {
    this.canvas = options.canvas;
    this.context = this.canvas.getContext('2d');
    this.setSmooth(false);
    this.spriteBuffer = {};
    this.pipeline = [];
  };

  /**
   * setSmooth
   * @param {Boolean} enabled Enable image smoothing?
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

  /**
   * Add a graphic object into context rendering pipeline
   * @param {Renderable} node
   */
  Context2d.prototype.addChild = function(node) {
    node.setContext(this.context);
    this.pipeline.push(node);
  };

  Context2d.prototype.removeChild = function() {
    // TODO
  };

  /**
   * Clears the entire screen.
   * @method clear
   */
  Context2d.prototype.clear = function () {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    return this;
  };

  /**
   * Context2ds everything in the buffer to the screen.
   * @method Context2d
   */
  Context2d.prototype.render = function () {
    var len = this.pipeline.length, i = 0;
    this.clear();

    for (; i < len; ++i) {
      //
      // TODO: save/restore bottleneck.
      // Removing save/restore increases ~10fps, rendering 1000 sprites on sprite-benchmark.html example.
      //
      this.context.save();
      this.pipeline[i].render();
      this.context.restore();
    }
  };

  // Exports Context2d module
  J.Context.Context2d = Context2d;
})(Joy);
