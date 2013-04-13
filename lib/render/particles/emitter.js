/**
 * module Joy
 */
(function(J) {
  var ParticleEmitter = J.DisplayObject.extend({;
    /**
     * class ParticleEmitter
     * constructor
     * param {Object} options
     */
    init: function (options) {
      /**
       * Emit new particles each frame?
       * @property emit
       * @type {Boolean}
       */
      this.emit = (typeof(options.active)==="undefined") ? true : options.emit;

      /**
       * The minimum number of particles that will be spawned every second.
       * @property min
       * @type {Number}
       */
      this.min = options.min || 1;

      /**
       * The maximum number of particles that will be spawned every second.
       * @property max
       * @type {Number}
       */
      this.max = options.max || 5;

      /**
       * @property position
       * @type {Vector2d}
       */
      this.position = options.position || new J.Vector2d(options.x, options.y);

      /**
       * @property scale
       * @type {Vector2d}
       */
      this.scale = options.scale || new Vector2d(1, 1);

      /**
       * Particle variations to emitt.
       * @property particles
       * @type {Array}
       */
      this.particles = (typeof(options.particle)!=="undefined") ? [options.particle] : options.particles;

      /**
       * Particles time to live. In seconds.
       * @property ttl
       * @type {Number}
       */
      this.ttl = options.ttl || 1;

      /**
       * Active particles list.
       * @property particles
       * @type Array
       */
      this.particles = [];

      // position         The position of the particle.
      // velocity         The velocity of the particle.
      // energy           The energy of the particle.
      // startEnergy      The starting energy of the particle.
      // size             The size of the particle.
      // rotation         The rotation of the particle.
      // angularVelocity  The angular velocity of the particle.

      // color            The color of the particle.

      this._super(options);
    },

    emit: function (numberOfParticles) {

    },

    clear: function () {
      this.particles = [];
    },

    render: function () {
      if (this.emit) {
      }
    }
  });

  J.ParticleEmitter = ParticleEmitter;
})(Joy);
