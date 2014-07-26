/**
 * @module Joy.Behaviour
 */
var Class = require('../core/class');
var Behaviour = Class.extend({});

/**
 * @property behaviours
 * @type {Array}
 * @static
 */
Behaviour.behaviours = {};

/**
 * Define a behaviour globally
 * @method define
 * @param {String} name
 * @param {Object} object
 * @static
 */
Behaviour.define = function (id, object) {
  this.behaviours[id] = Behaviour.extend(object);
  this.behaviours[id].id = id;
  return this.behaviours[name];
};

/**
 * Get a behaviour reference
 * @method define
 * @param {String} id
 * @return {Behaviour}
 * @static
 */
Behaviour.get = function (id) {
  return this.behaviours[id];
};

module.exports = Behaviour;
