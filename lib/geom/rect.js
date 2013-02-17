/**
 * @module Joy
 */
(function(J){
  var Rect = J.DisplayObject.extend({
    /**
     * @class Rect
     * @extends DisplayObject
     * @constructor
     *
     * @param {Object} options
     *   @param {Color, String} [options.color]
     */
    init: function(options) {
      this._super(options);

      /**
       * @attribute color
       * @type {String}
       */
      if (options.color) {
        this.colorize(options.color);
      }
    },

    /**
     * @method colorize
     * @param {Color | String} color
     * @return {Rect} this
     */
    colorize: function (color) {
      this.color = color.toString();
      return this;
    },

    render: function() {
      if (this.color) {
        this.ctx.fillStyle = this.color;
      }
      this.ctx.fillRect(0, 0, this._width, this._height);
    }
  });

  J.Rect = Rect;
})(Joy);
