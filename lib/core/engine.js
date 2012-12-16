/**
 * @class Engine
 */
(function(J) {
  // TODO: find a better way to reference currentEngine instance.
  // What will happen when we have two canvas contexts at the same time? (like a mini-map?)
  var currentEngine = null;

  var Engine = function(options) {
    currentEngine = this;

    // Active actors list
    this.actors = [];

    if (options.canvas2d) {
      this.context = new Joy.Context.Context2d({canvas: options.canvas2d});
    }

    if (options.canvas3d) {
      // OMG, there is no 3d yet (and shouldn't for long time...)
    }

    if (options.markup) {
      this.useMarkup();
    }

    // requestAnimationFrame
    this.onEnterFrame();
  };

  Engine.prototype.getHeight = function() {
    return this.context.canvas.height;
  };

  Engine.prototype.getWidth = function() {
    return this.context.canvas.width;
  };

  /**
   * Add a graphic object into context rendering pipeline
   * @param {Actor, Renderable} node
   */
  Engine.prototype.addChild = function(node) {
    var renderable;

    if (node instanceof J.Actor) {
      this.actors.push(node);
      renderable = node.graphic;
    } else {
      renderable = node;
    }

    return this.context.addChild(renderable);
  };

  Engine.prototype.render = function() {
    this.context.render();
  };

  Engine.prototype.useMarkup = function() {
    var markup = new J.Markup();
    markup.analyse(this.context);
  };

  /**
   * Call window's requestAnimationFrame.
   * @method onEnterFrame
   */
  Engine.prototype.onEnterFrame = function () {
    currentEngine.render();
    window.onEnterFrame(currentEngine.onEnterFrame);
  };

  J.Engine = Engine;
})(Joy);
