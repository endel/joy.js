/**
 * @module Joy
 */
(function(J) {
  var Loader = J.Triggerable.extend({
    /**
     * @class Loader
     */
    init: function() {
      this._super();

      this.assets = [];
      this.loaded = 0;

      /**
       * Loaded percentage
       * @property percentage
       * @type {Number}
       */
      this.__defineGetter__('percentage', function () {
        return (this.loaded / this.assets.length) * 100;
      });

      /**
       * Is loading?
       * @property loading
       * @type {Boolean}
       */
      this.__defineGetter__('loading', function () {
        return this.assets.length == this.loaded;
      });
    },

    add: function(asset) {
      var that = this;
      this.assets.push(asset);

      asset.addEventListener('load', function() {
        that.loaded += 1;

        that.trigger('loadProgress');

        // Trigger load complete
        if (that.loaded == that.assets.length) {
          that.trigger('loadComplete');
        }
      });
    }

  });

  J.Loader = Loader;
})(Joy);

