(function(J) {
  // TODO: find a better way to reference currentEngine instance.
  // What will happen when we have two canvas contexts at the same time? (like a mini-map?)
  J.currentEngine = null;

  /**
   * Engine context. Start your application from here.
   * @class Engine
   * @constructor
   */
  var Engine = function(options) {
    J.currentEngine = this;

    // Active actors list
    this.scenes = [];

    /**
     * Is engine paused?
     * @property paused
     * @type {Boolean}
     */
    this.paused = false;

    if (options.canvas2d) {
      this.context = new Joy.Context.Context2d({canvas: options.canvas2d});
    }

    if (options.canvas3d) {
      // OMG, there is no 3d yet (and shouldn't for long time...)
    }

    // Create canvas and context, if it isn't set.
    if (!this.context) {
      var contextKlass = options.context || Joy.Context.Context2d;
      this.context = new contextKlass({canvas: document.createElement('canvas')});
      document.body.appendChild(this.context.canvas);
    }

    if (options.width) {
      this.context.canvas.width = options.width;
    }

    if (options.height) {
      this.context.canvas.height = options.height;
    }

    // TODO: Implement on-init engine trigger
    // Enable mouse events, if module is included
    if (typeof(J.Mouse) !== "undefined") {
      J.Mouse.enable(this);
    }

    if (options.markup) {
      this.useMarkup();
    }

    if (options.debug) {
      Joy.debug = true;
    }

    this.__defineGetter__('width', function() {
      return this.context.canvas.width;
    });

    this.__defineGetter__('height', function() {
      return this.context.canvas.height;
    });

    /**
     * @property currentScene
     * @type {Scene}
     * @readonly
     */
    this.__defineGetter__('currentScene', function() {
      return this.scenes[this._currentSceneIndex];
    });
    this.__defineSetter__('_currentScene', function (index) {
      // Trigger scene active event
      console.log("_currentScene!", this.scenes[index]);
      this.scenes[index].broadcast(J.Events.SCENE_ACTIVE, [this.scenes[index]]);
      this._currentSceneIndex = index;
    });
    this._currentSceneIndex = null;

    // requestAnimationFrame
    if (Joy.debug) {
      this._lastRenderTime = new Date();
      this._frameRateText = new Joy.Text({x: 4, y: 4, font: "12px Verdana", color: "red"});
      this.onEnterFrameDebug();
    } else {
      this.onEnterFrame();
    }
  };

  /**
   * Create a new scene
   * @method createScene
   * @return {Scene}
   */
  Engine.prototype.createScene = function() {
    var scene = new J.Scene({ctx: this.context.ctx});
    this.addScene(scene);
    return scene;
  };

  /**
   * Pause engine
   * @method pause
   * @param {Object} options
   */
  Engine.prototype.pause = function() {
    this._deltaTime = J.deltaTime;
    J.deltaTime = 0;
    this.paused = true;
  };

  /**
   * Resume if engine is paused.
   * @method resume
   */
  Engine.prototype.resume = function() {
    J.deltaTime = this._deltaTime;
    this.paused = false;
  };

  /**
   * @method gotoNextScene
   * @param {Number} fadeMilliseconds (default=1000)
   * @param {String, Color} color (default=#fff)
   * @return {Scene} this
   */
  Engine.prototype.gotoNextScene = function(milliseconds, color) {
    if (!milliseconds) { milliseconds = 1000; }
    if (!color) { color = "#fff"; }
    var self = this;
    this.scenes[this._currentSceneIndex].fadeOut(milliseconds, color).bind('fadeOutComplete', function () {
      self.scenes[self._currentSceneIndex].visible = false;
      self._currentScene = self._currentSceneIndex + 1;
      self.scenes[self._currentSceneIndex].visible = true;
      self.scenes[self._currentSceneIndex].fadeIn(milliseconds, color);
    });
    return this;
  };

  Engine.prototype.addScene = function(scene) {
    scene.engine = this;
    scene.setContext(this.context.ctx);

    if (Joy.debug) {
      scene.viewport.addHud(this._frameRateText);
    }

    // The first scene added to engine is always the 'current'
    this.scenes.push(scene);

    if (this._currentSceneIndex === null) {
      scene.visible = true;
      this._currentScene = this.scenes.length - 1;
    }
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
    if (!J.currentEngine.paused) { J.currentEngine.render(); }
    window.onEnterFrame(J.currentEngine.onEnterFrame);
  };

  /**
   * Inspect application frame rate. Call window's requestAnimationFrame
   * @method onEnterFrameDebug
   */
  Engine.prototype.onEnterFrameDebug = function () {
    var thisRenderTime = new Date();
    J.currentEngine._frameRateText.text = (1000 / (thisRenderTime - J.currentEngine._lastRenderTime)).toFixed(1).toString() + " FPS";
    if (!J.currentEngine.paused) { J.currentEngine.render(); }
    J.currentEngine._lastRenderTime = thisRenderTime;

    window.onEnterFrame(J.currentEngine.onEnterFrameDebug);
  };

  J.Engine = Engine;
})(Joy);
