(function(J) {
  var Sprite = function(options) {
    this.ctx = null;
    this.asset = new Image();
    this.x = options.x || 0;
    this.y = options.y || 0;

    if (options.url) {
      this.load(options.url);
    }
  };

  Sprite.prototype.load = function(src, onload) {
    if (onload) {
      this.asset.onload = onload;
    }
    this.asset.src = src;
  };

  Sprite.prototype.render = function() {
    this.ctx.drawImage(this.asset, this.x, this.y, this.asset.width, this.asset.height);
  };

  Sprite.prototype.setContext = function(ctx) {
    this.ctx = ctx;
  };

  J.Sprite = Sprite;
})(Joy);
