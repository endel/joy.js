(function(J){
  var Rect = function (x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  Rect.prototype.collide = function(collider) {
    // collision detection
  };

  J.Rect = Rect;
})(Joy);
