(function(J) {
  /**
   * @class Polygon
   * @constructor
   * @param {Array} Array of Point's.
   */
  var Polygon = function(points) {
    this.points = [];

    if (points) {
      for (var i=0, length=points.length; i < length; ++i) {
        this.addPoint(points[i][0], points[i][1]);
      }
    }
  };

  Polygon.prototype.addPoint = function (x, y) {
    this.points.push([x, y]);
  };

  Polygon.prototype.render = function(ctx) {
    // TODO
  };

  J.Polygon = Polygon;
})(Joy);
