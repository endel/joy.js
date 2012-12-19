/**
 * @class Sprite
 */
(function(J) {
  var Sprite = J.DisplayObject.extend({
    init: function(options) {
      this._super();

      // Asset
      this.asset = options.asset || new Image();

      // Position / Dimensions
      this.x = this._x = options.x || 0;
      this.y = this._y = options.y || 0;

      // Real dimensions (without scale)
      this._width = this.asset.width || options.width;
      this._height = this.asset.height || options.height;

      // Public dimensions (with scale)
      this.width = this._width;
      this.height = this._height;

      // flip
      this.flipX = false;
      this.flipY = false;

      // Frames
      this.frames = 1;
      this.currentFrame = 0;

      if (options.src) {
        this.load(options.src);
      }

      // Use 1x1 scale by default.
      this.scale(1, 1);
    },

    /**
     * Set sprite scale
     * @method scale
     * @param {Number} scaleX
     * @param {Number} scaleY
     */
    scale: function (scaleX, scaleY) {
      this._super(scaleX, scaleY);
      this.width = this._width * this.scaleX;
      this.height = this._height * this.scaleY;
    },

    /**
     * @method load
     * @param {String} src image source
     */
    load: function(src) {
      var self = this;

      if (onload) {
        this.asset.onload = function() { self.onLoad(); };
      }
      this.asset.src = src;
    },

    onLoad: function() {
      if (!this._width) {
        this._width = this.asset.width;
      }
      if (!this._height) {
        this._height = this.asset.height;
      }

      // We may have discovered sprite size for the first time here.
      // Re-calculate it's width based on scale.
      this.scale(this.scaleX, this.scaleY);

      // Check frames
      if (this._width < this.asset.width) {
        this.frames = Math.ceil(this.asset.width / this._width);
      }
    },

    render: function() {

      if (this.flipX === true || this.flipY === true) {
        // TODO: I'm weird and not working as expected
        this.ctx.translate((this.flipX - 0) * this._width, (this.flipY - 0) * this._height);
        this.ctx.scale((this.flipX === true) ? -1 : 1 , (this.flipY === true) ? -1 : 1);
      }

      // Normalize coordinates according to current scale.
      this._x = (this.x * this.ctx.canvas.width / (this.scaleX * this.ctx.canvas.width));
      this._y = (this.y * this.ctx.canvas.height / (this.scaleY * this.ctx.canvas.height));

      this._super();

      // Don't use scale-corrected dimensions on draw.
      this.ctx.drawImage(this.asset, this._width * this.currentFrame, 0, this._width, this._height, this._x, this._y, this._width, this._height);

      // Draw debugging rectangle around sprite
      if (J.debug) {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this._x, this._y, this._width, this._height);
      }

    }
  });

  J.Sprite = Sprite;
})(Joy);
