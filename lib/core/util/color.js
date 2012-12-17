/**
 * Color utility class
 * @class Color
 */
(function(J) {
  /**
   * Create a color.
   * @param {String, Number} HEX_or_RED hexadecimal color (String), or red (Number)
   * @param {Number} green
   * @param {Number} blue
   * @param {Number} alpha
   *
   * @example Color name
   *  var color = new Joy.Color("red");
   *
   * @example Hexadecimal
   *  var color = new Joy.Color("#fff");
   *
   * @example RGB
   *  var color = new Joy.Color(255, 50, 255);
   *
   * @example RGBA
   *  var color = new Joy.Color(255, 50, 255, 100);
   *
   * @constructor
   */
  var Color = function(r, g, b, a) {
    if (!g && !b) {
      this.color = r;
    } else if (a) {
      this.color = "rgba("+r+","+g+","+b+","+a+")";
    } else {
      this.color = "rgb("+r+","+g+","+b+")";
    }
  };

  Color.prototype.toString = function() {
    return this.color;
  };

  J.Color = Color;
})(Joy);
