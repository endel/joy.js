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

      // Bind on load trigger.
      this.bind('load', this.onLoad);
      if (options.src) {
        this.load(options.src);
      }
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
    },

    render: function() {
      if (!this.visible) { return; }
      this.ctx.save();
      this.ctx.drawImage(this.image, 0, 0, this._width, this._height);
      this.renderChildren();
      this.ctx.restore();
    }
  });

  J.Sprite = Sprite;
})(Joy);
