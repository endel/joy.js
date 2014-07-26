/**
 * @module Joy
 */
var DisplayObjectContainer = require('./display_object_container.js');

var Tilemap = DisplayObjectContainer.extend({
  /**
   * @class Tilemap
   * @constructor
   * @param {Object} options
   */
  init: function (options) {
    if (!(options.tileset instanceof Joy.Tileset)) {
      throw new Error("'tileset' must be given on Tilemap constructor, as Sprite instance.");
    }
    this._super(options);

    /**
     * @attribute tileset
     * @type {Tileset}
     */
    this.tileset = options.tileset;

    /**
     * @attribute lines
     * @type {Number}
     */
    this.lines = options.lines || 1;

    /**
     * @attribute columns
     * @type {Number}
     */
    this.columns = options.columns || 1;

    /**
     * @attribute data
     * @type {Array}
     */
    Object.defineProperty(this, 'data', {
      get: function () {
        return this._data;
      },
      set: function (data) {
        this._data = data;

        if (this.collider == this || this.collider instanceof Joy.TilemapCollider) {
          this.collider = new Joy.TilemapCollider(this);
        }
      },
      configurable: true
    });
    this.data = options.data;

    /**
     * @attribute height
     * @readonly
     * @type {Number}
     */
    Object.defineProperty(this, 'height', {
      get: function () {
        return this.lines * this.tileset.tileHeight;
      },
      configurable: true
    });

    /**
     * @attribute width
     * @readonly
     * @type {Number}
     */
    Object.defineProperty(this, 'width', {
      get: function () {
        return this.columns * this.tileset.tileWidth;
      },
      configurable: true
    });

    // Propagate ADDED event to tileset.
    this.bind(Joy.Events.ADDED, function () {
      this.tileset.trigger(Joy.Events.ADDED);
    });
  },

  renderChildren: function () {
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

module.exports = Tilemap;
