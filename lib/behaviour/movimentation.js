/**
 * @module Joy.Behaviour
 */
(function(J) {
  /**
   * Built-in behaviour that have acceleration / friction / velocity control.
   * May be appended to any DisplayObject, by `DisplayObject#behave` method.
   *
   * @class Movimentation
   * @constructor
   *
   * @example
   *     player = new Joy.DisplayObject(...);
   *
   *     // Append movimentation behaviour to DisplayObject
   *     player.behave('Movimentation');
   *
   *     // Configure attributes
   *     player.maxVelocity.x = 8;
   *     player.acceleration.x = 2;
   *     player.friction.x = 1;
   *
   */
  J.Behaviour.Movimentation = J.Behaviour.define('Movimentation', {
    INIT: function (options) {
      /**
       * Current object's velocity
       * @attribute velocity
       * @type {Vector2d}
       * @readOnly
       */
      this.velocity = new J.Vector2d();

      /**
       * @attribute maxVelocity
       * @type {Vector2d}
       * @default Joy.Vector2d(500,500)
       */
      this.maxVelocity = new J.Vector2d(500, 500);

      /**
       * Normalized velocity vector, with x/y values between -1 and 1.
       * @attribute direction
       * @type {Vector2d}
       * @readonly
       */
      Object.defineProperty(this, 'direction', {
        get: function () {
          return this.velocity.normalized;
        },
        configurable: true
      });

      /**
       * Acceleration by frame, in pixels.
       *
       * @attribute acceleration
       * @type {Vector2d}
       */
      this.acceleration = new J.Vector2d();

      /**
       * Friction for velocity.
       *
       * @attribute friction
       * @type {Vector2d}
       */
      this.friction = new J.Vector2d();
    },

    UPDATE: function () {
      if (this.friction.x) {
        this.velocity.x = J.Utils.applyFriction(this.velocity.x, this.friction.x);
      }

      if (this.friction.y) {
        this.velocity.y = J.Utils.applyFriction(this.velocity.y, this.friction.y);
      }

      this.velocity.x += this.acceleration.x * J.deltaTime;
      this.velocity.y += this.acceleration.y * J.deltaTime;

      if (this.velocity.x !== 0) {
        this.velocity.x = Math.clamp(this.velocity.x, -this.maxVelocity.x, this.maxVelocity.x);
      }

      if (this.velocity.y !== 0) {
        this.velocity.y = Math.clamp(this.velocity.y, -this.maxVelocity.y, this.maxVelocity.y);
      }

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  });
})(Joy);
