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
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(0, 0, this._width, this._height);
    }
  });

  J.Rect = Rect;
})(Joy);
