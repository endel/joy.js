/**
 * module Joy
 */
(function(J) {
  var ParticleEmitter = J.DisplayObject.extend({
    /**
     * class ParticleEmitter
     * constructor
     * param {Object} options
     */
    init: function (options) {
      this._super(options);

      /**
       * Emit new particles each frame?
       * @property emit
       * @type {Boolean}
       */
      this.emit = (typeof(options.emit)==="undefined") ? true : options.emit;

      /*
       * Active particles list.
       * @property particles
       * @type Array
      this.particles = [];
       */

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
       * Tweening easing function.
       * @property ease
       * @type {Function}
       * @default Joy.Tween.Easing.Linear
       */
      this.ease = options.ease || J.TweenManager.Easing.Linear;

      /**
       * Particles start options.
       * @property start
       * @type {Obejct}
       */
      this.start = options.start || {};

      /**
       * Particles end options.
       * @property end
       * @type {Obejct}
       */
      this.end = options.end || {};

      /**
       * Minimum/maximum time to live of each generated particle.
       * @property particleLifetime
       * @type {Number}
       */
      this.particleLifetime = (typeof(options.particleLifetime)!=="undefined") ? new J.Range(options.particleLifetime) : new J.Range(1, 2);

      /**
       * Minimum/maximum time to live of particle emitter.
       * @property particleLifetime
       * @type {Number}
       */
      Object.defineProperty(this, 'lifetime', {
        get: function () {
          return this._lifetime;
        },
        set: function (lifetime) {
          this._lifetime = ((typeof(lifetime)!=="undefined") ? new J.Range(lifetime) : new J.Range(-1)).random();
        },
        configurable: true
      });
      this.lifetime = options.lifetime || Infinity;
      this._ttl = Infinity;

      // Propagate ADDED event to sources, to activate scene loader.
      this.bind(J.Events.ADDED, function () {
        for (var i = 0, l = this.sources.length; i < l; i ++) {
          this.sources[i].trigger(J.Events.ADDED);
        }
      });

      this.bind(J.Events.SCENE_ACTIVE, this._activate);
    },

    _activate: function () {
      this._ttl = Date.now() + (this.lifetime * 1000);
    },

    /**
     * Emit {qty} particles.
     * @method emit
     * @param {Number} qty
     * @return {ParticleEmitter} this
     */
    _emit: function (qty) {
      var particle;

      for (var i = 0; i < qty; i += 1) {
        particle = this.sources[ J.Range.randomInt(0, this.sources.length - 1) ].clone();
        particle.behave('Particle', {
          emitter: this,
          ease: this.ease,
          start: this.start,
          end: this.end,
          ttl: this.particleLifetime.random()
        });
        this.parent.addChild(particle);
      }

      return this;
    },

    //clear: function () {
      //this.particles = [];
    //},

    render: function () {
      this._super();

      if (!this.emit || Date.now() > this._ttl) { return; }

      // TODO: check emission rate
      this._emit(1);
    }
  });

  J.ParticleEmitter = ParticleEmitter;
})(Joy);
