/**
 * @module Joy
 */
(function(J) {
  var Circle = J.DisplayObject.extend({
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

      this.__defineGetter__('width', function () {
        return this.radius * 2 * this.scale.x;
      });
      this.__defineGetter__('height', function () {
        return this.radius * 2 * this.scale.y;
      });
    },

    render: function () {
      this.ctx.beginPath();
      this.ctx.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  });

  J.Circle = Circle;
})(Joy);
