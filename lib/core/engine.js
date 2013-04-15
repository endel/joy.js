/**
 * @module Joy
 */
(function(J) {
  // TODO: find a better way to reference currentEngine instance.
  // What will happen when we have two canvas contexts at the same time? (like a mini-map?)
  J.currentEngine = null;

  /**
   * Engine context. Start your application from here.
   *
   * @class Engine
   * @param {CanvasElement | Object} options
   * @constructor
   */
  var Engine = function(options) {
    J.currentEngine = this;

    /**
     * Is engine paused?
     * @attribute paused
     * @type {Boolean}
     */
    this.paused = false;

    if (typeof(options.tagName) === "string" && options.tagName === "CANVAS") {
      options = {canvas: options};
      var dataset = Joy.Markup.evaluateDataset(options.canvas);
      for (var attr in dataset) {
        options[attr] = dataset[attr];
      }
    }

    if (options.canvas) {
      this.context = new Joy.Context.Context2d({canvas: options.canvas});
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

    // Resize canvas accourding to device pixel ratio
    // 1 on Desktops
    // 2 on Retina Display
    this.context.canvas.style.width = (this.context.canvas.width / window.devicePixelRatio) + "px";
    this.context.canvas.style.height = (this.context.canvas.height / window.devicePixelRatio) + "px";

    if (options.fullscreen) {
      window.onresize = function (e) {
        // TODO: resize container and all children elements
      };
    }

    // TODO: Implement on-init engine trigger
    // Enable mouse events, if module is included
    if (typeof(J.Mouse) !== "undefined") {
      J.Mouse.enable(this);
    }
    if (options.debug) {
      Joy.debug = true;
    }

    // Active actors list
    this.scenes = [];

    Object.defineProperty(this, 'width', {
      get: function () {
        return this.context.canvas.width;
      },
      configurable: true
    });

    Object.defineProperty(this, 'height', {
      get: function () {
        return this.context.canvas.height;
      },
      configurable: true
    });

    /**
     * @attribute currentScene
     * @type {Scene}
     */
    Object.defineProperty(this, 'currentScene', {
      get: function () {
        return this.scenes[this._currentSceneIndex];
      },
      set: function (scene) {
        if (this._currentSceneIndex !== null) {
          // Restore context2d viewport translation
          this.scenes[this._currentSceneIndex].visible = false;
          this.scenes[this._currentSceneIndex].viewport.reset();
        }

        if (this.sceneLoader && scene.loader.loading) {
          this._currentSceneIndex = this.scenes.indexOf(this.sceneLoader);
          this.sceneLoader.loader = scene.loader;
          this.sceneLoader.visible = true;

          scene.visible = false;
          scene.loader.bind('loadComplete', function() {
            J.currentEngine.gotoScene(scene);
          });

        } else {
          this._currentSceneIndex = this.scenes.indexOf(scene);
          scene.visible = true;

          // Trigger scene active event
          scene.broadcast(J.Events.SCENE_ACTIVE, [scene]);
        }
      }
    });

    this._currentSceneIndex = null;

    /**
     * Scene that will show when your current scene is loading.
     * @property sceneLoader
     * @type {Scene}
     */
    this.sceneLoader = null;
    this.setSceneLoader(J.Engine.defaultSceneLoader);

    // Parse <canvas> markup when it's not empty
    if (this.context.canvas.children.length > 0) {
      this.markup = new J.Markup(this).parse();
    }

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
   * @param {Function} setupMethod
   *
   * @example
   *     // Creating a scene with setup
   *     engine.createScene(function(scene) {
   *        scene.addChild(...);
   *     });
   *
   * @return {Engine}
   */
  Engine.prototype.createScene = function(setupMethod) {
    var scene = new J.Scene({ctx: this.context.ctx});

    // yield scene on setup method
    if (typeof(setupMethod) === "function") {
      setupMethod.apply(this, [scene]);
    }

    this.addScene(scene);
    return scene;
  };

  /**
   * Create a new scene loader.
   * The first scene loader created will be the default to appear whenever a loader is requested.
   *
   * @method setSceneLoader
   * @param {Function | Scene} setupMethod or target loader scene
   * @param {Number} fadeMilliseconds
   * @param {String | Color} fadeColor
   *
   * @example
   *
   *     //
   *     // Setup custom scene loader
   *     //
   *     engine.setSceneLoader(function(scene) {
   *        scene.addChild(...).bind(Joy.Events.UPDATE, function () {
   *          console.log(scene.loader.percentage);
   *        });
   *     });
   *
   *     //
   *     // Set based on created scene
   *     //
   *     // => Set your first scene loader
   *     var firstLoader = engine.setSceneLoader(function(scene) {
   *        scene.addChild(...).bind(Joy.Events.UPDATE, function () {
   *          console.log(scene.loader.percentage);
   *        });
   *     });
   *
   *     // => Change the loader
   *     var secondLoader = engine.setSceneLoader(function(scene) {
   *        scene.addChild(...);
   *     });
   *     // => Change it again, using the first one
   *     engine.setSceneLoader(firstLoader);
   *
   * @return {Scene} sceneLoader
   */
  Engine.prototype.setSceneLoader = function(obj) {
    var scene = (typeof(obj) === "object") ? obj : new J.Scene({
      ctx: this.context.ctx,
      loader: null
    });

    // yield scene on setup method
    if (typeof(obj) === "function") {
      obj.apply(this, [scene]);
    }

    // Add only unique items to scene list
    if (this.scenes.indexOf(scene) === -1) {
      this.scenes.push(scene);
    }

    this.sceneLoader = scene;
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
   * @param {String | Color} color (default=#000)
   * @return {Engine} this
   */
  Engine.prototype.gotoNextScene = function(milliseconds, color) {
    if (typeof(this.scenes[this._currentSceneIndex+1])==="undefined") {
      throw new Error("There is no next scene.");
    }
    return this.gotoScene(this.scenes[this._currentSceneIndex+1], milliseconds, color);
  };

  /**
   * @method gotoScene
   * @param {Scene | String} scene reference or scene id
   * @param {Number} fadeMilliseconds (default=1000)
   * @param {String | Color} color (default=#000)
   * @return {Engine} this
   */
  Engine.prototype.gotoScene = function (scene, milliseconds, color) {
    var self = this;
    if (!milliseconds) { milliseconds = 1000; }
    if (!color) { color = "#000"; }

    this.currentScene.fadeOut(milliseconds, color).bind('fadeOutComplete', function () {
      self.currentScene = scene;
      self.currentScene.fadeIn(milliseconds, color);
    });

    return this;
  };

  Engine.prototype.addScene = function(scene) {
    scene.engine = this;
    scene.setContext(this.context.ctx);

    if (Joy.debug) {
      scene.viewport.addHud(this._frameRateText);
    }

    this.scenes.push(scene);

    // The first scene added to engine is always the 'current'
    if (this._currentSceneIndex === null) {
      this.currentScene = scene;
    }
  };

  Engine.prototype.render = function() {
    this.context.render(this.scenes);
  };

  /**
   * Call window's requestAnimationFrame.
   * @method onEnterFrame
   */
  Engine.prototype.onEnterFrame = function () {
    if (!J.currentEngine.paused) {
      // Update tweening engine
      J.TweenManager.update();

      // Update rendering
      J.currentEngine.render();
    }
    window.onEnterFrame(J.currentEngine.onEnterFrame);
  };

  /**
   * Inspect application frame rate. Call window's requestAnimationFrame
   * @method onEnterFrameDebug
   */
  Engine.prototype.onEnterFrameDebug = function () {
    var thisRenderTime = new Date();
    J.currentEngine._frameRateText.text = (1000 / (thisRenderTime - J.currentEngine._lastRenderTime)).toFixed(1).toString() + " FPS";
    if (!J.currentEngine.paused) {

      // Update tweening engine
      J.TweenManager.update();

      // Update rendering
      J.currentEngine.render();
    }
    J.currentEngine._lastRenderTime = thisRenderTime;

    window.onEnterFrame(J.currentEngine.onEnterFrameDebug);
  };

  J.Engine = Engine;
})(Joy);
