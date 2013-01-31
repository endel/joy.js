/**
 * @module Joy
 */
(function(J) {
  var Tileset = J.Sprite.extend({
    /**
     * @class Tileset
     * @constructor
     * @param {Object} options
     *   @param {String} [options.src]
     *   @param {Number} [options.width] tile width
     *   @param {Number} [options.height] tile height
     */
    init: function(options) {
      this.tileWidth = options.width;
      this.tileHeight = options.height;

      delete options.width;
      delete options.height;

      this._super(options);
    },

    onLoad: function() {
      this._super();

      this.columns = (this._width / this.tileWidth) >> 0;
      this.lines = (this._height / this.tileHeight) >> 0;
    }
  });

  J.Tileset = Tileset;
})(Joy);
