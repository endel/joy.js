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
      this._super(options);

      this.animations = { length: 0 };
      this._frequencyInterval = null;

      // Frames
      this.frames = 1;

      /**
       * Frames per second.
       * @attribute framesPerSecond
       * @alias fps
       * @type {Number}
       */
      this.framesPerSecond = options.framesPerSecond || options.fps || 24;

      // Define animations
      if (options.animations) {
        for (var name in options.animations) {
          this.addAnimation(name, options.animations[name]);
        }
      }

      /**
       * Current running animation name
       * @attribute currentAnimationName
       * @type {String}
       * @readonly
       */
      this.currentAnimationName = 'all';

      // framesPerSecond alias
      Object.defineProperty(this, 'fps', {
        get: function () {
          return this.framesPerSecond;
        },
        configurable: true
      });

      /**
       * @attribute currentAnimation
       * @type {SpriteAnimation}
       * @readonly
       */
      Object.defineProperty(this, 'currentAnimation', {
        get: function () {
          return this.animations[this.currentAnimationName];
        },
        configurable: true
      });

    },

    /**
     * Add animation to sprite sheet.
     * @param {String} name
     * @param {Object, Array} data list of frame numbers or options object
     *   @param {Array} [options.frames] frame indexes
     *   @param {Number} [options.framesPerSecond]
     *
     * @example
     *  spriteSheet.addAnimation("walking", [0, 32]);
     *  spriteSheet.addAnimation("walking", {frames: [0, 32], framesPerSecond: 2});
     *
     * @return {SpriteSheet} this
     */
    addAnimation: function (name, data) {
      this.animations[name] = new J.SpriteAnimation({
        parent: this,
        name: name,
        frames: (data instanceof Array) ? data : data.frames,
        framesPerSecond: data.framesPerSecond || this.framesPerSecond
      });

      // Increase animations set length;
      this.animations.length = (this.animations.length || 0) + 1;

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

      this.addAnimation('all', [0, totalFrames-1]);

      if (this.animations.length === 0 || this.currentAnimation === null) {
        this.play('all');
      }
    },

    /**
     * Play specified animation by name
     * @param {String} animationName
     * @return {SpriteSheet} this
     */
    play: function (animationName) {
      if (this.currentAnimationName != animationName) {
        // Stop previous animation
        if (this.currentAnimation) {
          this.currentAnimation.stop();
        }

        this.currentAnimationName = animationName;

        // Throw error when requested animation doesn't exists.
        if (!this.animations[animationName]) {
          throw new Error("Animation '" + animationName + "' not found on '" + this.id + "'");
        }

        this.animations[animationName].start();
      }
      return this;
    },

    /**
     * Stop current animation
     * @method stop
     * @return {SpriteSheet} this
     */
    stop: function () {
      this.currentAnimation.stop();
    },

    render: function() {
      if (!this.visible) { return; }

      this.ctx.drawImage(this.image,
                         this._width * (this.currentAnimation.currentFrame % this._columns),
                         this._height * ((this.currentAnimation.currentFrame / this._columns) >> 0),
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
