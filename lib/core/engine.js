/**
 * @module Joy
 */

var Context2d = require('./context/context2d');

/**
 * Engine context. Start your application from here.
 *
 * @class Engine
 * @param {CanvasElement | Object} options
 * @constructor
 */
var Engine = function(options) {
  Joy.currentEngine = this;

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
    this.context = new Context2d({canvas: options.canvas});
  }

  // Create canvas and context, if it isn't set.
  if (!this.context) {
    var contextKlass = options.context || Context2d;
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
  if (typeof(Joy.Mouse) !== "undefined") {
    Joy.Mouse.enable(this);
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
          Joy.currentEngine.gotoScene(scene);
        });

      } else {
        this._currentSceneIndex = this.scenes.indexOf(scene);
        scene.visible = true;

        // Trigger scene active event
        scene.broadcast(Joy.Events.SCENE_ACTIVE, [scene]);
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
  this.setSceneLoader(Joy.Engine.defaultSceneLoader);

  // Parse <canvas> markup when it's not empty
  if (this.context.canvas.children.length > 0) {
    this.markup = new Joy.Markup(this).parse();
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
  var scene = new Joy.Scene({ctx: this.context.ctx});

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
  var scene = (typeof(obj) === "object") ? obj : new Joy.Scene({
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
  this._deltaTime = Joy.deltaTime;
  Joy.deltaTime = 0;
  this.paused = true;
};

/**
 * Resume if engine is paused.
 * @method resume
 */
Engine.prototype.resume = function() {
  Joy.deltaTime = this._deltaTime;
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
  if (!Joy.currentEngine.paused) {
    // Update tweening engine
    Joy.TweenManager.update();

    // Update rendering
    Joy.currentEngine.render();
  }
  window.onEnterFrame(Joy.currentEngine.onEnterFrame);
};

/**
 * Inspect application frame rate. Call window's requestAnimationFrame
 * @method onEnterFrameDebug
 */
Engine.prototype.onEnterFrameDebug = function () {
  var thisRenderTime = new Date();
  Joy.currentEngine._frameRateText.text = (1000 / (thisRenderTime - Joy.currentEngine._lastRenderTime)).toFixed(1).toString() + " FPS";
  if (!Joy.currentEngine.paused) {

    // Update tweening engine
    Joy.TweenManager.update();

    // Update rendering
    Joy.currentEngine.render();
  }
  Joy.currentEngine._lastRenderTime = thisRenderTime;

  window.onEnterFrame(Joy.currentEngine.onEnterFrameDebug);
};

//
// Default scene loader
// You may override this function to use your own scene loader.
//
Engine.defaultSceneLoader = function (scene) {
  // Joy.js logo, used on default loader
  var joyLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABkCAMAAADjVt21AAADAFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJBwYjGxnlTCblTCblTCblTSflTSblTijlTijlTyjlTynlUSrlUSvmUy7lUy3lVS/mVzHmWDLnWjbmXDbnYD3oYT3oYTrrYjTvYyzqYzrtYzCCZF3oZELoZUPoZELqbUzqdFXreFrre13sfF/sgGXsg2fthmztiW+zjILtjHPujnXuknrvln/vmYLwnIfxoIvxo47xpZHyqJXYqZ3yqpfyrZvzr57zs6L0tqb0uqvuvK7yv7L2w7b0w7b2xbn2xrr2x7vs7/Dt8PHw8vL19vb7+/v+/v7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/fz//v7+/v7s8vTs8/Xs8/Xs8vTs8fP47uvs7e3s7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozz497y3NTx187w0cfxy77xwK/xtJ/vq5Xuo4rsnobsl33sk3ftj3DsiWnuhF/sfFbsc0vrbUTyaC3yaC7yaC3yaC7pZ0DyZyvyZirxZizzZSjxZCjxZCjxZCjxZCjyZSnyZSjxZCryZSjxZCjxZCjxZCjxZCjzZSjzZSjzZSjxZSnwYinwYSfwYSjxYCPwYCTwYCbxXyDxXyLxXR3xXR7xXh/vXCDxXB3uWyLsWibrWSbrWCfqVyfpViboUyToUCLlTiflTiblTiblTiblTiblTSblTSblTSblTSblTSblTSblTSblTSblTSblTSblTSblTSblTCbkTCblTCblTCblTCXlTCXlTCTlSyTlSyPmSx/lSiPlSiLlSSLkSSHlSR7kSCDkSCDkRx/kRh7kRh3lRh3kRh7kRRzlRRzkRBzlRBvlRBtkxwbdAAAAeXRSTlMAAAAAAAAAAAAAAAECX19fX2Bk/mL+/Px3+vtx+pD9qoT97Pnh8ga/ydKYpaShnpaQiIAHeHNpYVpTS0Q+NgcyLCYiHRoHBxQHDwgM/vrR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";

  var percentageTween, logo, text,
      data = {percentage: 0},
      engine = this;

  scene.background("#000");

  text = new Joy.Text({
    x: engine.width / 2,
    y: engine.height / 2,
    text: "0%",
    align: "center",
    font: "30pt Courier New, monospace",
    color: "#fff",
    alpha: 0,
    baseline: Joy.Text.BASELINE.MIDDLE

  }).bind(Joy.Events.UPDATE, function() {
    var that = this;

    if (data.percentage !== scene.loader.percentage) {
      if (percentageTween) {percentageTween.stop();}
      data.percentage = scene.loader.percentage;

      percentageTween = Joy.Tween({
        percentage: parseInt(that.text, 10)
      }, 1000).easing(Joy.TweenManager.Easing.Quadratic.Out).to({
        percentage: scene.loader.percentage
      }).onUpdate(function() {
        that.text = parseInt(this.percentage, 10) + "%";
      }).start();
    }
  });

  logo = new Joy.Sprite(joyLogo).bind('load', function () {
    this.alpha = 0;
    this.position.x = engine.width / 2;
    this.position.y = engine.height / 2;
    this.pivot.x += this.width / 2;
    this.pivot.y += this.height / 2;

    Joy.Tween(this.position).
      to({x: this.position.x - 50}).
      easing(Joy.TweenManager.Easing.Quadratic.Out).
      start();

    Joy.Tween(this, 1000).
      to({alpha: 1}).
      easing(Joy.TweenManager.Easing.Quadratic.Out).
      start();

    Joy.Tween(text, 1000).
      to({alpha: 1}).
      easing(Joy.TweenManager.Easing.Quadratic.Out).
      start();

    Joy.Tween(text.position, 3000).
      to({x: text.position.x + 50}).
      easing(Joy.TweenManager.Easing.Quadratic.Out).
      start();
  });

  scene.addChild(logo);
  scene.addChild(text);
};

module.exports = Engine;
