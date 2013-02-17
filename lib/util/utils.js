/**
 * @module Joy
 */
(function(J) {
  /**
   * @class Utils
   * @static
   */
  J.Utils = {

    /**
     * @method applyFriction
     * @param {Number} v velocity
     * @param {Number} f friction
     * @return {Number}
     */
    applyFriction: function(v, f) {
      return (v + f < 0) ? v + (f * J.deltaTime) : (v - f > 0) ? v - (f * J.deltaTime) : 0;
    }
  };
})(Joy);
