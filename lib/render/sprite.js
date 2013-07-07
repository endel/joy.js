/**
 * @module Joy
 */
(function(J) {
  /**
   * @class Sprite
   * @extends DisplayObjectContainer
   * @constructor
   *
   * @param {String | Object} data src (String) or
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

      // When is added into a container
      this.bind(J.Events.ADDED, function () {
        if (options.src) {
          this.load(options.src);
        }
      });
    },

    /**
     * @method load
     * @param {String} src image source
     */
    load: function(src) {
      var self = this;

      // Append sprite to scene loader
      // TODO: sprite loaders should be in layer outside the Scenes.
      if (this.scene && this.scene.loader && !this.scene.loader.completed) {
        this.scene.loader.add(this.image);
      }

      // Expose trigger
      this.image.addEventListener('load', function() {
        self.onLoad();
        self.trigger('load');
      });

      this.image.src = src;
    },

    onLoad: function() {
      if (!this._width) { this._width = this.image.width; }
      if (!this._height) { this._height = this.image.height; }
    },

    render: function() {
      if (!this.visible) { return; }
      this.ctx.drawImage(this.image, 0, 0, this._width, this._height);
      this.renderChildren();
    },

    /*
     * TODO: refactor me
     */
    clone: function () {
      var clone = new J.Sprite(this);
      this.position = this.position.clone();
      this.scale = this.scale.clone();
      this.pivot = this.pivot.clone();
      this.skew = this.skew.clone();
      return clone;
    }
  });

  J.Sprite = Sprite;
})(Joy);
