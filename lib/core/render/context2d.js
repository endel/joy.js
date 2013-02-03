/**
 * @module Joy
 */
(function(J) {
  /**
   * @class Context2d
   * @constructor
   * @param {Object} options
   */
  var Context2d = function(options) {
    this.setCanvas(options.canvas);
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
   * @method render
   */
  Context2d.prototype.render = function (scenes) {
    this.clear();
    for (var i = 0, len = scenes.length; i < len; ++i) {
      if (!scenes[i].visible) { continue; }
      scenes[i].render();
    }
  };

  // Exports Context2d module
  J.Context.Context2d = Context2d;
})(Joy);
