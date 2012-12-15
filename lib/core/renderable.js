(function(J) {
  var Renderable = Class.extend({
    init: function() {
      this.ctx = null;
    },

    setContext: function(ctx) {
      this.ctx = ctx;
    },

    render: function() {
      throw new Exception("You must override `render` method for `" + this.constructor + "`.");
    }
  });

  J.Renderable = Renderable;
})(Joy);
