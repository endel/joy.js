/**
 * This is the main class for the Joy engine.
 * Everything will be loaded from here, to be used at full extent.
 *
 * @class Joy
 */
(function(global) {
  // Exports Joy engine.
  var Joy = global.Joy || {
    Init: {},
    Render: {},
    Input: {},
    Context: {},
    Events: {
      UPDATE: 'update'
    },
    debug: false
  };

  global.Joy = Joy;
})(window);
