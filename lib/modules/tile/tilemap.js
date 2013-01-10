(function(J) {
  var Tilemap = J.DisplayObjectContainer.extend({
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
      this.__defineSetter__('data', function(data) {
        this._data = data;

        if (this.collider == this || this.collider instanceof J.TilemapCollider) {
          this.collider = new J.TilemapCollider(this);
        }
      });
      this.__defineGetter__('data', function() {
        return this._data;
      });
      this.data = options.data;

      /**
       * @property height
       * @readonly
       * @type {Number}
       */
      this.__defineGetter__('height', function () {
        return this.lines * this.tileset.tileHeight;
      });

      /**
       * @property width
       * @readonly
       * @type {Number}
       */
      this.__defineGetter__('width', function () {
        return this.columns * this.tileset.tileWidth;
      });
    },

    render: function() {
      this.checkCollisions();
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

      // Debug collision boxes
      this.collider.render(this.ctx);
    }
  });

  J.Tilemap = Tilemap;
})(Joy);
