/**
 * @module Joy
 */
(function(J) {
 /**
  * Based on [EaselJS](https://github.com/CreateJS/EaselJS/) Matrix2D implementation.
  *
  * @class Matrix2D
  * @constructor
  *
  * @param {Number} m11
  * @param {Number} m12
  * @param {Number} m21
  * @param {Number} m22
  * @param {Number} dx
  * @param {Number} dy
  */
  var Matrix2D = function(m11, m12, m21, m22, dx, dy) {
    if (m11 !== null) {
      this.m11 = m11;
    }
    this.m12 = m12 || 0;
    this.m21 = m21 || 0;
    if (m22 !== null) {
      this.m22 = m22;
    }
    this.dx = dx || 0;
    this.dy = dy || 0;
    return this;
  };

  /**
   * Generates matrix properties from the specified display object transform properties, and appends them with this matrix.
   * For example, you can use this to generate m11 matrix from m11 display object: var mtx = new Matrix2D();
   * mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
   * @method appendTransform
   * @param {Number} x
   * @param {Number} y
   * @param {Number} scaleX
   * @param {Number} scaleY
   * @param {Number} rotation
   * @param {Number} skewX
   * @param {Number} skewY
   * @param {Number} pivotX Optional.
   * @param {Number} pivotY Optional.
   * @return {Matrix2D} This matrix. Useful for chaining method calls.
   **/
  Matrix2D.prototype.appendTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, pivotX, pivotY) {
    var cos, sin, r;
    if (rotation % 360) {
      r = rotation * Matrix2D.DEG_TO_RAD;
      cos = Math.cos(r);
      sin = Math.sin(r);
    } else {
      cos = 1;
      sin = 0;
    }

    if (skewX || skewY) {
      // TODO: can this be combined into m11 single append?
      skewX *= Matrix2D.DEG_TO_RAD;
      skewY *= Matrix2D.DEG_TO_RAD;

      this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
      this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
    } else {
      this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
    }

    if (pivotX || pivotY) {
      // prepend the registration offset:
      this.dx -= pivotX * this.m11+pivotY * this.m21;
      this.dy -= pivotX * this.m12+pivotY * this.m22;
    }
    return this;
  };


  /**
   * Appends the specified matrix properties with this matrix. All parameters are required.
   * @method append
   * @param {Number} m11
   * @param {Number} m12
   * @param {Number} m21
   * @param {Number} m22
   * @param {Number} dx
   * @param {Number} dy
   * @return {Matrix2D} This matrix. Useful for chaining method calls.
   **/
  Matrix2D.prototype.append = function(m11, m12, m21, m22, dx, dy) {
    var a1 = this.m11;
    var b1 = this.m12;
    var c1 = this.m21;
    var d1 = this.m22;

    this.m11  = m11*a1+m12*c1;
    this.m12  = m11*b1+m12*d1;
    this.m21  = m21*a1+m22*c1;
    this.m22  = m21*b1+m22*d1;
    this.dx = dx*a1+dy*c1+this.dx;
    this.dy = dx*b1+dy*d1+this.dy;
    return this;
  };

  /**
   * Inverts the matrix, causing it to perform the opposite transformation.
   * @method invert
   * @return {Matrix2D} this
   **/
  Matrix2D.prototype.invert = function() {
    var a1 = this.m11;
    var b1 = this.m12;
    var c1 = this.m21;
    var d1 = this.m22;
    var tx1 = this.dx;
    var n = a1*d1-b1*c1;

    this.m11 = d1/n;
    this.m12 = -b1/n;
    this.m21 = -c1/n;
    this.m22 = a1/n;
    this.dx = (c1*this.dy-d1*tx1)/n;
    this.dy = -(a1*this.dy-b1*tx1)/n;
    return this;
  };

  /**
   * Clone Matrix2D instance
   * @return {Matrix2D}
   */
  Matrix2D.prototype.clone = function() {
    return new Matrix2D(this.m11, this.m12, this.m21, this.m22, this.dx, this.dy);
  };

  /**
   * Reset matrix to it's identity
   * @return {Matrix2D} this
   */
  Matrix2D.prototype.identity = function() {
    this.m11 = this.m22 = 1;
    this.m12 = this.m21 = this.dx = this.dy = 0;
    return this;
  };

  /**
   * Multiplier for converting degrees to radians. Used internally by Matrix2D.
   *
   * @attribute DEG_TO_RAD
   * @static
   * @readonly
   * @return {Number}
   **/
  Matrix2D.DEG_TO_RAD = Math.PI / 180;
  Matrix2D.identity = new Matrix2D(1, 0, 0, 1, 0, 0);

  J.Matrix2D = Matrix2D;
})(Joy);
