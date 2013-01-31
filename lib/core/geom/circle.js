/**
 * @module Joy
 */
(function(J) {
  /**
   * @param {Joy.Vector2d} position
   * @param {Number} radius
   *
   * @class Circle
   * @constructor
   */
  var Circle = function(position, radius) {
    this.position = position;
    this.radius = radius;
  };

  Circle.prototype.render = function(ctx) {
    // TODO
  };

  J.Circle = Circle;
})(Joy);
