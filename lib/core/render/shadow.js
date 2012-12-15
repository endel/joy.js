(function(J) {
  var Shadow = J.Renderable.extend({
    init: function() {
    },

    render: function() {
      throw new Exception("You must override `render` method for `" + this.constructor + "`.");
    }
  });

  Joy.Render.Shadow = Shadow;
})(Joy);

