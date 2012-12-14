/* 
 * Joy.js - v0.0.1pre (http://joyjs.org)
 * Copyright (c) 2012 Joy.js Foundation and other contributors 
 * Build date: 12/14/2012
 */

/**
 * This is the main class for the Joy engine.
 * Everything will be loaded from here, to be used at full extent.
 *
 * @class Joy
 */
var Joy = Joy || {
  /**
   * Initializes the engine and loads up a package.
   * @method Setup
   */
  Setup: function(canvasId) {
    //
  }
};

/*
 * Normalizes browser support
 */

/**
 * window.onEnterFrame
 */
window.onEnterFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ) { window.setTimeout(callback, 1000 / 60); };		// TODO: use FPS rate from render module
})();

(function(J) {
  var Game = function(options) {
    this.render = new J.Render();
  };

  J.Game = Game;
})(Joy);

(function(J) {
  var GameObject = function() {
    this.x = 0;
    this.y = 0;
    this.sprite = null;
    this.transform = null;
  };

  J.GameObject = GameObject;
})(Joy);


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
    this.context = options.canvas;
    this.context.imageSmoothingEnabled = false;
    this.context.mozImageSmoothingEnabled = false;
    this.context.oImageSmoothingEnabled = false;
    this.context.webkitImageSmoothingEnabled = false;
    this.spriteBuffer = {};
    this.onEnterFrame();
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
    this.context.clearRect(0, 0, 320, 240);
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

(function(J) {
  var Sprite = function(options) {
    this.asset = new Image();
    this.x = options.x || 0;
    this.y = options.y || 0;

    if (options.url) {
      this.load(options.url);
    }
  };

  Sprite.prototype.load = function(url, onload) {
    if (onload) {
      this.asset.onload = onload;
    }
    this.asset.src = url;
  };

  J.Sprite = Sprite;
})(Joy);

Joy.Time = {
  deltaTime: 1
};

(function(J) {
  var Transform = function() {
    this.position = null;
    this.localPosition = null;
  };

  J.Transform = Transform;
})(Joy);
