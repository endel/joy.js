/**
 * @module Joy
 */
(function(J) {
  /**
   * OBS: Tweens are provided by [tween.js](https://github.com/sole/tween.js).
   *
   * Alias to TWEEN
   *
   * @class TweenManager
   */
  J.TweenManager = TWEEN;

  /**
   * @method getAll
   * @return {Array}
   */
  /**
   * @method removeAll
   */
  /**
   * @param {Tween} tween
   * @method add
   */
  /**
   * @param {Tween} tween
   * @method remove
   */
  /**
   * @param {Number} time
   * @method update
   */

  /**
   * Create a new tween.
   *
   * OBS: Tweens are provided by [tween.js](https://github.com/sole/tween.js).
   *
   * Alias to TWEEN.Tween
   *
   * @class Tween
   * @param {Object} target
   * @param {Number} duration (in milliseconds)
   * @constructor
   */
  J.Tween = function(vars, duration) {
    return new TWEEN.Tween(vars, duration);
  };

  /**
   * @param {Object}
   * @method to
   * @return {Tween} this
   */

  /**
   * @param {Object}
   * @method start
   * @return {Tween} this
   */

  /**
   * @method stop
   * @return {Tween} this
   */

  /**
   * @param {Number} times
   * @method repeat
   * @return {Tween} this
   */

  /**
   * @param {Number} amount
   * @method delay
   * @return {Tween} this
   */

  /**
   * @param {Function} method
   * @method easing
   * @return {Tween} this
   */

  /**
   * @param {Function} method
   * @method interpolation
   * @return {Tween} this
   */

  /**
   * @param {Function} callback
   * @method onUpdate
   * @return {Tween} this
   */

  /**
   * @param {Function} callback
   * @method onComplete
   * @return {Tween} this
   */
})(Joy);
