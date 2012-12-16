/**
 * Base class for rendering.
 * @class Renderable
 */
(function(J) {
  var Renderable = Class.extend({
    init: function() {
      this.ctx = null;

      this.scaleX = 1;
      this.scaleY = 1;

      this._contextOperations = {};
    },

    setContext: function(ctx) {
      this.ctx = ctx;
    },

    /**
     * Register scale context operations
     * @method scale
     * @param {Number} scaleX
     * @param {Number} scaleY
     */
    scale: function(scaleX, scaleY) {
      this.scaleX = scaleX;
      this.scaleY = scaleY;
      this._contextOperations.scale = [this.scaleX, this.scaleY];
    },

    /**
     * Register shadow context operations
     * @method shadow
     * @param {Object} options
     */
    shadow: function(options) {
      this._contextOperations.shadowColor   = options.color || "#000";
      this._contextOperations.shadowOffsetX = options.offsetX || 0;
      this._contextOperations.shadowOffsetY = options.offsetY || 0;
      this._contextOperations.shadowBlur    = options.blur || 1;
    },

    /**
     * Apply all custom context operations.
     * @method render
     */
    render: function() {
      for (var operation in this._contextOperations) {
        if (this._contextOperations[operation] instanceof Array) {
          this.ctx[operation].apply(this.ctx, this._contextOperations[operation]);
        } else {
          this.ctx[operation] = this._contextOperations[operation];
        }
      }
    }
  });

  J.Renderable = Renderable;
})(Joy);
