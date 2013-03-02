/**
 * @module Joy
 */
(function(J) {
  /**
   * This class is used on SpriteSheet's `animations` attribute.
   *
   * @class SpriteAnimation
   * @constructor
   */
  var SpriteAnimation = function (options) {
    /**
     * @attribute parent
     * @type {SpriteSheet}
     */
    this.parent = options.parent;

    /**
     * @attribute name
     * @type {String}
     */
    this.name = options.name;

    /**
     * @attribute framesPerSecond
     * @type {Number}
     */
    this.framesPerSecond = options.framesPerSecond;

    /**
     * @attribute frames
     * @type {Array}
     */
    this.frames = options.frames;

    /**
     * @attribute firstFrame
     * @type {Number}
     */
    this.firstFrame = this.frames[0];

    /**
     * @attribute lastFrame
     * @type {Number}
     */
    this.lastFrame = lastFrame = this.frames[1] || this.frames[0];

    /**
     * @attribute currentFrame
     * @type {Number}
     */
    this.currentFrame = 0;
  };

  /**
   * Start the animation
   * @method start
   */
  SpriteAnimation.prototype.start = function () {
    this.currentFrame = this.firstFrame;

    // Create the interval to change through frames
    var self = this;
    this._interval = setInterval(function(){ self.update(); }, 1000 / this.framesPerSecond);
  };

  /**
   * Stops the animation
   * @method stop
   */
  SpriteAnimation.prototype.stop = function () {
    if (this._interval) {
      clearInterval(this._interval);
    }
    return this;
  };

  /**
   * Update frame animation
   * @method update
   */
  SpriteAnimation.prototype.update = function () {
    if (this.currentFrame == this.lastFrame) {
      this.currentFrame = this.firstFrame;

      // Reached the first frame, trigger animation start callback.
      this.parent.trigger('animationStart');
    } else {
      this.currentFrame = this.currentFrame + 1;

      // Reached the last frame, trigger animation end callback.
      if (this.currentFrame == this.lastFrame) {
        this.parent.trigger('animationEnd');
      }
    }
  };

  J.SpriteAnimation = SpriteAnimation;
})(Joy);
