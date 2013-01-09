(function(J) {
  /**
   * Built-in behaviour that have acceleration / friction / velocity control.
   * May be appended to any DisplayObject, by `behave` method.
   *
   * @example Append Movimentation behavior into player instance.
   *   player.behave(Joy.Behaviour.Movimentation);
   *   player.acceleration.x = 5;
   *   player.friction.x = 5;
   *
   * @class Behaviour.Movimentation
   */
  var Movimentation = J.Behaviour.extend({
    INIT: function (options) {
      /**
       * Current object's velocity
       * @property velocity
       * @type {Vector2d}
       * @readonly
       */
      this.velocity = new J.Vector2d();

      /**
       * Max velocity control.
       * @property maxVelocity
       * @type {Vector2d}
       * @default Joy.Vector2d(500,500)
       */
      this.maxVelocity = new J.Vector2d(500, 500);

      /**
       * Acceleration by frame, in pixels.
       * @property acceleration
       * @type {Vector2d}
       */
      this.acceleration = new J.Vector2d();

      /**
       * Friction for velocity.
       * @property friction
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

      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  });

  J.Behaviour.Movimentation = Movimentation;
})(Joy);
