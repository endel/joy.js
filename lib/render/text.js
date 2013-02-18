/**
 * @module Joy
 */
(function(J) {
  /**
   * @property BASELINE
   * @static
   */
  var BASELINE = {
    /**
     * @property BASELINE.TOP
     * @type {String}
     * @static
     */
    TOP : 'top',

    /**
     * @property BASELINE.HANGING
     * @type {String}
     * @static
     */
    HANGING : 'hanging',

    /**
     * @property BASELINE.MIDDLE
     * @type {String}
     * @static
     */
    MIDDLE : 'middle',

    /**
     * @property BASELINE.ALPHABETIC
     * @type {String}
     * @static
     */
    ALPHABETIC : 'alphabetic',

    /**
     * @property BASELINE.IDEOGRAPHIC
     * @type {String}
     * @static
     */
    IDEOGRAPHIC : 'ideographic',

    /**
     * @property BASELINE.BOTTOM
     * @type {String}
     * @static
     */
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
     * @class Text
     * @extends DisplayObject
     *
     * @param {Object} options any attribute may be initialized by option
     *   @param {String} [options.text] default - ""
     *   @param {String} [options.font] default - "Normal 12px Verdana"
     *   @param {String} [options.align] default - "left"
     *   @param {String} [options.baseline] default - Joy.Text.BASELINE.TOP
     *   @param {String} [options.color] default - #000000
     *
     * @constructor
     */
    init: function(options) {
      if (typeof(options)==="undefined") {
        options = {};
      }

      this._super(options);

      /**
       * Text to be displayed
       * @attribute text
       * @default ""
       * @type {String}
       */
      this.text = options.text || "";

      /**
       * Font family and size
       * @attribute font
       * @default "Normal 12px Verdana"
       * @type {String}
       */
      this.font = options.font || DEFAULT_FONT;

      /**
       * Text horizontal alignment
       * @attribute align
       * @default "left"
       * @type {String}
       */
      this.align = options.align || DEFAULT_ALIGN;

      /**
       * Text vertical baseline
       * @attribute baseline
       * @default Joy.Text.BASELINE.TOP
       * @type {String}
       */
      this.baseline = options.baseline || DEFAULT_BASELINE;

      /**
       * Color of the text
       * @attribute color
       * @default "#000000"
       * @type {String, Color}
       */
      this._color = options.color || DEFAULT_COLOR;
      Object.defineProperty(this, 'color', {
        get: function () {
          return this._color;
        },
        set: function (color) {
          this._color = color.toString();
        },
        configurable: true
      });

      // this.__defineGetter__('width', function () {
      //   return this.getMeasure().width;
      // })

      // this.__defineGetter__('height', function () {
      //   return parseInt(this.font, 10);
      // })

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
      return this.ctx.measureText(this.text);
    }

  });

  Text.BASELINE = BASELINE;
  J.Text = Text;
})(Joy);

