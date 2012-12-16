(function(J) {
  var DEFAULT_COLOR = "#000000";

  var Shadow = J.Renderable.extend({
    init: function(options) {
      this.color = options.color || DEFAULT_COLOR;
      this.offsetX = options.offsetX || 0;
      this.offsetY = options.offsetY || 0;
      this.blur = options.blur || 0;
      this._super();
    },

    preRender: function() {
      this.ctx.save();
      this.ctx.shadowColor = this.color;
      this.ctx.shadowBlur = this.blur;
      this.ctx.shadowOffsetX = this.offsetX;
      this.ctx.shadowOffsetY = this.offsetY;
    },

    postRender: function() {
      this.ctx.restore();
    }
  });

  Joy.Render.Shadow = Shadow;
})(Joy);

