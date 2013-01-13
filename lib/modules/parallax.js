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

      /**
       * Distance between each parallax child.
       * @property distance
       * @type {Number}
       */
      this.distance = options.distance || 1;

      /**
       * Amount of velocity that will increase by child.
       * @property velocity
       * @type {Number}
       */
      this.velocity = options.velocity || 1;

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
      var velocity = this.distance;

      if (this.viewport && this.viewport.active) {
        for (var i=0, length=this.numChildren; i < length; ++i) {
          velocity *= this.velocity;
          this.getChildAt(i).position.x -= (this.viewport.translation.x * velocity) / this.viewport.width;
          this.getChildAt(i).position.y -= (this.viewport.translation.y * velocity) / this.viewport.height;
        }
      }

      this._super();
    }
  });

  J.Parallax = Parallax;
})(Joy);
