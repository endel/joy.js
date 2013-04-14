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

  Joy.Behaviour = Behaviour;
})(Joy);
