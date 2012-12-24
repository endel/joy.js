(function(J) {
  // TODO: find a better way to reference currentEngine instance.
  // What will happen when we have two canvas contexts at the same time? (like a mini-map?)
  var currentEngine = null;

  /**
   * Engine context. Start your application from here.
   *
   * @class Engine
   * @constructor
   */
  var Engine = function(options) {
    currentEngine = this;

    // Active actors list
    this.scenes = [];

    if (options.canvas2d) {
      this.context = new Joy.Context.Context2d({canvas: options.canvas2d});
    }

    if (options.canvas3d) {
      // OMG, there is no 3d yet (and shouldn't for long time...)
    }

    if (options.markup) {
      this.useMarkup();
    }

    this.__defineGetter__('width', function() {
      return this.context.canvas.width;
    });
    this.__defineGetter__('height', function() {
      return this.context.canvas.height;
    });

    // requestAnimationFrame
    if (Joy.debug) {
      this._lastRenderTime = new Date();
      this._frameRateText = new Joy.Text({x: 4, y: 4, font: "12px Verdana", color: "red"});
      this.onEnterFrameDebug();
    } else {
      this.onEnterFrame();
    }
  };

  Engine.prototype.createScene = function() {
    var scene = new J.Scene();
    this.addScene(scene);
    return scene;
  };

  Engine.prototype.addScene = function(scene) {
    scene.setContext(this.context.ctx);

    if (Joy.debug) {
      scene.addChild(this._frameRateText);
    }

    this.scenes.push(scene);
  };

  Engine.prototype.render = function() {
    this.context.render(this.scenes);
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

  /**
   * Inspect application frame rate. Call window's requestAnimationFrame
   * @method onEnterFrameDebug
   */
  Engine.prototype.onEnterFrameDebug = function () {
    var thisRenderTime = new Date();
    currentEngine._frameRateText.text = (1000 / (thisRenderTime - currentEngine._lastRenderTime)).toFixed(1).toString() + " FPS";
    currentEngine.render();
    currentEngine._lastRenderTime = thisRenderTime;

    window.onEnterFrame(currentEngine.onEnterFrameDebug);
  };

  J.Engine = Engine;
})(Joy);
