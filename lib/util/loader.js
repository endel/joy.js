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
      Object.defineProperty(this, 'percentage', {
        get: function () {
          return Math.round((this.loaded / this.assets.length) * 100);
        },
        configurable: true
      });

      /**
       * Is loading?
       * @property loading
       * @type {Boolean}
       */
      Object.defineProperty(this, 'loading', {
        get: function () {
          return this.assets.length !== this.loaded;
        },
        configurable: true
      });

      /**
       * Completed?
       * @property loading
       * @type {Boolean}
       */
      Object.defineProperty(this, 'completed', {
        get: function () {
          return (this.assets.length > 0) && !this.loading;
        },
        configurable: true
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
