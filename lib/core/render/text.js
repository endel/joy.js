/**
 * @class Text
 * @extends DisplayObject
 */
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
    DEFAULT_FONT = "Normal 12px Verdana",
    DEFAULT_COLOR = "#000000",
    DEFAULT_ALIGN = "left",
    DEFAULT_BASELINE = BASELINE.TOP;

  var Text = J.DisplayObject.extend({
    /**
     * Create Text instance
     * @param {Object} options any attribute may be initialized by option
     * @constructor
     */
    init: function(options) {
      if (typeof(options)==="undefined") {
        options = {};
      }

      this._super(options);

      /**
       * Text to be displayed
       * @property text
       * @default ""
       * @type {String}
       */
      this.text = options.text || "";

      /**
       * Font family and size
       * @property font
       * @default "Normal 12px Verdana"
       * @type {String}
       */
      this.font = options.font || DEFAULT_FONT;

      /**
       * Text horizontal alignment
       * @property align
       * @default "left"
       * @type {String}
       */
      this.align = options.align || DEFAULT_ALIGN;

      /**
       * Text vertical baseline
       * @property baseline
       * @default Joy.Text.BASELINE.TOP
       * @type {String}
       */
      this.baseline = options.baseline || DEFAULT_BASELINE;

      /**
       * Color of the text
       * @property color
       * @default "#000000"
       * @type {String, Joy.Color}
       */
      this._color = options.color || DEFAULT_COLOR;
      this.__defineGetter__('color', function() {
        return this._color;
      });
      this.__defineSetter__('color', function(color) {
        this._color = color.toString();
      });

      if (options.stroke) {
        this.useStroke();
      } else {
        this.useFill();
      }

    },

    /**
     * @method useStroke
     */
    useStroke: function() {
      this.stroke = true;
      this.fillMethod = "strokeText";
      this.styleMethod = "strokeStyle";
    },

    /**
     * @method useFill
     */
    useFill: function() {
      this.stroke = false;
      this.fillMethod = "fillText";
      this.styleMethod = "fillStyle";
    },

    updateContext: function() {
      this._super();

      this.ctx.font = this.font;
      this.ctx.textAlign = this.align;
      this.ctx.textBaseline = this.baseline;

      this.ctx[this.styleMethod] = this.color;
      this.ctx[this.fillMethod](this.text, 0, 0);
    },

    /**
     * @method getMeasure
     * @return {TextMetrics} text metrics
     */
    getMeasure: function() {
      this.ctx.measureText(this.text);
    }

  });

  Text.BASELINE = BASELINE;
  J.Text = Text;
})(Joy);

