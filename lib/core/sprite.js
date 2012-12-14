(function(J) {
  var Sprite = function(options) {
    this.asset = new Image();
    this.x = options.x || 0;
    this.y = options.y || 0;

    if (options.url) {
      this.load(options.url);
    }
  };

  Sprite.prototype.load = function(url, onload) {
    if (onload) {
      this.asset.onload = onload;
    }
    this.asset.src = url;
  };

  J.Sprite = Sprite;
})(Joy);
