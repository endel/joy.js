(function(J){
  var Rect = J.DisplayObject.extend({
    /**
     * @class Rect
     * @constructor
     * @param {Object} options
     *   @param {Vector2d} position
     *   @param {Number} width
     *   @param {Number} height
     */
    init: function(options) {
      this._super(options);

      /**
       * @property color
       * @type {String}
       */
      if (options.color) {
        this.colorize(options.color);
      }
    },

    /**
     * @method colorize
     * @param {Color, String} color
     * @return {Rect} this
     */
    colorize: function (color) {
      this.color = color.toString();
      return this;
    },

    updateContext: function () {
      this._super();
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
