/**
 * @class Sprite
 * @extends DisplayObject
 */
(function(J) {
  var Sprite = J.DisplayObject.extend({
    init: function(options) {
      // Asset
      this.asset = options.asset || new Image();

      // Real dimensions (without scale)
      options.width = this.asset.width || options.width;
      options.height = this.asset.height || options.height;

      this._super(options);

      /**
       * TODO: Currently it's only drawing a flipped sprite. Other features should respect the fliped position.
       *
       * @property flipX
       * @type {Boolean}
       * @default false
       */
      this._flipX = false;
      this.__defineSetter__('flipX', function(flipX) {
        this.scaleX *= (flipX != this._flipX) ? -1 : 1;
        this._flipX = flipX;
        if (this._flipX) {
          this.pivotX = -this._width;
        } else { }
      });
      this.__defineGetter__('flipX', function() {
        return this._flipX;
      });

      /**
       * TODO: Currently it's only drawing a flipped sprite. Other features should respect the fliped position.
       *
       * @property flipY
       * @type {Boolean}
       * @default false
       */
      this._flipY = false;
      this.__defineSetter__('flipY', function(flipY) {
        this.scaleY *= (flipY != this._flipY) ? -1 : 1;
        this._flipY = flipY;
        if (this._flipY) {
          this.pivotY = -this._height;
        } else { }
      });
      this.__defineGetter__('flipY', function() {
        return this._flipY;
      });

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
      if (!this._width) { this._width = this.asset.width; }
      if (!this._height) { this._height = this.asset.height; }

      // Check for spritesheet
      if (this._width < this.asset.width) {
        this.frames = Math.ceil(this.asset.width / this._width);
      }

      this.flipX = this._flipX;
      this.flipY = this._flipY;
    },

    render: function() {
      this._super();

      this.ctx.drawImage(this.asset, this._width * this.currentFrame, 0, this._width, this._height, 0, 0, this._width, this._height);

      // Draw debugging rectangle around sprite
      if (J.debug) {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(0, 0, this._width, this._height);
      }

    }
  });

  J.Sprite = Sprite;
})(Joy);
