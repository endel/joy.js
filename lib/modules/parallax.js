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

      var parallax = this;
      this.viewport.bind('translate', function() {
        var velocity = parallax.distance;

        for (var i=0, length=parallax.numChildren; i < length; ++i) {
          velocity *= parallax.velocity * (i + 1);
          if (parallax.getChildAt(i).position) {
            parallax.getChildAt(i).position.x += (this.translation.x * velocity) / this.width;
            parallax.getChildAt(i).position.y += (this.translation.y * velocity) / (this.height / 2);
          }
        }
      });
    }

  });

  J.Parallax = Parallax;
})(Joy);
