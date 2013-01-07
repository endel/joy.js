(function(J) {
  /**
   * @class Sprite
   * @extends DisplayObjectContainer
   * @constructor
   *
   * @param {String, Object} data src (String) or
   *  @param {Number} width
   *  @param {Number} height
   */
  var Sprite = J.DisplayObjectContainer.extend({
    init: function(options) {
      if (typeof(options)==="string") {
        options = { src: options };
      }

      // Asset
      this.image = options.image || new Image();

      // Real dimensions (without scale)
      options.width = this.image.width || options.width;
      options.height = this.image.height || options.height;

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

      // Bind on load trigger.
      this.bind('load', this.onLoad);
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

      // Expose trigger
      this.image.onload = function() {
        self.trigger('load');
      };

      this.image.src = src;
    },

    onLoad: function() {
      if (!this._width) { this._width = this.image.width; }
      if (!this._height) { this._height = this.image.height; }

      this.flipX = this._flipX;
      this.flipY = this._flipY;
    },

    render: function() {
      this._super();

      this.ctx.drawImage(this.image, 0, 0, this._width, this._height);

      // Draw debugging rectangle around sprite
      if (J.debug) {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(0, 0, this._width, this._height);
      }

    }
  });

  J.Sprite = Sprite;
})(Joy);
