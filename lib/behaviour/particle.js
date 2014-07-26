/**
 * module Joy
 */
var Behaviour = require('./behaviour');
var Vector2d = require('../math/vector2d');
var Range = require('../math/range');
var Tween = require('../modules/tween');

function parseProperties(parent, props) {
  var properties = {};

  // Position
  properties.position = new Vector2d();
  properties.position.x = parent.position.x + Range.parse((props.position && props.position.x) || {}).randomInt();
  properties.position.y = parent.position.y + Range.parse((props.position && props.position.y) || {}).randomInt();

  // Scale
  properties.scale = new Vector2d();
  properties.scale.x = Range.parse((props.scale && props.scale.x) || parent.scale.x).randomInt();
  properties.scale.y = Range.parse((props.scale && props.scale.y) || parent.scale.y).randomInt();

  // Other attributes
  properties.alpha = Range.parse(typeof(props.alpha)==="undefined" ? parent.alpha : props.alpha).randomInt();
  properties.rotation = Range.parse(typeof(props.rotation)==="undefined" ? parent.rotation : props.rotation).randomInt();

  return properties;
}

Behaviour.define('particle', {
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
        Tween(start[prop], this.particleOptions.ttl * 1000).to(end[prop]).start();
        delete end[prop];
      }
    }

    // When last tween complete, destroy the particle.
    Tween(this, this.particleOptions.ttl * 1000).to(end).onComplete(this.destroy).start();
  }

});
