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
