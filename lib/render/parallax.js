/**
 * @module Joy
 */
var DisplayObjectContainer = require('./display_object_container');

var Parallax = DisplayObjectContainer.extend({
  /**
   * @class Parallax
   * @constructor
   * @param {Object} options
   */
  init: function(options) {
    this._super(options);

    /**
     * Viewport that parallax effect will be based on.
     * @attribute viewport
     * @type {Viewport}
     */
    this.viewport = options.viewport || null;

    /**
     * Distance between each parallax child.
     * @attribute distance
     * @type {Number}
     */
    this.distance = options.distance || 1;

    /**
     * Amount of velocity that will increase by child.
     * @attribute velocity
     * @type {Number}
     */
    this.velocity = options.velocity || 1;

    // Bind on added to Container
    this.bind(Joy.Events.ADDED, this._setup);
  },

  _setup: function (scene) {
    if (!(scene instanceof Joy.Scene)) {
      throw new Error("'Parallax' instance must be added into a 'Scene'.");
    }
    this.viewport = scene.viewport;

    var parallax = this;

    // Add repeatable parts
    this.viewport.bind('setup', function() {
      var i, length, layer, child;

      for (i=0, length=parallax.numChildren; i < length; ++i) {

        if (parallax.getChildAt(i).position) {
          layer = parallax.getChildAt(i);

          // Empty previous setup
          while (layer.numChildren > 0) {
            layer.removeChildAt(0);
          }

          for (var j=0, childsToFill = Math.ceil(layer.width / this.width) - 1; j<childsToFill; ++j) {
            child = layer.clone();
            child.children = [];
            child.position.x = layer.width;
            layer.addChild(child);
          }
        }

      }
    });

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

module.exports = Parallax;
