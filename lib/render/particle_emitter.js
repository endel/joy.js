/**
 * TODO:
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

      // position         The position of the particle.
      // velocity         The velocity of the particle.
      // energy           The energy of the particle.
      // startEnergy      The starting energy of the particle.
      // size             The size of the particle.
      // rotation         The rotation of the particle.
      // angularVelocity  The angular velocity of the particle.
      // color            The color of the particle.

      this._super(options);
    }
  });

  J.ParticleEmitter = ParticleEmitter;
})(Joy);
