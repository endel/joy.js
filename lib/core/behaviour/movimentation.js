(function(J) {
  var Movimentation = J.Behaviour.extend({
    INIT: function (options) {
      /**
       * @property velocity
       * @type {Vector2d}
       */
      this.velocity = new J.Vector2d();

      /**
       * @property maxVelocity
       * @type {Vector2d}
       * @default Joy.Vector2d(500,500)
       */
      this.maxVelocity = new J.Vector2d(500, 500);

      /**
       * @property acceleration
       * @type {Vector2d}
       */
      this.acceleration = new J.Vector2d();

      /**
       * @property friction
       * @type {Vector2d}
       */
      this.friction = new J.Vector2d();
    },

    UPDATE: function () {
      console.log("Velocity: ", this.velocity.x, this.velocity.y);

      this.velocity.x += this.acceleration.x * J.deltaTime;
      this.velocity.y += this.acceleration.y * J.deltaTime;

      // if (this.friction.x) {
      //   this.velocity.x
      // }

      // if (this.friction.y) {
      //   this.velocity.y
      // }

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
