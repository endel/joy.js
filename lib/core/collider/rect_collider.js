(function(J) {
  var RectCollider = function(position, width, height) {
    this.position = position;
    this.collidePosition = this.position.clone();
    this.width = width;
    this.height = height;
  };

  RectCollider.prototype.updateColliderPosition = function(target) {
    this.collidePosition.x = target.position.x + this.position.x;
    this.collidePosition.y = target.position.y + this.position.y;
  };

  RectCollider.prototype.renderStroke = function(ctx) {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  };

  J.RectCollider = RectCollider;
})(Joy);
