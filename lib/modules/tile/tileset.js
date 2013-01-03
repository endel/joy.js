(function(J) {
  var Tileset = J.Sprite.extend({
    /**
     * @class Tileset
     * @constructor
     * @param {Object} options
     *   @param {String} src
     *   @param {Number} width tile width
     *   @param {Number} height tile height
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

      console.log("Columns", this.columns)
      console.log("Lines", this.lines)
    }
  });

  J.Tileset = Tileset;
})(Joy);
