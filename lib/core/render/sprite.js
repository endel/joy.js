/**
 * @class Sprite
 */
(function(J) {
  var Sprite = J.Renderable.extend({
    init: function(options) {
      this.asset = options.asset || new Image();
      this.x = options.x || 0;
      this.y = options.y || 0;

      if (options.url) {
        this.load(options.url);
      }

      this._super();
    },

    load: function(src, onload) {
      if (onload) {
        this.asset.onload = onload;
      }
      this.asset.src = src;
    },

    render: function() {
      this.ctx.drawImage(this.asset, this.x, this.y, this.asset.width, this.asset.height);
    }
  });

  J.Sprite = Sprite;
})(Joy);
