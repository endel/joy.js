(function(J) {
  var Layer = function() {
    this.children = [];
  };

  Layer.prototype.addChild = function(child) {
    this.children.push(child);
  };

  J.Layer = Layer;
})(Joy);
