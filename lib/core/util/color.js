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
    if (!g && !b) {
      this.value = r;
    } else if (a) {
      this.value = "rgba("+r+","+g+","+b+","+a+")";
    } else {
      this.value = "rgb("+r+","+g+","+b+")";
    }
  };

  /**
   * Get color definition as CSS string.
   * @method toString
   * @return {String}
   */
  Color.prototype.toString = function() {
    return this.value;
  };

  J.Color = Color;
})(Joy);
