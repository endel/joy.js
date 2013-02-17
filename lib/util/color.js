/**
 * @module Joy
 */
(function(J) {
  /**
   * @param {String | Number} hexOrRed hexadecimal color (String), or red (Number)
   * @param {Number} green
   * @param {Number} blue
   * @param {Number} alpha
   *
   * @example
   *     // color name
   *     var color = new Joy.Color("red");
   *
   * @example
   *     // hexadecimal
   *     var color = new Joy.Color("#fff");
   *
   * @example
   *     // rgb
   *     var color = new Joy.Color(255, 50, 255);
   *
   * @example
   *     // rgba
   *     var color = new Joy.Color(255, 50, 255, 100);
   *
   * @class Color
   * @constructor
   */
  var Color = function(r, g, b, a) {
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  };

  /**
   * Get color definition as CSS string.
   * @method toString
   * @return {String}
   */
  Color.prototype.toString = function() {
    if (!this.green && !this.blue) {
      return this.red;
    } else if (this.alpha) {
      return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
    } else {
      return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
    }
  };

  J.Color = Color;
})(Joy);
