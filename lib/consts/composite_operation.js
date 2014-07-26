/**
* @module Joy
*/

/**
 * Used on `DisplayObject#composite`
 * @class CompositeOperation
 * @static
 */
var CompositeOperation = {
  /**
   * @attribute SOURCE_OVER
   * @static
   * @final
   * @type {String}
   */
  SOURCE_OVER: 'source-over',

  /**
   * @attribute SOURCE_IN
   * @static
   * @final
   * @type {String}
   */
  SOURCE_IN: 'source-in',

  /**
   * @attribute SOURCE_OUT
   * @static
   * @final
   * @type {String}
   */
  SOURCE_OUT: 'source-out',

  /**
   * @attribute SOURCE_ATOP
   * @static
   * @final
   * @type {String}
   */
  SOURCE_ATOP: 'source-atop',

  /**
   * @attribute LIGHTER
   * @static
   * @final
   * @type {String}
   */
  LIGHTER: 'lighter',

  /**
   * @attribute XOR
   * @static
   * @final
   * @type {String}
   */
  XOR: 'xor',

  /**
   * @attribute DESTINATION_OVER
   * @static
   * @final
   * @type {String}
   */
  DESTINATION_OVER: 'destination-over',

  /**
   * @attribute DESTINATION_IN
   * @static
   * @final
   * @type {String}
   */
  DESTINATION_IN: 'destination-in',

  /**
   * @attribute DESTINATION_OUT
   * @static
   * @final
   * @type {String}
   */
  DESTINATION_OUT: 'destination-out',

  /**
   * @attribute DESTINATION_ATOP
   * @static
   * @final
   * @type {String}
   */
  DESTINATION_ATOP: 'destination-atop',

  /**
   * @attribute DESTINATION_COPY
   * @static
   * @final
   * @type {String}
   */
  DESTINATION_COPY: 'copy'
};

module.exports = CompositeOperation;
