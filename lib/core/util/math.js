(function(J) {
  /**
   * @method clamp
   * @param {Number} number
   * @param {Number} low
   * @param {Number} high
   */
  Math.clamp = function(number, low, high) {
    return ((number < low) ? low : ((number > high) ? high : +number));
  };
})(Joy);
