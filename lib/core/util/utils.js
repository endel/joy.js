(function(J) {
  /**
   * Utility class
   * @class Utils
   * @static
   */
  J.Utils = {
    applyFriction: function(v, f) {
      return (v + f < 0) ? v + (f * J.deltaTime) : (v - f > 0) ? v - (f * J.deltaTime) : 0;
    }
  };
})(Joy);
