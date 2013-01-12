(function(J) {
  var Parallax = J.DisplayObjectContainer.extend({
    /**
     * @class Parallax
     * @constructor
     * @param {Object} options
     */
    init: function(options) {
      this._super(options);

      /**
       * Viewport that parallax effect will be based on.
       * @property viewport
       * @type {Viewport}
       */
      this.viewport = options.viewport || null;

      // Bind on added to Container
      this.bind(J.Events.ADDED, this._setup);
    },

    _setup: function (scene) {
      if (!(scene instanceof J.Scene)) {
        throw new Error("'Parallax' instance must be added into a 'Scene'.");
      }
      this.viewport = scene.viewport;
    },

    render: function() {
      this._super();
    }
  });

  J.Parallax = Parallax;
})(Joy);
