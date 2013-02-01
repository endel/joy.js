/**
 * @module Joy
 */
(function(J) {
  /**
   * @class RectCollider
   * @param {Vector2d} position
   * @param {Number} width
   * @param {Number} height
   * @constructor
   */
  var RectCollider = function(position, width, height) {
    this.id = J.generateUniqueId();
    this.position = position;
    this.collidePosition = this.position.clone();
    this.width = width;
    this.height = height;
  };

  RectCollider.prototype.updateColliderPosition = function(position) {
    this.collidePosition.x = position.x + this.position.x;
    this.collidePosition.y = position.y + this.position.y;
  };

  RectCollider.prototype.renderStroke = function(ctx) {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.collidePosition.x, this.collidePosition.y, this.width, this.height);
  };

  /**
   * Is this DisplayObject colliding with {Object}?
   * @param {DisplayObject, Circle, Rectangle}
   * @return {Boolean} is colliding
   */
  RectCollider.prototype.collide = function(collider) {
    return !(
      this.collidePosition.x      >= collider.collidePosition.x + collider.width  ||
      collider.collidePosition.x  >= this.collidePosition.x + this.width          ||
      this.collidePosition.y      >= collider.collidePosition.y + collider.height ||
      collider.collidePosition.y  >= this.collidePosition.y + this.height
    );
  };

  /**
   * @method clone
   * @return {RectCollider}
   */
  RectCollider.prototype.clone = function() {
    return new RectCollider(this.position.clone(), this.width, this.height);
  };

  J.RectCollider = RectCollider;
})(Joy);
