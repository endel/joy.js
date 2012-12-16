/**
 * Base class for rendering.
 * @class Renderable
 */
(function(J) {
  var Renderable = Class.extend({
    init: function() {
      this.ctx = null;
      this.plugins = [];
      this._preRender = [];
      this._postRender = [];
    },

    setContext: function(ctx) {
      var i = 0,
          length = this.plugins.length;

      this.ctx = ctx;

      for (;i<length;++i) {
        this.plugins[i].setContext(ctx);
      }
    },

    addPlugin: function(plugin) {
      if (plugin.preRender) {
        this._preRender.push(plugin);
      }

      if (plugin.postRender) {
        this._postRender.push(plugin);
      }

      this.plugins.push(plugin);
    },

    preRender: function() {
      var i = 0,
          length = this._preRender.length;
      for (;i<length;++i) {
        this._preRender[i].preRender();
      }
    },

    postRender: function() {
      var i = 0,
          length = this._postRender.length;
      for (;i<length;++i) {
        this._postRender[i].postRender();
      }
    },

    render: function() {
      throw new Exception("You must override `render` method for `" + this.constructor + "`.");
    }
  });

  J.Renderable = Renderable;
})(Joy);
