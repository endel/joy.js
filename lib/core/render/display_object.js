/**
 * Base class for rendering.
 * @class DisplayObject
 */
(function(J) {
  var DisplayObject = Class.extend({
    init: function() {
      this.ctx = null;
      this.index = null;
      this._parent = null;

      this.alpha = 1;
      this.scaleX = 1;
      this.scaleY = 1;
      this._visible = true;

      /**
       * Parent DisplayObject
       * @property parent
       * @readonly
       * @type {DisplayObject, DisplayObjectContainer}
       */
      this.__defineGetter__('parent', function() {
        return this._parent;
      });

      this.__defineSetter__('visible', function(visible) {
        this._visible = visible;
      });

      this.__defineGetter__('visible', function() {
        return this._visible && this.alpha > 0 && this.scaleX !== 0 && this.scaleY !== 0;
      });

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
      return this;
    },

    /**
     * @method translate
     * @param {Number} x
     * @param {Number} y
     */
    translate: function(x, y) {
      this._contextOperations.translate = [x, y];
      return this;
    },

    fillStyle: function(color) {
      this._contextOperations.fillStyle = color.toString();
    },

    fillRect: function(x, y, width, height) {
      this._contextOperations.fillRect = [x, y, width, height];
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

  J.DisplayObject = DisplayObject;
})(Joy);
