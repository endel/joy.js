(function(J) {
  /*
   * Constants
   */
  var BASELINE = {
    TOP : 'top',
    HANGING : 'hanging',
    MIDDLE : 'middle',
    ALPHABETIC : 'alphabetic',
    IDEOGRAPHIC : 'ideographic',
    BOTTOM : 'bottom'
  };

  /*
   * Default values
   */
  var
    DEFAULT_FONT = "normal 12px Verdana",
    DEFAULT_COLOR = "#000000",
    DEFAULT_ALIGN = "left",
    DEFAULT_BASELINE = BASELINE.TOP;

  var Text = function(options) {
    if (typeof(options)==="undefined") {
      options = {};
    }
    this.ctx = null;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.text = options.text || "";
    this.font = options.font || DEFAULT_FONT;
    this.color = options.color || DEFAULT_COLOR;
    this.align = options.align || DEFAULT_ALIGN;
    this.baseLine = options.baseLine || DEFAULT_BASELINE;
    return this;
  };

  Text.prototype.render = function() {
    this.ctx.font = this.font;
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = this.align;
    this.ctx.textBaseLine = this.baseLine;
    this.ctx.fillText(this.text, this.x, this.y);
  };

  Text.prototype.setContext = function(ctx) {
    this.ctx = ctx;
  };

  /**
   * getMeasure
   * @return {TextMetrics}
   */
  Text.prototype.getMeasure = function() {
    this.ctx.measureText(this.text);
  }

  Text.BASELINE = BASELINE;

  J.Text = Text;
})(Joy);

