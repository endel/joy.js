(function(J) {
  /**
   * @class Polygon
   * @constructor
   * @param {Array} Array of Vector2d's.
   */
  var Polygon = function(points) {
    this.points = [];

    if (points) {
      for (var i=0, length=points.length; i < length; ++i) {
        this.addPoint(points[i]);
      }
    }
  };

  Polygon.prototype.addPoint = function(point) {
    this.points.push(point);
  };

  Polygon.prototype.render = function(ctx) {
    // TODO
  };

  J.Polygon = Polygon;
})(Joy);
