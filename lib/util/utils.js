/**
* @module Joy
*/

/**
 * @class Utils
 * @static
 */
var Utils = {

  /**
   * @method applyFriction
   * @param {Number} v velocity
   * @param {Number} f friction
   * @return {Number}
   */
  applyFriction: function(v, f) {
    return (v + f < 0) ? v + (f * Joy.deltaTime) : (v - f > 0) ? v - (f * Joy.deltaTime) : 0;
  },

  /**
   * @method generateUniqueId
   * @return {String}
   */
  generateUniqueId: function () {
    return "joy" + (new Date().getTime());
  }

};

module.exports = Utils;
