/**
 * @module Joy
 */
/**
 * @class Range
 * @constructor
 * @param {Number} min
 * @param {Number} max
 */
var Range = function(_min, _max) {
  var min = _min,
      max = _max;

  if (typeof(min)==="object") {
    min = _min.min || 0;
    max = _min.max || 0;
  }

  this.min = parseFloat(min || 0, 10);
  this.max = parseFloat(max || this.min || 0, 10);
};

/**
 * Get a random value between this range.
 * @method random
 * @return {Number}
 */
Range.prototype.random = function () {
  return Range.random(this.min, this.max);
};

/**
 * Get a random integer value between this range
 * @method randomInt
 * @return {Number}
 */
Range.prototype.randomInt = function () {
  return Range.randomInt(this.min, this.max);
};

/**
 * Parse range object or string
 *
 * @example by given string
 *      var range = new Joy.Range("1..10");
 *
 * @example by given object
 *      var range = new Joy.Range({min: 1, max: 10});
 *
 * @example by single number
 *      var range = new Joy.Range(5);
 *
 * @param {String | Object | Number} range
 * @return {Range}
 */
Range.parse = function (obj) {
  if (typeof(obj)==="string") {
    var data = obj.split("..");
    return new Range(data[0], data[1]);
  } else {
    return new Range(obj);
  }
};

/**
 * Get a random floating value between min and max
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @static
 */
Range.random = function (min, max) {
  return ((Math.random() * (max - min + 1)) + min);
};

/**
 * Get a random integer value between min and max
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @static
 */
Range.randomInt = function (min, max) {
  return (Math.floor((Math.random() * (max - min + 1)) + min));
};

module.exports = Range;
