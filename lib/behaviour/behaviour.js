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
  Behaviour.define = function (name, object) {
    this.behaviours[name] = Behaviour.extend(object);
  };

  /**
   * Get a behaviour reference
   * @method define
   * @param {String} name
   * @return {Behaviour}
   * @static
   */
  Behaviour.get = function (name) {
    return this.behaviours[name];
  };

  Joy.Behaviour = Behaviour;
})(Joy);
