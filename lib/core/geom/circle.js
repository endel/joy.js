/**
 * TODO: circle geometry
 *
 * module Joy
 */
(function(J) {
  /**
   * @param {Vector2d} position
   * @param {Number} radius
   *
   * class Circle
   * constructor
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
