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
       * Active particles list.
       * @property particles
       * @type Array
       */
      this.particles = [];

      /**
       * Particle variations to emitt.
       * @property particles
       * @type {Array}
       */
      this.sources = (typeof(options.source)!=="undefined") ? [options.source] : options.sources;

      /**
       * The minimum number of particles that will be spawned every second.
       * @property min
       * @type {Number}
       */
      this.emission = (typeof(options.emission)!=="undefined") ? new J.Range(options.emission) : new J.Range(1, 5);

      /**
       * Enerty
       * @property ttl
       * @type {Number}
       */
      this.energy = (typeof(options.energy)!=="undefined") ? new J.Range(options.energy) : new J.Range(1, 2);

      /**
       * @property position
       * @type {Vector2d}
       */
      this.position = options.position || new J.Vector2d(options.x, options.y);

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
