(function(J) {
  /**
   * @class RectCollider
   * @param {Vector2d} position
   * @param {Number} width
   * @param {Number} height
   * @constructor
   */
  var RectCollider = function(position, width, height) {
    this.position = position;
    this.collidePosition = this.position.clone();
    this.width = width;
    this.height = height;
  };

  RectCollider.prototype.updateColliderPosition = function(position) {
    this.collidePosition.x = position.x + this.position.x;
    this.collidePosition.y = position.y + this.position.y;
  };

  RectCollider.prototype.renderStroke = function(ctx, s) {
    if (s!==undefined) {
      ctx.strokeStyle = "blue";
    }
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    ctx.strokeStyle = "black";
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
