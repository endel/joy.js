/**
 * @class Parallax
 */
(function(J) {
  var Parallax = J.DisplayObjectContainer.extend({
    init: function() {
      var i = 0, length = arguments.length;
      for (; i<length; ++i) {
        this.addChild(arguments[i]);
      }
    },

    render: function() {
    }
  });

  J.Parallax = Parallax;
})(Joy);
