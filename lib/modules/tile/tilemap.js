(function(J) {
  var Tilemap = J.DisplayObject.extend({
    /**
     * @class TileMap
     * @constructor
     * @param {Object} options
     */
    init: function (options) {
      if (!(options.tileset instanceof J.Tileset)) {
        throw new Error("'tileset' must be given on Tilemap constructor, as Sprite instance.");
      }
      this._super(options);

      /**
       * @property tileset
       * @type {Tileset}
       */
      this.tileset = options.tileset;

      /**
       * @property lines
       * @type {Number}
       */
      this.lines = options.lines || 1;

      /**
       * @property columns
       * @type {Number}
       */
      this.columns = options.columns || 1;

      /**
       * @property data
       * @type {Array}
       */
      this.data = options.data;
    },

    render: function() {
      for (var i=0, length = this.data.length; i < length; ++i) {
        if (this.data[i] === 0) { continue; }

        this.ctx.drawImage(this.tileset.image,
                           this.tileset.tileWidth * ((this.data[i]-1) % this.tileset.columns),
                           this.tileset.tileHeight * (((this.data[i]-1) / this.tileset.columns) >> 0),
                           this.tileset.tileWidth,
                           this.tileset.tileHeight,
                           this.tileset.tileWidth * (i % this.columns),
                           this.tileset.tileHeight * ((i / this.columns) >> 0),
                           this.tileset.tileWidth,
                           this.tileset.tileHeight);
      }
    }
  });

  J.Tilemap = Tilemap;
})(Joy);
