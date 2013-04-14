/**
 * module Joy
 */
(function(J) {
  function parseProperties(parent, props) {
    var properties = {};

    // Position
    properties.position = new J.Vector2d();
    properties.position.x = parent.position.x + J.Range.parse((props.position && props.position.x) || {}).randomInt();
    properties.position.y = parent.position.y + J.Range.parse((props.position && props.position.y) || {}).randomInt();

    // Scale
    properties.scale = new J.Vector2d();
    properties.scale.x = J.Range.parse((props.scale && props.scale.x) || parent.scale.x).randomInt();
    properties.scale.y = J.Range.parse((props.scale && props.scale.y) || parent.scale.y).randomInt();

    // Other attributes
    properties.alpha = J.Range.parse(typeof(props.alpha)==="undefined" ? parent.alpha : props.alpha).randomInt();
    properties.rotation = J.Range.parse(typeof(props.rotation)==="undefined" ? parent.rotation : props.rotation).randomInt();

    return properties;
  }

  J.Behaviour.define('Particle', {
    init: function (options) {
      this.particleOptions = options;
    },

    ADDED: function () {
      var lastTween,
          start = parseProperties(this.particleOptions.emitter, this.particleOptions.start || {}),
          end = parseProperties(this.particleOptions.emitter, this.particleOptions.end || {});


      for (var prop in start) {
        this[prop] = start[prop];
        if (typeof(end[prop])==="object") {
          J.Tween(start[prop], this.particleOptions.ttl * 1000).to(end[prop]).start();
          delete end[prop];
        }
      }

      // When last tween complete, destroy the particle.
      J.Tween(this, this.particleOptions.ttl * 1000).to(end).onComplete(this.destroy).start();
    }

  });
})(Joy);

