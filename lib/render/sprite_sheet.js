/**
 * @module Joy
 */
(function(J) {
  /**
   * Handles spritesheet animations
   *
   * @class SpriteSheet
   * @constructor
   *
   * @param {Object} options
   *  @param {Object} animations
   */
  var SpriteSheet = J.Sprite.extend({
    init: function (options) {
      var self = this;
      this._super(options);

      this._animations = {length: 0};
      this._frequencyInterval = null;

      // Frames
      this.frames = 1;

      /**
       * @attribute currentFrame
       * @type {Number}
       */
      this.currentFrame = 0;

      /**
       * Frames per second.
       * @attribute framesPerSecond
       * @alias fps
       * @type {Number}
       */
      this.framesPerSecond = options.framesPerSecond || options.fps || 24;

      if (options.animations) {
        for (var name in options.animations) {
          if (options.animations[name] instanceof Array) {
            this.addAnimation(name, options.animations[name]);
          }
        }
      }

      /**
       * @attribute currentAnimation
       * @type {String}
       * @readonly
       */
      this._currentAnimation = null;
      this.__defineGetter__('currentAnimation', function () {
        return this._currentAnimation;
      });

      // framesPerSecond alias
      this.__defineGetter__('fps', function () {
        return this.framesPerSecond;
      });

      // Create the interval to change through frames
      this._frequencyInterval = setInterval(function(){ self.update(); }, 1000 / this.framesPerSecond);
    },

    update: function() {
      var currentAnimation = this._animations[this._currentAnimation];

      if (this.currentFrame == currentAnimation.lastFrame) {
        this.currentFrame = currentAnimation.firstFrame;

        // Reached the first frame, trigger animation start callback.
        this.trigger('animationStart');
      } else {
        this.currentFrame = this.currentFrame + 1;

        // Reached the last frame, trigger animation end callback.
        if (this.currentFrame == currentAnimation.lastFrame) {
          this.trigger('animationEnd');
        }
      }
    },

    /**
     * Add animation to sprite sheet.
     * @param {String} name
     * @param {Array} frames
     *
     * @example
     *  spriteSheet.addAnimation("walking", [0, 32]);
     *
     * @return {SpriteSheet} this
     */
    addAnimation: function (name, frames) {
      var firstFrame = frames[0], lastFrame = frames[1] || frames[0];
      this._animations[name] = {firstFrame: firstFrame, lastFrame: lastFrame};

      // Increase animations set length;
      this._animations.length = (this._animations.length || 0) + 1;

      return this;
    },

    onLoad: function () {
      this._super();
      var totalFrames = 1;

      // Check for spritesheet
      if (this._width < this.image.width) {
        totalFrames = this._columns = Math.ceil(this.image.width / this._width);
      }
      if (this._height < this.image.height) {
        totalFrames = totalFrames * (this._rows = Math.ceil(this.image.height / this._height));
      }

      if (this._animations.length === 0 || this._currentAnimation === null) {
        this.addAnimation('default', [0, totalFrames-1]);
        this.play('default');
      }
    },

    /**
     * Play specified animation by name
     * @param {String} animationName
     * @return {SpriteSheet} this
     */
    play: function (animationName) {
      if (this._currentAnimation != animationName) {
        this._currentAnimation = animationName;
        if (!this._animations[animationName]) {
          throw new Error("Animation '" + animationName + "' not found on '" + this.id + "'");
        }
        this.currentFrame = this._animations[animationName].firstFrame;
      }
      return this;
    },

    /**
     * Stop current animation
     * @method stop
     * @return {SpriteSheet} this
     */
    stop: function () {
      clearInterval(this._frequencyInterval);
    },

    render: function() {
      if (!this.visible) { return; }

      this.ctx.drawImage(this.image,
                         this._width * (this.currentFrame % this._columns),
                         this._height * ((this.currentFrame / this._columns) >> 0),
                         this._width,
                         this._height,
                         0,
                         0,
                         this._width,
                         this._height);
    }
  });

  J.SpriteSheet = SpriteSheet;
})(Joy);
