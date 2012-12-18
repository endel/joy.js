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
    this.setCanvas(options.canvas);
    this.setSmooth(false);
  };

  /**
   * setSmooth
   * @param {Boolean} enabled Enable image smoothing?
   */
  Context2d.prototype.setSmooth = function(bool) {
    this.ctx.imageSmoothingEnabled = bool;
    this.ctx.mozImageSmoothingEnabled = bool;
    this.ctx.oImageSmoothingEnabled = bool;
    this.ctx.webkitImageSmoothingEnabled = bool;
    return this;
  };

  Context2d.prototype.setCanvas = function(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    return this;
  };

  /**
   * Clears the entire screen.
   * @method clear
   */
  Context2d.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    return this;
  };

  /**
   * Render everything in the buffer to the screen.
   * @method Context2d
   */
  Context2d.prototype.render = function (scenes) {
    var len = scenes.length, i = 0;
    this.clear();

    for (; i < len; ++i) {
      //
      // TODO: save/restore bottleneck.
      // Removing save/restore increases ~10fps, rendering 1000 sprites on sprite-benchmark.html example.
      //
      scenes[i].render();
    }
  };

  // Exports Context2d module
  J.Context.Context2d = Context2d;
})(Joy);
