(function(J){
  /**
   * @class Rect
   * @constructor
   * @param {Number} width
   * @param {Number} height
   */
  var Rect = function(width, height) {
    this.width = width || 0;
    this.height = height || 0;
  };

  Rect.prototype.render = function(ctx) {
    ctx.fillRect(0, 0, this.width, this.height);
  };

  J.Rect = Rect;
})(Joy);
