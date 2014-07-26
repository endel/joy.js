/**
 * @module Joy
 */
/**
 * @class Vector2d
 * @constructor
 * @param {Number} x
 * @param {Number} y
 */
var Vector2d = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;

  /**
   * Get the magnitude of this vector
   * @attribute length
   * @readonly
   */
  Object.defineProperty(this, 'length', {
    get: function () {
      return Math.sqrt((this.x * this.x) + (this.y * this.y));
    },
    configurable: true
  });

  /**
   * Get this vector with a magnitude of 1.
   * @attribute normalized
   * @readonly
   */
  Object.defineProperty(this, 'normalized', {
    get: function () {
      var magnitude = this.length;
      return new Vector2d(this.x / magnitude, this.y / magnitude);
    },
    configurable: true
  });
};

/**
 * @method set
 * @param {Number} x
 * @param {Number} y
 * @return {Vector2d}
 */
Vector2d.prototype.set = function (x, y) {
  this.x = x;
  this.y = y;
  return this;
};

/**
 * @method sum
 * @param {Vector2d} vector2d
 * @return {Vector2d}
 */
Vector2d.prototype.subtract = function (vector2d) {
  this.x -= vector2d.x;
  this.y -= vector2d.y;
  return this;
};

/**
 * @method sum
 * @param {Vector2d} vector2d
 * @return {Vector2d}
 */
Vector2d.prototype.sum = function (vector2d) {
  this.x += vector2d.x;
  this.y += vector2d.y;
  return this;
};

/**
 * @method scale
 * @param {Number} x (or x y)
 * @param {Number} y
 * @return {Vector2d}
 */
Vector2d.prototype.scale = function (x, y) {
  this.x *= x;
  this.y *= y || x;
  return this;
};

/**
 * @method clone
 * @return {Vector2d}
 */
Vector2d.prototype.clone = function() {
  return new Vector2d(this.x, this.y);
};

/**
 * Return unit vector
 * @return {Vector2d}
 */
Vector2d.prototype.unit = function() {
  return new Vector2d( Math.cos(this.x), Math.sin(this.y) );
};

/**
 * Normalize this vector
 * @return {Vector2d}
 */
Vector2d.prototype.normalize = function() {
  var normal = this.normalized;
  this.x = normal.x;
  this.y = normal.y;
  return this;
};

/**
 * Get the distance between this vector and the argument vector
 * @param {Vector2d} vector
 * @return {Number}
 */
Vector2d.distance = function(v1, v2) {
  var xdiff = v1.x - v2.x,
      ydiff = v1.y - v2.y;
  return Math.sqrt(xdiff * xdiff + ydiff * ydiff);
};

/**
 * @method toString
 * @return {String}
 */
Vector2d.prototype.toString = function () {
  return "#<Vector2d @x=" + this.x + ", @y=" + this.y + ">";
};

Vector2d.LEFT = new Vector2d(-1, 0);
Vector2d.RIGHT = new Vector2d(1, 0);
Vector2d.TOP = new Vector2d(0, -1);
Vector2d.BOTTOM = new Vector2d(0, 1);

module.exports = Vector2d;
