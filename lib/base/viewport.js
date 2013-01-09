(function(J) {
  /**
   * @class Viewport
   * @constructor
   *
   * @param {Object} options
   * @param {DisplayObject} options.follow
   * @param {Number} options.width
   * @param {Number} options.height
   */
  var Viewport = function(options) {
    /**
     * DisplayObject that will be followed.
     * @property follow
     * @type {DisplayObject}
     */
    this.follow = options.follow;

    /**
     * @property width
     * @type {Number}
     */
    this.width = options.width;

    /**
     * @property height
     * @type {Number}
     */
    this.height = options.height;
  };

  J.Viewport = Viewport;
})(Joy);
