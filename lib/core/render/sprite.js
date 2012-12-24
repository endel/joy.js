/**
 * @class Sprite
 * @extends DisplayObject
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
      this.width = this.asset.width || options.width;
      this.height = this.asset.height || options.height;

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
      if (!this.width) { this.width = this.asset.width; }
      if (!this.height) { this.height = this.asset.height; }

      // Check for spritesheet
      if (this.width < this.asset.width) {
        this.frames = Math.ceil(this.asset.width / this.width);
      }

      // Update pivot
      this.pivotX = this.width / 2;
      this.pivotY = this.height / 2;
    },

    render: function() {
      if (this.flipX === true || this.flipY === true) {
        // TODO: I'm weird and not working as expected
        this.ctx.translate((this.flipX - 0) * this._width, (this.flipY - 0) * this._height);
        this.ctx.scale((this.flipX === true) ? -1 : 1 , (this.flipY === true) ? -1 : 1);
      }

      this._super();

      this.ctx.drawImage(this.asset, this.width * this.currentFrame, 0, this.width, this.height, 0, 0, this.width, this.height);

      // Draw debugging rectangle around sprite
      if (J.debug) {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(0, 0, this.width, this.height);
      }

    }
  });

  J.Sprite = Sprite;
})(Joy);
