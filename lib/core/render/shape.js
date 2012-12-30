(function(J) {
  /**
   * @class Shape
   * @constructor
   */
  var Shape = J.DisplayObject.extend({
    init: function (options) {
      if (!options) {
        options = {};
      }

      /**
       * Geometry
       * @property geom
       * @type {Rect, Polygon, Circle}
       */
      this.__defineSetter__('geom', function(geom) {
        this._geom = geom;
      });
      this.__defineGetter__('geom', function() { return this._geom; });

      if (options.geom) {
        this.geom = options.geom;
      }

      this._super(options);

      // Override DisplayObject width getter
      this.__defineGetter__('width', function() {
        return this._geom.width;
      });
      // Override DisplayObject height getter
      this.__defineGetter__('height', function() {
        return this._geom.height;
      });

    },

    render: function() {
      this._super();
      this._geom.render(this.ctx);
    }
  });


  J.Shape = Shape;
})(Joy);
