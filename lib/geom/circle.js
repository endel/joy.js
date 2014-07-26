/**
 * @module Joy
 */
var DisplayObject = require('../render/display_object.js');

var Circle = DisplayObject.extend({
  /**
   * @class Circle
   * @extends DisplayObject
   * @constructor
   *
   * @param {Object} options
   *   @param {Number} [options.radius]
   *   @param {Color, String} [options.color]
   */
  init: function (options) {
    this._super(options);
    this.radius = options.radius || 1;
    this.color = options.color || "#000";

    Object.defineProperty(this, 'width', {
      get: function () {
        return this.radius * 2 * this.scale.x;
      },
      configurable: true
    });

    Object.defineProperty(this, 'height', {
      get: function () {
        return this.radius * 2 * this.scale.y;
      },
      configurable: true
    });
  },

  render: function () {
    this.ctx.beginPath();
    this.ctx.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
});

module.exports = Circle;
