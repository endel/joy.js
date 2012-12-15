/**
 * This is the main class for the Joy engine.
 * Everything will be loaded from here, to be used at full extent.
 *
 * @class Joy
 */
var Joy = Joy || {
  /**
   * Initializes the engine and loads up a package.
   * @method Setup
   */
  Setup: function(canvasId) {
    //
  }
};

/**
 * Class class
 */
var Class = function(d){
  d.constructor.extend = function(def){
    for (var k in d) if (!def.hasOwnProperty(k)) def[k] = d[k];
    return Class(def);
  };
  return (d.constructor.prototype = d).constructor;
};

