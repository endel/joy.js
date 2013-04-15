(function(J) {
  /**
   * @module Joy.Behaviour
   */
  var Behaviour = J.Object.extend({});

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

  Joy.Behaviour = Behaviour;
})(Joy);
