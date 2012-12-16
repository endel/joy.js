/**
 * @class Sprite
 */
(function(J) {
  var Sprite = J.Renderable.extend({
    init: function(options) {
      // Asset
      this.asset = options.asset || new Image();

      // Position / Dimensions
      this.x = options.x || 0;
      this.y = options.y || 0;
      this.width = options.width;
      this.height = options.height;

      // flip
      this.flipX = false;
      this.flipY = false;

      // Frames
      this.frames = 1;
      this.currentFrame = 0;

      if (options.src) {
        this.load(options.src);
      }

      this._super();
    },

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

      // Check frames
      if (this.width < this.asset.width) {
        this.frames = Math.ceil(this.asset.width / this.width);
      }
      console.log("Number of frames: " + this.frames);
    },

    render: function() {
      this.ctx.save();

      if (this.flipX === true || this.flipY === true) {
        // TODO: I'm weird and not working as expected
        this.ctx.translate((this.flipX - 0) * this.width, (this.flipY - 0) * this.height);
        this.ctx.scale((this.flipX === true) ? -1 : 1 , (this.flipY === true) ? -1 : 1);
      }

      this.ctx.drawImage(this.asset, this.width * this.currentFrame, 0, this.width, this.height, this.x, this.y, this.width, this.height);

      // Draw debugging rectangle around sprite
      if (J.debug) {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
      }

      this.ctx.restore();
    }
  });

  J.Sprite = Sprite;
})(Joy);
