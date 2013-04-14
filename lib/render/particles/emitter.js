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
       * The minimum/maximum number of particles that will be spawned every second.
       * @property emission
       * @type {Number}
       */
      this.emission = (typeof(options.emission)!=="undefined") ? new J.Range(options.emission) : new J.Range(1, 5);

      /**
       * Minimum/maximum time to live of particle emitter.
       * @property particleLifetime
       * @type {Number}
       */
      this.lifetime = (typeof(options.lifetime)!=="undefined") ? new J.Range(options.lifetime) : new J.Range(-1);

      /**
       * Minimum/maximum time to live of each generated particle.
       * @property particleLifetime
       * @type {Number}
       */
      this.particleLifetime = (typeof(options.particleLifetime)!=="undefined") ? new J.Range(options.particleLifetime) : new J.Range(1, 2);

      // Simulate new ttl each second
      var that = this;
      window.setTimeout(function () {that.simulate(new Date().getTime());}, 1000);

      this._super(options);
    },

    /**
     * Emit {qty} particles.
     * @method emit
     * @param {Number} qty
     * @return {ParticleEmitter} this
     */
    emit: function (qty) {
      var particle;

      for (var i = 0; i < qty; i += 1) {
        particle = this.sources[ J.Range.random(0, this.sources.length) ].clone();
        this.parent.addChild(particle);
        this.particles.push(particle);
      }
      return this;
    },

    simulate: function (time) {
    };

    clear: function () {
      this.particles = [];
    },

    render: function () {
      if (this.emit) {
        this.ttl.random()
      }
    }
  });

  J.ParticleEmitter = ParticleEmitter;
})(Joy);
