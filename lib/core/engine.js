/**
 * @class Engine
 */
(function(J) {
  var Engine = function(options) {
    if (options.canvas2d) {
      this.context = new Joy.Context.Context2d({canvas: options.canvas2d});
    }

    if (options.canvas3d) {
      // OMG, there is no 3d yet (and shouldn't for long time...)
    }

    if (options.markup) {
      this.useMarkup();
    }

    return this;
  };

  Engine.prototype.getHeight = function() {
    return this.context.canvas.height;
  };

  Engine.prototype.getWidth = function() {
    return this.context.canvas.width;
  };

  Engine.prototype.addChild = function(node) {
    return this.context.addChild(node);
  };

  Engine.prototype.render = function() {
    return this.context.render();
  };

  Engine.prototype.useMarkup = function() {
    var markup = new J.Markup();
    markup.analyse(this.context);
  };

  J.Engine = Engine;
})(Joy);
