/**
 * The rendering class is responsible for drawing everything at the canvas.
 * It works using a buffer of sprites, so you can use it alone, adding sprites to it.
 * Sprites are arranged into layers, so to speed up the rendering process.
 * You can have as much layers as you wish, although remember that, the more layers you have, the slower the rendering will be.
 * Animations are also handled by the class.
 *
 * @class Render
*/
(function(J) {
  'use strict';

  // TODO: find a better way to reference renderer instance.
  // What will happen when we have two canvas rendering at the same time? (like a mini-map?)
  var renderer = null;

  /**
   * Initializes the renderer.
   *
   * @method constructor
   * @option [context] {Object} 2d canvas context to be used on the rendering.
   */
  var Render = function(options) {
    renderer = this;
    this.canvas = options.canvas;
    this.context = this.canvas.getContext('2d');
    this.setSmooth(false);
    this.spriteBuffer = {};
    this.pipeline = [];

    // requestAnimationFrame
    this.onEnterFrame();
  };

  Render.prototype.getHeight = function() {
    return this.canvas.height;
  };

  Render.prototype.getWidth = function() {
    return this.canvas.width;
  };

  /**
   * setSmooth
   * @param enabled {Boolean} Enable image smoothing?
   */
  Render.prototype.setSmooth = function(bool) {
    this.context.imageSmoothingEnabled = bool;
    this.context.mozImageSmoothingEnabled = bool;
    this.context.oImageSmoothingEnabled = bool;
    this.context.webkitImageSmoothingEnabled = bool;
    return this;
  };

  Render.prototype.setCanvas = function(canvas) {
    this.canvas = canvas;
    return this;
  };

  Render.prototype.addChild = function(node) {
    node.setContext(this.context);
    this.pipeline.push(node);
  };

  Render.prototype.removeFromBuffer = function() {
    // TODO
  };

  /**
   * Clears the entire screen.
   *
   * @method clear
   */
  Render.prototype.clear = function () {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    return this;
  };

  /**
   * Renders everything in the buffer to the screen.
   *
   * @method render
   */
  Render.prototype.render = function () {
    var len = this.pipeline.length, i = 0;
    this.clear();

    for (; i < len; ++i) {
      this.pipeline[i].render();
    }
  };

  Render.prototype.onEnterFrame = function () {
    window.onEnterFrame(renderer.onEnterFrame);
    renderer.render();
  };

  // Exports Render module
  J.Render = Render;
})(Joy);
