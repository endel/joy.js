(function(J) {
  /**
   * @class Math
   */

  /**
   * @method clamp
   * @param {Number} number
   * @param {Number} low
   * @param {Number} high
   * @static
   *
   * @example
   *     Math.clamp(5, 10, 20); // returns 10
   */
  Math.clamp = function(number, low, high) {
    return ((number < low) ? low : ((number > high) ? high : +number));
  };
})(Joy);
