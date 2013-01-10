(function(J){
  /**
   * @class Rect
   * @constructor
   * @param {Vector2d} position
   * @param {Number} width
   * @param {Number} height
   */
  var Rect = function(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
  };

  Rect.prototype.render = function(ctx) {
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  };

  /**
   * @param {DisplayObject, Circle, Rectangle}
   * @return {Boolean} is colliding
   */
  Rect.prototype.collide = function (collider) {
    return !(
      this.position.x      >= collider.position.x + collider.width  ||
      collider.position.x  >= this.position.x + this.width          ||
      this.position.y      >= collider.position.y + collider.height ||
      collider.position.y  >= this.position.y + this.height
    );
  };

  J.Rect = Rect;
})(Joy);
