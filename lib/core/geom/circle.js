(function(J) {
  /**
   * Initialize a Circle
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   *
   * @class Circle
   * @constructor
   */
  var Circle = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  };

  Circle.prototype.render = function(ctx) {
    // TODO
  };

  J.Circle = Circle;
})(Joy);
