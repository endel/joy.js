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
    this.onEnterFrame();
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
  }

  Render.prototype.setCanvas = function(canvas) {
    this.canvas = canvas;
  };

  /**
   * Adds a sprite to the rendering buffer.
   *
   * @method AddToBuffer
   * @param sprite {Object} The sprite to be added.
   * @param sprite.asset {Object} An Image object containing the sprite.
   * @param sprite.x {Number} The horizontal position.
   * @param sprite.y {Number} The vertical position.
   * @param [layer] {Number} The layer where the sprite will be rendered. If none is specified, then the top layer is used.
   */
  Render.prototype.addToBuffer = function(sprite, layer){
    layer = typeof layer == 'undefined' ? this.spriteBuffer.length - 1 : layer;
    var l = this.spriteBuffer[layer];

    if (typeof this.spriteBuffer[layer] == 'undefined') {
      this.spriteBuffer[layer] = [];
    }

    this.spriteBuffer[layer].push(sprite);
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
  };

  /**
   * Renders everything in the buffer to the screen.
   *
   * @method render
   */
  Render.prototype.render = function () {
    this.clear();

    for (var layer in this.spriteBuffer) {
      for (var sprite in this.spriteBuffer[layer]) {
        // TODO: check for visibility/position and render only what is needed.
        this.renderSprite(this.spriteBuffer[layer][sprite]);
      }
    }
  };

  /**
   * Renders a single sprite.
   *
   * @method renderSprite
   * @param sprite {Object} The sprite object.
   */
  Render.prototype.renderSprite = function (sprite) {
    this.context.drawImage(sprite.asset, sprite.x, sprite.y, sprite.asset.width, sprite.asset.height);
  };

  Render.prototype.onEnterFrame = function () {
    window.onEnterFrame(renderer.onEnterFrame);
    renderer.render();
  };

  // Exports Render module
  J.Render = Render;
})(Joy);
