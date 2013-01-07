(function(J){
  /**
   * @class Rect
   * @constructor
   * @param {Number} width
   * @param {Number} height
   */
  var Rect = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  Rect.prototype.render = function(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  /**
   * Is this DisplayObject colliding with {Object}?
   * @param {DisplayObject, Circle, Rectangle}
   * @return {Boolean} is colliding
   */
  Rect.prototype.collide = function (collider) {
    return !(
      this.x      >= collider.x + collider.width  ||
      collider.x  >= this.x + this.width          ||
      this.y      >= collider.y + collider.height ||
      collider.y  >= this.y + this.height
    );
  };

  J.Rect = Rect;
})(Joy);
