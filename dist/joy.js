(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * joy.js v0.3.0
 * http://joyjs.org
 *
 * @copyright 2012-2014 Endel Dreyer
 * @license MIT
 */

var Joy = require('./joy.js');

// Core
Joy.Engine = require('./core/engine.js');
Joy.Support = require('./core/support.js');
Joy.Triggerable = require('./core/triggerable.js');

// Math
require('./math/math');
Joy.Vector2d = require('./math/vector2d');
Joy.Matrix2d = require('./math/matrix2d');
Joy.Range = require('./math/range');

// Collider
Joy.RectCollider = require('./collider/rect_collider.js');
Joy.TilemapCollider = require('./collider/tilemap_collider.js');

// Render
Joy.DisplayObject = require('./render/display_object.js');
Joy.DisplayObjectContainer = require('./render/display_object_container.js');
Joy.Font = require('./render/font.js');
Joy.Parallax = require('./render/parallax.js');
Joy.ParticleEmitter = require('./render/particle_emitter.js');
Joy.Scene = require('./render/scene.js');
Joy.Sprite = require('./render/sprite.js');
Joy.SpriteAnimation = require('./render/sprite_animation.js');
Joy.SpriteSheet = require('./render/sprite_sheet.js');
Joy.Text = require('./render/text.js');
Joy.Tilemap = require('./render/tilemap.js');
Joy.Tileset = require('./render/tileset.js');
Joy.Viewport = require('./render/viewport.js');

// Geom
Joy.Rect = require('./geom/rect');
Joy.Circle = require('./geom/circle');

// Consts
Joy.CompositeOperation = require('./consts/composite_operation.js');
Joy.Events = require('./consts/events.js');

// Util
Joy.Color = require('./util/color.js');
Joy.Loader = require('./util/loader.js');
Joy.Shader = require('./util/shader.js');
Joy.Utils = require('./util/utils.js');

// Input
Joy.Keyboard = require('./input/keyboard');
Joy.Mouse = require('./input/mouse');
Joy.Touch = require('./input/touch');

// Behaviours / built-in
Joy.Behaviour = require('./behaviour/behaviour');
require('./behaviour/movimentation');
require('./behaviour/button');
require('./behaviour/particle');

// Misc
Joy.Markup = require('./init/markup');

// Third-party modules
Joy.Sound = require('./modules/sound.js');
Joy.Tween = require('./modules/tween.js');

if (module && module.exports) { module.exports = Joy; }
if (typeof(window) !== "undefined") { window.Joy = Joy; }

},{"./behaviour/behaviour":2,"./behaviour/button":3,"./behaviour/movimentation":4,"./behaviour/particle":5,"./collider/rect_collider.js":6,"./collider/tilemap_collider.js":7,"./consts/composite_operation.js":8,"./consts/events.js":9,"./core/engine.js":12,"./core/support.js":13,"./core/triggerable.js":14,"./geom/circle":15,"./geom/rect":16,"./init/markup":17,"./input/keyboard":18,"./input/mouse":19,"./input/touch":20,"./joy.js":21,"./math/math":22,"./math/matrix2d":23,"./math/range":24,"./math/vector2d":25,"./modules/sound.js":26,"./modules/tween.js":27,"./render/display_object.js":28,"./render/display_object_container.js":29,"./render/font.js":30,"./render/parallax.js":31,"./render/particle_emitter.js":32,"./render/scene.js":33,"./render/sprite.js":34,"./render/sprite_animation.js":35,"./render/sprite_sheet.js":36,"./render/text.js":37,"./render/tilemap.js":38,"./render/tileset.js":39,"./render/viewport.js":40,"./util/color.js":41,"./util/loader.js":42,"./util/shader.js":43,"./util/utils.js":44}],2:[function(require,module,exports){
/**
 * @module Joy.Behaviour
 */
var Class = require('../core/class');
var Behaviour = Class.extend({});

/**
 * @property behaviours
 * @type {Array}
 * @static
 */
Behaviour.behaviours = {};

/**
 * Define a behaviour globally
 * @method define
 * @param {String} name
 * @param {Object} object
 * @static
 */
Behaviour.define = function (id, object) {
  this.behaviours[id] = Behaviour.extend(object);
  this.behaviours[id].id = id;
  return this.behaviours[name];
};

/**
 * Get a behaviour reference
 * @method define
 * @param {String} id
 * @return {Behaviour}
 * @static
 */
Behaviour.get = function (id) {
  return this.behaviours[id];
};

module.exports = Behaviour;

},{"../core/class":10}],3:[function(require,module,exports){
/**
 * @module Joy.Behaviour
 */
 var Behaviour = require('./behaviour');
 var Mouse = require('../input/mouse');
 var Events = require('../consts/events');

/**
 * Built-in behaviour that handles OVER/OUT/CLICK events from mouse.
 * May be appended to any DisplayObject, by `behave` method.
 *
 * @class Button
 * @constructor
 *
 * @example
 *     play = new Joy.DisplayObject(...);
 *
 *     // Append Button behavior into a HUD instance.
 *     play.behave(Joy.Behaviour.Button);
 *
 *     // Bind event handlers
 *     play.bind(Joy.Events.CLICK, function() {
 *       console.log("Mouse is mine!");
 *     })
 *     play.bind(Joy.Events.MOUSE_OVER, function() {
 *       console.log("Mouse is mine!");
 *     })
 *     play.bind(Joy.Events.MOUSE_OUT, function() {
 *       console.log("Mouse is leaving me!");
 *     })
 */

Behaviour.define('button', {
  INIT: function (options) {
    /**
     * @attribute isOver
     * @type {Boolean}
     */
    this.isOver = false;
  },

  UPDATE: function () {
    var isOver = Mouse.isOver(this);

    if (isOver && !this.isOver) {
      this.trigger(Events.MOUSE_OVER);
    } else if (!isOver && this.isOver) {
      this.trigger(Events.MOUSE_OUT);
    }

    this.isOver = isOver;
  }
});

},{"../consts/events":9,"../input/mouse":19,"./behaviour":2}],4:[function(require,module,exports){
/**
 * @module Joy.Behaviour
 */

var Behaviour = require('./behaviour');
var Vector2d = require('../math/vector2d');
var Utils = require('../util/utils');
var Joy = require('../joy');

/**
 * Built-in behaviour that have acceleration / friction / velocity control.
 * May be appended to any DisplayObject, by `DisplayObject#behave` method.
 *
 * @class Movimentation
 * @constructor
 *
 * @example
 *     player = new Joy.DisplayObject(...);
 *
 *     // Append movimentation behaviour to DisplayObject
 *     player.behave('Movimentation');
 *
 *     // Configure attributes
 *     player.maxVelocity.x = 8;
 *     player.acceleration.x = 2;
 *     player.friction.x = 1;
 *
 */

Behaviour.define('movimentation', {
  INIT: function (options) {
    /**
     * Current object's velocity
     * @attribute velocity
     * @type {Vector2d}
     * @readOnly
     */
    this.velocity = new Vector2d();

    /**
     * @attribute maxVelocity
     * @type {Vector2d}
     * @default Vector2d(500,500)
     */
    this.maxVelocity = new Vector2d(500, 500);

    /**
     * Normalized velocity vector, with x/y values between -1 and 1.
     * @attribute direction
     * @type {Vector2d}
     * @readonly
     */
    Object.defineProperty(this, 'direction', {
      get: function () {
        return this.velocity.normalized;
      },
      configurable: true
    });

    /**
     * Acceleration by frame, in pixels.
     *
     * @attribute acceleration
     * @type {Vector2d}
     */
    this.acceleration = new Vector2d();

    /**
     * Friction for velocity.
     *
     * @attribute friction
     * @type {Vector2d}
     */
    this.friction = new Vector2d();
  },

  UPDATE: function () {
    if (this.friction.x) {
      this.velocity.x = Utils.applyFriction(this.velocity.x, this.friction.x);
    }

    if (this.friction.y) {
      this.velocity.y = Utils.applyFriction(this.velocity.y, this.friction.y);
    }

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    if (this.velocity.x !== 0) {
      this.velocity.x = Math.clamp(this.velocity.x, -this.maxVelocity.x, this.maxVelocity.x);
    }

    if (this.velocity.y !== 0) {
      this.velocity.y = Math.clamp(this.velocity.y, -this.maxVelocity.y, this.maxVelocity.y);
    }

    this.position.x += this.velocity.x * Joy.deltaTime;
    this.position.y += this.velocity.y * Joy.deltaTime;
  }
});

},{"../joy":21,"../math/vector2d":25,"../util/utils":44,"./behaviour":2}],5:[function(require,module,exports){
/**
 * module Joy
 */
var Behaviour = require('./behaviour');
var Vector2d = require('../math/vector2d');
var Range = require('../math/range');
var Tween = require('../modules/tween');

function parseProperties(parent, props) {
  var properties = {};

  // Position
  properties.position = new Vector2d();
  properties.position.x = parent.position.x + Range.parse((props.position && props.position.x) || {}).randomInt();
  properties.position.y = parent.position.y + Range.parse((props.position && props.position.y) || {}).randomInt();

  // Scale
  properties.scale = new Vector2d();
  properties.scale.x = Range.parse((props.scale && props.scale.x) || parent.scale.x).randomInt();
  properties.scale.y = Range.parse((props.scale && props.scale.y) || parent.scale.y).randomInt();

  // Other attributes
  properties.alpha = Range.parse(typeof(props.alpha)==="undefined" ? parent.alpha : props.alpha).randomInt();
  properties.rotation = Range.parse(typeof(props.rotation)==="undefined" ? parent.rotation : props.rotation).randomInt();

  return properties;
}

Behaviour.define('particle', {
  init: function (options) {
    this.particleOptions = options;
  },

  ADDED: function () {
    var lastTween,
        start = parseProperties(this.particleOptions.emitter, this.particleOptions.start || {}),
        end = parseProperties(this.particleOptions.emitter, this.particleOptions.end || {});


    for (var prop in start) {
      this[prop] = start[prop];
      if (typeof(end[prop])==="object") {
        Tween(start[prop], this.particleOptions.ttl * 1000).to(end[prop]).start();
        delete end[prop];
      }
    }

    // When last tween complete, destroy the particle.
    Tween(this, this.particleOptions.ttl * 1000).to(end).onComplete(this.destroy).start();
  }

});

},{"../math/range":24,"../math/vector2d":25,"../modules/tween":27,"./behaviour":2}],6:[function(require,module,exports){
/**
 * @module Joy
 */
var Utils = require('../util/utils');

/**
 * @class RectCollider
 * @param {Vector2d} position
 * @param {Number} width
 * @param {Number} height
 * @constructor
 */
var RectCollider = function(position, width, height) {
  this.id = Utils.generateUniqueId();
  this.position = position;
  this.collidePosition = this.position.clone();
  this.width = width;
  this.height = height;
};

RectCollider.prototype.updateColliderPosition = function(position) {
  this.collidePosition.x = position.x + this.position.x;
  this.collidePosition.y = position.y + this.position.y;
};

RectCollider.prototype.renderStroke = function(ctx) {
  ctx.strokeStyle = "red";
  ctx.strokeRect(this.collidePosition.x, this.collidePosition.y, this.width, this.height);
};

/**
 * Is this DisplayObject colliding with {Object}?
 * @param {DisplayObject, Circle, Rectangle}
 * @return {Boolean} is colliding
 */
RectCollider.prototype.collide = function(collider) {
  return !(
    this.collidePosition.x      >= collider.collidePosition.x + collider.width  ||
    collider.collidePosition.x  >= this.collidePosition.x + this.width          ||
    this.collidePosition.y      >= collider.collidePosition.y + collider.height ||
    collider.collidePosition.y  >= this.collidePosition.y + this.height
  );
};

/**
 * @method clone
 * @return {RectCollider}
 */
RectCollider.prototype.clone = function() {
  return new RectCollider(this.position.clone(), this.width, this.height);
};

module.exports = RectCollider;

},{"../util/utils":44}],7:[function(require,module,exports){
/**
 * @module Joy
 */

var RectCollider = require('./rect_collider');
var Vector2d = require('../math/vector2d');

/**
 * @class TilemapCollider
 * @param {Tilemap} tilemap
 * @constructor
 */
var TilemapCollider = function(tilemap) {
  this.blocks = [];

  for (var i=0, length=tilemap.data.length; i<length; ++i) {
    if (tilemap.data[i] === 0) { continue; }

    this.blocks.push(new RectCollider(new Vector2d(tilemap.tileset.tileWidth * (i % tilemap.columns), tilemap.tileset.tileHeight * ((i / tilemap.columns) >> 0)),
                                          tilemap.tileset.tileWidth,
                                          tilemap.tileset.tileHeight));
  }

  this.length = this.blocks.length;
};

TilemapCollider.prototype.collide = function(collider) {
  for (var i=0; i<this.length; ++i) {
    if (!( this.blocks[i].collidePosition.x  >= collider.collidePosition.x + collider.width     ||
           collider.collidePosition.x        >= this.blocks[i].collidePosition.x + this.blocks[i].width  ||
           this.blocks[i].collidePosition.y  >= collider.collidePosition.y + collider.height    ||
           collider.collidePosition.y        >= this.blocks[i].collidePosition.y + this.blocks[i].height)) {
      return true;
    }
  }
  return false;
};

TilemapCollider.prototype.renderStroke = function(ctx) {
  for (var i=0; i<this.length; ++i) {
    ctx.strokeRect(this.blocks[i].position.x, this.blocks[i].position.y, this.blocks[i].width, this.blocks[i].height);
  }
};

module.exports = TilemapCollider;

},{"../math/vector2d":25,"./rect_collider":6}],8:[function(require,module,exports){
/**
* @module Joy
*/

/**
 * Used on `DisplayObject#composite`
 * @class CompositeOperation
 * @static
 */
var CompositeOperation = {
  /**
   * @attribute SOURCE_OVER
   * @static
   * @final
   * @type {String}
   */
  SOURCE_OVER: 'source-over',

  /**
   * @attribute SOURCE_IN
   * @static
   * @final
   * @type {String}
   */
  SOURCE_IN: 'source-in',

  /**
   * @attribute SOURCE_OUT
   * @static
   * @final
   * @type {String}
   */
  SOURCE_OUT: 'source-out',

  /**
   * @attribute SOURCE_ATOP
   * @static
   * @final
   * @type {String}
   */
  SOURCE_ATOP: 'source-atop',

  /**
   * @attribute LIGHTER
   * @static
   * @final
   * @type {String}
   */
  LIGHTER: 'lighter',

  /**
   * @attribute XOR
   * @static
   * @final
   * @type {String}
   */
  XOR: 'xor',

  /**
   * @attribute DESTINATION_OVER
   * @static
   * @final
   * @type {String}
   */
  DESTINATION_OVER: 'destination-over',

  /**
   * @attribute DESTINATION_IN
   * @static
   * @final
   * @type {String}
   */
  DESTINATION_IN: 'destination-in',

  /**
   * @attribute DESTINATION_OUT
   * @static
   * @final
   * @type {String}
   */
  DESTINATION_OUT: 'destination-out',

  /**
   * @attribute DESTINATION_ATOP
   * @static
   * @final
   * @type {String}
   */
  DESTINATION_ATOP: 'destination-atop',

  /**
   * @attribute DESTINATION_COPY
   * @static
   * @final
   * @type {String}
   */
  DESTINATION_COPY: 'copy'
};

module.exports = CompositeOperation;

},{}],9:[function(require,module,exports){
/**
 * @module Joy
 */

var Events = {
  /**
   * Triggered when DisplayObject is initialized.
   * @attribute Events.INIT
   * @type {String}
   * @static
   * @readonly
   */
  INIT: 'init',

  /**
   * Triggered when scene is loaded.
   * @attribute Events.SCENE_ACTIVE
   * @type {String}
   * @static
   * @readonly
   */
  SCENE_ACTIVE: 'sceneActive',

  /**
   * Triggered when DisplayObject is added into DisplayObjectContainer.
   * @attribute Events.ADDED
   * @type {String}
   * @static
   * @readonly
   */
  ADDED: 'added',

  /**
   * Triggered when DisplayObject is removed from DisplayObjectContainer.
   * @attribute Events.REMOVED
   * @type {String}
   * @static
   * @readonly
   */
  REMOVED: 'removed',

  /**
   * Triggered at every frame.
   * @attribute Events.UPDATE
   * @type {String}
   * @static
   * @readonly
   */
  UPDATE: 'update',

  /**
   * Triggered on collision update.
   * @attribute Events.COLLISION
   * @type {String}
   * @static
   * @readonly
   */
  COLLISION: 'collision',

  /**
   * Triggered at the moment collision starts.
   * @attribute Events.COLLISION_START
   * @type {String}
   * @static
   * @readonly
   */
  COLLISION_ENTER: 'collisionEnter',

  /**
   * Triggered at the moment collision ends.
   * @attribute Events.COLLISION_EXIT
   * @type {String}
   * @static
   * @readonly
   */
  COLLISION_EXIT: 'collisionExit'
};

module.exports = Events;

},{}],10:[function(require,module,exports){
/**
 * Simple JavaScript Inheritance - http://ejohn.org/blog/simple-javascript-inheritance/
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 *
 */
// Inspired by base2 and Prototype

/*jshint loopfunc:true*/
var initializing = false, fnTest = /xyz/.test(function(){'xyz';}) ? /\b_super\b/ : /.*/;

// The base Class implementation (does nothing)
var Class = function(){};

// Create a new Class that inherits from this class
Class.extend = function(prop) {
  var _super = this.prototype;

  // Instantiate a base class (but only create the instance,
  // don't run the init constructor)
  initializing = true;
  var prototype = new this();
  initializing = false;

  // Copy the properties over onto the new prototype
  for (var name in prop) {
    // Check if we're overwriting an existing function
    prototype[name] = typeof prop[name] == "function" &&
      typeof _super[name] == "function" && fnTest.test(prop[name]) ?
      (function(name, fn){
      return function() {
        var tmp = this._super;

        // Add a new ._super() method that is the same method
        // but on the super-class
        this._super = _super[name];

        // The method only need to be bound temporarily, so we
        // remove it when we're done executing
        var ret = fn.apply(this, arguments);
        this._super = tmp;

        return ret;
      };
    })(name, prop[name]) :
      prop[name];
  }

  // The dummy class constructor
  function Class() {
    // All construction is actually done in the init method
    if ( !initializing && this.init )
      this.init.apply(this, arguments);
  }

  // Populate our constructed prototype object
  Class.prototype = prototype;

  // Enforce the constructor to be what we expect
  Class.prototype.constructor = Class;

  // And make this class extendable
  Class.extend = arguments.callee;

  return Class;
};

module.exports = Class;

},{}],11:[function(require,module,exports){
/**
 * @module Joy
 */

/**
 * @class Context2d
 * @constructor
 * @param {Object} options
 */
var Context2d = function(options) {
  this.setCanvas(options.canvas);
};

Context2d.prototype.setCanvas = function(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  return this;
};

/**
 * Clears the entire screen.
 * @method clear
 */
Context2d.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  return this;
};

/**
 * Render everything in the buffer to the screen.
 * @method render
 */
Context2d.prototype.render = function (scenes) {
  this.clear();
  for (var i = 0, len = scenes.length; i < len; ++i) {
    if (!scenes[i].visible) { continue; }
    scenes[i].render();
  }
};

// Exports Context2d module
module.exports = Context2d;

},{}],12:[function(require,module,exports){
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
  var joyLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABkCAMAAADjVt21AAADAFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJBwYjGxnlTCblTCblTCblTSflTSblTijlTijlTyjlTynlUSrlUSvmUy7lUy3lVS/mVzHmWDLnWjbmXDbnYD3oYT3oYTrrYjTvYyzqYzrtYzCCZF3oZELoZUPoZELqbUzqdFXreFrre13sfF/sgGXsg2fthmztiW+zjILtjHPujnXuknrvln/vmYLwnIfxoIvxo47xpZHyqJXYqZ3yqpfyrZvzr57zs6L0tqb0uqvuvK7yv7L2w7b0w7b2xbn2xrr2x7vs7/Dt8PHw8vL19vb7+/v+/v7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/fz//v7+/v7s8vTs8/Xs8/Xs8vTs8fP47uvs7e3s7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozz497y3NTx187w0cfxy77xwK/xtJ/vq5Xuo4rsnobsl33sk3ftj3DsiWnuhF/sfFbsc0vrbUTyaC3yaC7yaC3yaC7pZ0DyZyvyZirxZizzZSjxZCjxZCjxZCjxZCjyZSnyZSjxZCryZSjxZCjxZCjxZCjxZCjzZSjzZSjzZSjxZSnwYinwYSfwYSjxYCPwYCTwYCbxXyDxXyLxXR3xXR7xXh/vXCDxXB3uWyLsWibrWSbrWCfqVyfpViboUyToUCLlTiflTiblTiblTiblTiblTSblTSblTSblTSblTSblTSblTSblTSblTSblTSblTSblTSblTCbkTCblTCblTCblTCXlTCXlTCTlSyTlSyPmSx/lSiPlSiLlSSLkSSHlSR7kSCDkSCDkRx/kRh7kRh3lRh3kRh7kRRzlRRzkRBzlRBvlRBtkxwbdAAAAeXRSTlMAAAAAAAAAAAAAAAECX19fX2Bk/mL+/Px3+vtx+pD9qoT97Pnh8ga/ydKYpaShnpaQiIAHeHNpYVpTS0Q+NgcyLCYiHRoHBxQHDwgM/vrRn1QvycTAua+mn5aMhnlxbmlmYFpRSUEyKiIfHBUcIuLm6/nc9/Xy79fSI5QIfgAAAAZ0RVh0VGl0bGUAqO7SJwAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAAB3RFWHRFLW1haWwAfQib1QAAAAR0RVh0VVJMAHij0w8AAAjpSURBVFjD7ZhNTBtJFsd96eNIc3EQCLECcbHIBIj4Dihh+Aiwc8gQ8+FAkgnhM5YmDFkSria0LIeDDxiMvwBje5FYFk67Pq1DIHFstTJZEubsKy3swfG22pasbbaqutvd7bYxLNGe9h1sNy7/eO9V/evVKwXGWd/U1NQweB/pmwSmvoNhXfBPvV0Ydge8T/3ID8SGwNMAeOuGA1/cG0d/VPDfdut0uscYNqjjrK8LG4bvQ5h2Cj6mMNgD8NiPDfADn41KOHcR54EuZf0Y1gveZrCH4HV6QuDAZ83EL/w4tVbGGdY+h7/p1zyFA0awiWnw9mAGvNzHpJx7Q+Dl59HRhzOTE5iMMwK/fQ78nIChaIQoX3Rl4jzrHRyZeIJl4GjYeDDsPvjQjWHaFyznMYZlieupZlzOGe4DLwPw6Q7MTAeGPUaDe7F0Tj82NMn5+nRMwlFDf+AkqOETdKwHfuiBkY5LOD+xTj952PMcgTQpztg9LZrckRH493tPtA+e8bmFP7oLP4xqNJr7WNfACPofGuxR7ximHe3h/x/gdIz8rJtCiRjvgnOjm0YuT2r5IBAHJrZb26ubRkN+GvsTCFwzMMMnFHCeTPNLrwMb5aPW/TKMSTgwYz393JeT4zPCQhvh/XnExnkXTuFoN/vlDItBEzfD+3N3jP355DA20sNN2POHwnyND/aoe4fYNdI1rFGr++9ouaSODg4ODqEcog/aR33qnkG09H580KdW994fT1s/l7T/c/5HnG+/+fby9k2dojQWurzRZQoV9RU48XLFVfpr+FOlKE98DU6N4npuf47OMjQiVq+oyZ2fg49nmBIMII8aFfU55+vow9Z2Vts6AB4d591SNJJkTs62L7t9ApxIYYvipvJynEPAOSnpVHyfH07/4TGVZJJ05Dycnde/wTSr2hSdJVEpJcKENl3OdXceE8vN2X4DR1AqTNGmkiY6mbdqXjDgeuOivYghc3LeHiFZAL1LhcG4lnDDvBGYATetJcK5OB8Q5xrglIkXIuM06o28/YDb6ePzcBKVgPOdiJN0GX8wigxfYXJwPiJ/qgGnQuCElUt6McY4v+Chz+bAZRiiagGnWuAwa7hRarg1cQ7OSQPg1KXmiyTN+jTO/EJxTMLx+glggT3+GXLIwybAEYRBFS/Mp3GMeicj4niDfveKzWpb8wT8giyO85sB59aVY46TcBnSMUbccSpw9oPO5TlU1V9Z3IRXkEUr4LQU8ApIruvlHJvgz97fLMIpY9Ye8PKyKG0DnM6Sk9SsZ/DHnvJn37esE5st6N3hZQE4gjAojzw/+Brvjzdo0Ulthdh+w8kC1sGUMMDykTvkoTlOwJmG0b3y7L/lZAE5gjAYR/r60VtiJMvx+s3pHJ31PS8LyBGEESsypTlkcCW5deh3z8k4po1fOVlATmVCJFN8Pn05cxzCIcPoXro+I1nUIU6VIAwy4cBFQsUtymiKY5VzdE7EiTQgTq1oIwsnVxc4l+Zxg/WQCp3JWfudkwXkNIg3VpLZtJr0OLAFiyt5IuyHhC2TP//iZAE5TYdQYFGKkwfFFDkddodzk06I9+fAqhwz54b+RIAsIKc5D+yekSJPiGFiSLKxJAOMIiX1Ys8zK5+v18dIFl2I01oIBMas6M02ZzF1moiSmetXYFnGsROsLNoR54+lIEEJCw6KhMnicBXSDB3OwPG70heQ6c/7R5y8IKcdCOw4ZIYrcF6PG0yWVY8yyfDpEvZnwp6WnfUAK4ur3DkTCCxSsMivG8AyLlnXNg9Pk18k9cv7TjL1c2vv2WoRL+c44EgWLTKJF7IBTLvZvl4UO41HhP35H0HHKyGodcK3xVaL6xynIhGKFZvStwyYrmW7qyBx+unv/LZKeGyml9CXRcdGkK86VA3HARUjA4cNcX7Rsur+C9jYveyWSGy41tacbh+xm6oWsXqOU0tBpWfgoKKq18+arGuefSIIf+rb9QfeBznqDqoWZCPHaYiS0cJsHKNxAS7A2SXr+sY7wr8rKV/cYYzjAGGElWbDmRy0/4F0bQQJzhm+WkRKbnOcZnCUoi36nByWter2EoF9lnWIZNHOcVoLTzJsqZk5aLJAuvxEcJ+tOkgWiNMGhJGpBmbhILfMtvUNPwF3LqqM75tg5YlmnbCMHDbEleITThZs/6WiQySVNUHZOLCCnQKFV6Q4sPIwq/iFObPFFCcLllMOONkDy85ZTvKyYDmoVzm14xfluJK8LFgO6lUynX7O5ix9DvOyYDnskYyx4RfjrMNd/vjKrRTnBtpHowWLhotwLEEoi3BBS4pzU4k2UWZdfwHOK88elAXoUVIcvldJZowsM+elM8D3KCnObe5IdkIu4+fl2AjhMMZz2vkjGVVoxs/HsQS9qR5FuJdIHckSRUv4eTiWvV2fqFrwHOFIliiShZaBY93fT/U6VSKOqImn8yzSs5ScM2dnd3m26tSKONfjQhmO0eAIdBZn0cUewbf/maoWPEfSxJOnmxaDPhtn1vbXoKhHIUONIk6dtLekKdeyIRWdmDNr8RB8yUBVJ8zKguPcCEsPK2Qy4rKacLbDFDiLNrfQ6fh8SsgpbBFx5E08mQDHMqvZBEqqHp5X5uCO7CP20lv3KCsLjpOhiQdDGOawyO1cXXE4VtfdG3vEO6+kdfdBWXxhZcFxZE08fyMQiyeZ08/vA0H/rjetE9wSy4LjtJ91uyXvK3e2t31vfv0UEmTBc8663UrjAMbrDweHIfbqJ35Ncu9XRp+Ls7O943v78eA3/v4I+FMp4VxlcnJQMMARgQHt31USTvUVio4dZ+dsb+2AYJQhCSMci3/Jb5BwOprrvlMpafqEzHgf5XsjCQauryhN5asq6lvk96IdN6vLSk7ilGwpHaQHc0LTZElZbXNb1vvV1oYKVT5NS8/0EghYUlRh2fXGzpz3tM01ZaVAqhF5hCRw5IrqWl3Lee97O5uqVIWxuCTzESoeKSmrudV+wXvjlvpymHkUIhmj6XxV5Y3W/+7+ub0JZD5MR+jD0qu1zZe7x759o/IP1U3tuYb9B9Eohegx+UHyAAAAAElFTkSuQmCC";

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

},{"./context/context2d":11}],13:[function(require,module,exports){
/**
 * @module Joy
 */

var userAgent = navigator.userAgent;
var browserPrefix = ((userAgent.match(/opera/i) && "o") ||
                     (userAgent.match(/webkit/i) && "webkit") ||
                     (userAgent.match(/msie/i) && "ms") ||
                     (userAgent.match(/mozilla/i) && "moz") || "");

function prefix(name) {
  if (browserPrefix !== "") {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  return browserPrefix + name;
}

/*
 * Extend HTMLElement to support addEventListener method.
 */
if (typeof(window.addEventListener)!=="function") {
  HTMLElement.prototype.addEventListener = function (type, callback, useCapture) {
    attachEvent('on' + type, callback);
  };
}

/**
 * Browser support configuration and constants.
 * @class Support
 */
var Support = {
  /**
   * Device supports touch events?
   * @attribute touch
   * @type {Boolean}
   * @static
   * @readonly
   */
  touch: ('ontouchstart' in window),

  /**
   * Device supports Retina Display?
   * @attribute retina
   * @type {Boolean}
   * @static
   * @readonly
   */
  retina: window.devicePixelRatio > 1 || window.matchMedia('(min-resolution: 1.1dppx)').matches,

  /*
   * Misc / Interal use
   */
  'imageSmoothingEnabled' : prefix("imageSmoothingEnabled")
};

/**
 * window.onEnterFrame
 */
window.onEnterFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ) { window.setTimeout(callback, 1000 / 60); }; // TODO: use FPS rate from render module
})();

module.exports = Support;

},{}],14:[function(require,module,exports){
/**
 * @module Joy
 */

var Class = require('./class');
var Behaviour = require('../behaviour/behaviour');
var Events = require('../consts/events');

/**
 * Event triggering and handling.
 *
 * @class Triggerable
 * @constructor
 */
var Triggerable = Class.extend({
  init: function(options) {
    this._handlers = (options && options._handlers) || {};
    this._behaviours = (options && options._behaviours) || [];

    if (options && options.behaviour) {
      console.log(options.behaviour);
      this.behave(options.behaviour);
    }
  },

  /**
   * Behave like a {Behaviour}
   * @method behave
   * @param {String | Behaviour} behaviour
   * @return {Triggerable} this
   */
  behave: function (behaviourClass, options) {
    var i;

    // Split behaviours if string was given
    if (typeof(behaviourClass)==="string") {
      var last, behaviours = behaviourClass.split(",");
      for (i = 0, l = behaviours.length; i < l; i ++) {
        last = this.behave(Behaviour.get(behaviours[i].replace(" ", '')), options);
      }
      return last;
    }

    this._behaviours.push(behaviourClass.id);
    var behaviour = new behaviourClass(options);

    for (i in behaviour) {
      if (typeof(Events[i])==="string") {
        this.bind(Events[i], behaviour[i]);

      } else if (i !== "constructor") { // Deny 'constructor' method of being overwritten
        // Define methods on this instance
        this[i] = behaviour[i];
      }
    }
    return this;
  },

  /**
   * This object behaves as {target} behaviour?
   * @method hasBehaviour
   * @param {String} behaviourName
   * @return {Boolean}
   */
  hasBehaviour: function (behaviour) {
    return this._behaviours.indexOf(behaviour) >= 0;
  },

  /**
   * Bind event handler
   * @method bind
   * @param {String} type event type
   * @param {Function} handler
   * @return {Triggerable} this
   */
  bind: function (type, handler) {
    var data = handler;

    // Custom bind
    if (Triggerable._custom.bind[type] !== undefined) {
      data = { target: this, handler: handler };
      Triggerable._custom.bind[type].call(this, data);
    }

    // Register bind in the instance
    if (this._handlers[type] === undefined) {
      this._handlers[type] = [];
    }
    if (this._handlers[type].indexOf(data) === -1) {
      this._handlers[type].push(data);
    }
    return this;
  },

  /**
   * Remove event handlers
   * @method unbind
   * @param {String} type event type
   * @return {Triggerable} this
   */
  unbind: function (type) {
    // Custom unbind
    if (Triggerable._custom.unbind[type] !== undefined) {
      for (var i=0, length=this._handlers[type].length; i<length;++i) {
        Triggerable._custom.unbind[type].call(this, this._handlers[type][i]);
      }
    }

    // Unbind from this instance
    this._handlers[type] = null;
    return this;
  },

  /**
   * Triggers event type
   * @method trigger
   * @param {String} type event type
   * @param {Array} arguments arguments for callback
   * @param {Number} delay
   *  @optional
   */
  trigger: function (type, args, delay) {
    var handlers = this._handlers[type] || [];

    args = args || [];
    delay = delay || 0;

    for (var i = 0, length = handlers.length; i<length; ++i) {
      handlers[i].apply(this, args);
    }
  },

  broadcast: function (type, args, delay) {
    this.trigger(type, args, delay);
  }
});

Triggerable._custom = {
  'bind': {},
  'unbind' : {}
};

/**
 * Register default method handler.
 * @method register
 * @param {String} type
 * @param {Function} bindCallback
 * @param {Function} unbindCallback
 *
 * @static
 */
Triggerable.register = function(type, bindCallback, unbindCallback) {
  Triggerable._custom.bind[type] = bindCallback;
  Triggerable._custom.unbind[type] = unbindCallback;
  return this;
};

// 'init' is triggered right when it's binded.
Triggerable.register(Events.INIT, function(evt) {
  evt.handler.call(this);
});

// Exports module
module.exports = Triggerable;

},{"../behaviour/behaviour":2,"../consts/events":9,"./class":10}],15:[function(require,module,exports){
/**
 * @module Joy
 */
var DisplayObject = require('../render/display_object.js');

var Circle = DisplayObject.extend({
  /**
   * @class Circle
   * @extends DisplayObject
   * @constructor
   *
   * @param {Object} options
   *   @param {Number} [options.radius]
   *   @param {Color, String} [options.color]
   */
  init: function (options) {
    this._super(options);
    this.radius = options.radius || 1;
    this.color = options.color || "#000";

    Object.defineProperty(this, 'width', {
      get: function () {
        return this.radius * 2 * this.scale.x;
      },
      configurable: true
    });

    Object.defineProperty(this, 'height', {
      get: function () {
        return this.radius * 2 * this.scale.y;
      },
      configurable: true
    });
  },

  render: function () {
    this.ctx.beginPath();
    this.ctx.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
});

module.exports = Circle;

},{"../render/display_object.js":28}],16:[function(require,module,exports){
/**
 * @module Joy
 */
var DisplayObject = require('../render/display_object.js');

var Rect = DisplayObject.extend({
  /**
   * @class Rect
   * @extends DisplayObject
   * @constructor
   *
   * @param {Object} options
   *   @param {Color, String} [options.color]
   */
  init: function(options) {
    this._super(options);

    /**
     * @attribute color
     * @type {String}
     */
    if (options.color) {
      this.colorize(options.color);
    }
  },

  /**
   * @method colorize
   * @param {Color | String} color
   * @return {Rect} this
   */
  colorize: function (color) {
    this.color = color.toString();
    return this;
  },

  render: function() {
    if (this.color) {
      this.ctx.fillStyle = this.color;
    }
    this.ctx.fillRect(0, 0, this._width, this._height);
  }
});

module.exports = Rect;

},{"../render/display_object.js":28}],17:[function(require,module,exports){
/**
 * TODO:
 *
 * module Joy
 */

var DisplayObject = require('../render/display_object');
var DisplayObjectContainer = require('../render/display_object_container');
var Sprite = require('../render/sprite');
var Text = require('../render/text');
var Sound = require('../modules/sound');

/**
 * Analyses HTML `canvas` tag contents, and add those childs
 * to Joy contexting pipeline.
 *
 * TODO: This feature is extremely experimental.
 *
 * class Markup
 * constructor
 */
var Markup = function(engine) {
  this.engine = engine;
  this.canvas = engine.context.canvas;

  /**
   * Hold element parsers by tag name.
   * By default, it handles IMG, LABEL, AUDIO
   *
   * @property parsers
   * @type {Object}
   */
  this.parsers = {
    IMG: function (el, dataset) {
      return new Sprite(dataset);
    },

    LABEL: function (el, dataset) {
      dataset.text = el.innerHTML;
      return new Text(dataset);
    },

    DIV: function (el, dataset) {
      var displayObject = new DisplayObjectContainer(dataset);
      var children = el.querySelectorAll('*');
      for (var i = 0, l = children.length; i < l; i ++) {
        displayObject.addChild( this.parsers[ children[i].tagName ].apply(this, [children[i], Markup.evaluateDataset(children[i])]) );
      }
      return displayObject;
    },

    AUDIO: function (el, dataset) {
      var audio = new Sound({});
      return new DisplayObject
    }
  };

};

Markup.prototype.parse = function(section) {
  var sections = this.canvas.querySelectorAll('section');

  if (sections.length === 0) {
    sections = [this.canvas];
  }

  for (var i=0;i<sections.length;i++) {
    this.createScene(sections[i]);
  }
};

Markup.prototype.createScene = function(section) {
  var i, length,
      children = [];

  var elements = section.querySelectorAll('*');
  for (i=0, length=elements.length;i<length; ++i) {
    if (this.parsers[elements[i].tagName]) {
      var el = this.parsers[elements[i].tagName].apply(this, [elements[i], Markup.evaluateDataset(elements[i])]);
      children.push(el);
    }
  }

  // Create scene on engine and append all children parsed
  var dataset = Markup.evaluateDataset(section);
  this.engine.createScene(function(scene) {
    // Expand dataset to call methods / assign properties
    for (var attr in dataset) {
      console.log(attr, dataset[attr]);
      if (typeof(scene[attr])==="function") {
        scene[attr](dataset[attr]);
      } else {
        scene[attr] = dataset[attr];
      }
    }

    for (i=0,length=children.length; i<length; ++i) {
      scene.addChild(children[i]);
    }
  });
};

Markup.evaluateDataset = function(el) {
  var value, matches, attr, attributeName,
      attributes = el.attributes,
      //width = this.canvas.width,
      //height = this.canvas.height,
      obj = {};

  for (var key in attributes) {
    attr = attributes[key];

    // Skip "length" attribute
    if (typeof(attr)!=="object") {
      continue;
    }

    value = (attr.value === '') ? true : attr.value;
    attributeName = attr.name;

    if (attributeName.indexOf('data-') === 0) {
      attributeName = attributeName.substr(5, attributeName.length);
    }

    matches = attr.value.match(/\{\{([^\}]*)\}\}/);
    if (matches) {
      // Replace expression by the evaluation of it.
      value = value.replace(value, eval(matches[1]));
    }

    obj[attributeName] = value;
  }

  return obj;
};

module.exports = Markup;

},{"../modules/sound":26,"../render/display_object":28,"../render/display_object_container":29,"../render/sprite":34,"../render/text":37}],18:[function(require,module,exports){
/**
 * @module Joy
 */

var Triggerable = require('../core/triggerable');
var Events = require('../consts/events');

/**
 * @class Keyboard
 * @static
 * @readonly
 */
var Keyboard = {
  /**
   * Enter keycode
   * @attribute ENTER
   * @type {Number}
   * @static
   * @final
   */
  ENTER:13,

  /**
   * SPACE keycode
   * @attribute SPACE
   * @type {Number}
   * @static
   * @final
   */
  SPACE:32,

  /**
   * BACKSPACE keycode
   * @attribute BACKSPACE
   * @type {Number}
   * @static
   * @final
   */
  BACKSPACE:8,

  /**
   * TAB keycode
   * @attribute TAB
   * @type {Number}
   * @static
   * @final
   */
  TAB:9,

  /**
   * SHIFT keycode
   * @attribute SHIFT
   * @type {Number}
   * @static
   * @final
   */
  SHIFT:16,

  /**
   * CTRL keycode
   * @attribute CTRL
   * @type {Number}
   * @static
   * @final
   */
  CTRL:17,

  /**
   * ALT keycode
   * @attribute ALT
   * @type {Number}
   * @static
   * @final
   */
  ALT:18,

  /**
   * PAUSE keycode
   * @attribute PAUSE
   * @type {Number}
   * @static
   * @final
   */
  PAUSE:19,

  /**
   * CAPSLOCK keycode
   * @attribute CAPSLOCK
   * @type {Number}
   * @static
   * @final
   */
  CAPSLOCK:20,

  /**
   * ESCAPE keycode
   * @attribute ESCAPE
   * @type {Number}
   * @static
   * @final
   */
  ESCAPE:27,

  /**
   * PAGEUP keycode
   * @attribute PAGEUP
   * @type {Number}
   * @static
   * @final
   */
  PAGEUP:33,

  /**
   * PAGEDOWN keycode
   * @attribute PAGEDOWN
   * @type {Number}
   * @static
   * @final
   */
  PAGEDOWN:34,

  /**
   * END keycode
   * @attribute END
   * @type {Number}
   * @static
   * @final
   */
  END:35,

  /**
   * HOME keycode
   * @attribute HOME
   * @type {Number}
   * @static
   * @final
   */
  HOME:36,

  /**
   * LEFT keycode
   * @attribute LEFT
   * @type {Number}
   * @static
   * @final
   */
  LEFT:37,

  /**
   * UP keycode
   * @attribute UP
   * @type {Number}
   * @static
   * @final
   */
  UP:38,

  /**
   * RIGHT keycode
   * @attribute RIGHT
   * @type {Number}
   * @static
   * @final
   */
  RIGHT:39,

  /**
   * DOWN keycode
   * @attribute DOWN
   * @type {Number}
   * @static
   * @final
   */
  DOWN:40,

  /**
   * INSERT keycode
   * @attribute INSERT
   * @type {Number}
   * @static
   * @final
   */
  INSERT:45,

  /**
   * DELETE keycode
   * @attribute DELETE
   * @type {Number}
   * @static
   * @final
   */
  DELETE:46,

  /**
   * KEY_0 keycode
   * @attribute KEY_0
   * @type {Number}
   * @static
   * @final
   */
  KEY_0:48,

  /**
   * KEY_1 keycode
   * @attribute KEY_1
   * @type {Number}
   * @static
   * @final
   */
  KEY_1:49,

  /**
   * KEY_2 keycode
   * @attribute KEY_2
   * @type {Number}
   * @static
   * @final
   */
  KEY_2:50,

  /**
   * KEY_3 keycode
   * @attribute KEY_3
   * @type {Number}
   * @static
   * @final
   */
  KEY_3:51,

  /**
   * KEY_4 keycode
   * @attribute KEY_4
   * @type {Number}
   * @static
   * @final
   */
  KEY_4:52,

  /**
   * KEY_5 keycode
   * @attribute KEY_5
   * @type {Number}
   * @static
   * @final
   */
  KEY_5:53,

  /**
   * KEY_6 keycode
   * @attribute KEY_6
   * @type {Number}
   * @static
   * @final
   */
  KEY_6:54,

  /**
   * KEY_7 keycode
   * @attribute KEY_7
   * @type {Number}
   * @static
   * @final
   */
  KEY_7:55,

  /**
   * KEY_8 keycode
   * @attribute KEY_8
   * @type {Number}
   * @static
   * @final
   */
  KEY_8:56,

  /**
   * KEY_9 keycode
   * @attribute KEY_9
   * @type {Number}
   * @static
   * @final
   */
  KEY_9:57,

  /**
   * KEY_A keycode
   * @attribute KEY_A
   * @type {Number}
   * @static
   * @final
   */
  KEY_A:65,

  /**
   * KEY_B keycode
   * @attribute KEY_B
   * @type {Number}
   * @static
   * @final
   */
  KEY_B:66,

  /**
   * KEY_C keycode
   * @attribute KEY_C
   * @type {Number}
   * @static
   * @final
   */
  KEY_C:67,

  /**
   * KEY_D keycode
   * @attribute KEY_D
   * @type {Number}
   * @static
   * @final
   */
  KEY_D:68,

  /**
   * KEY_E keycode
   * @attribute KEY_E
   * @type {Number}
   * @static
   * @final
   */
  KEY_E:69,

  /**
   * KEY_F keycode
   * @attribute KEY_F
   * @type {Number}
   * @static
   * @final
   */
  KEY_F:70,

  /**
   * KEY_G keycode
   * @attribute KEY_G
   * @type {Number}
   * @static
   * @final
   */
  KEY_G:71,

  /**
   * KEY_H keycode
   * @attribute KEY_H
   * @type {Number}
   * @static
   * @final
   */
  KEY_H:72,

  /**
   * KEY_I keycode
   * @attribute KEY_I
   * @type {Number}
   * @static
   * @final
   */
  KEY_I:73,

  /**
   * KEY_J keycode
   * @attribute KEY_J
   * @type {Number}
   * @static
   * @final
   */
  KEY_J:74,

  /**
   * KEY_K keycode
   * @attribute KEY_K
   * @type {Number}
   * @static
   * @final
   */
  KEY_K:75,

  /**
   * KEY_L keycode
   * @attribute KEY_L
   * @type {Number}
   * @static
   * @final
   */
  KEY_L:76,

  /**
   * KEY_M keycode
   * @attribute KEY_M
   * @type {Number}
   * @static
   * @final
   */
  KEY_M:77,

  /**
   * KEY_N keycode
   * @attribute KEY_N
   * @type {Number}
   * @static
   * @final
   */
  KEY_N:78,

  /**
   * KEY_O keycode
   * @attribute KEY_O
   * @type {Number}
   * @static
   * @final
   */
  KEY_O:79,

  /**
   * KEY_P keycode
   * @attribute KEY_P
   * @type {Number}
   * @static
   * @final
   */
  KEY_P:80,

  /**
   * KEY_Q keycode
   * @attribute KEY_Q
   * @type {Number}
   * @static
   * @final
   */
  KEY_Q:81,

  /**
   * KEY_R keycode
   * @attribute KEY_R
   * @type {Number}
   * @static
   * @final
   */
  KEY_R:82,

  /**
   * KEY_S keycode
   * @attribute KEY_S
   * @type {Number}
   * @static
   * @final
   */
  KEY_S:83,

  /**
   * KEY_T keycode
   * @attribute KEY_T
   * @type {Number}
   * @static
   * @final
   */
  KEY_T:84,

  /**
   * KEY_U keycode
   * @attribute KEY_U
   * @type {Number}
   * @static
   * @final
   */
  KEY_U:85,

  /**
   * KEY_V keycode
   * @attribute KEY_V
   * @type {Number}
   * @static
   * @final
   */
  KEY_V:86,

  /**
   * KEY_W keycode
   * @attribute KEY_W
   * @type {Number}
   * @static
   * @final
   */
  KEY_W:87,

  /**
   * KEY_X keycode
   * @attribute KEY_X
   * @type {Number}
   * @static
   * @final
   */
  KEY_X:88,

  /**
   * KEY_Y keycode
   * @attribute KEY_Y
   * @type {Number}
   * @static
   * @final
   */
  KEY_Y:89,

  /**
   * KEY_Z keycode
   * @attribute KEY_Z
   * @type {Number}
   * @static
   * @final
   */
  KEY_Z:90,

  /**
   * SELECT keycode
   * @attribute SELECT
   * @type {Number}
   * @static
   * @final
   */
  SELECT:93,

  /**
   * NUMPAD0 keycode
   * @attribute NUMPAD0
   * @type {Number}
   * @static
   * @final
   */
  NUMPAD0:96,

  /**
   * NUMPAD1 keycode
   * @attribute NUMPAD1
   * @type {Number}
   * @static
   * @final
   */
  NUMPAD1:97,

  /**
   * NUMPAD2 keycode
   * @attribute NUMPAD2
   * @type {Number}
   * @static
   * @final
   */
  NUMPAD2:98,

  /**
   * NUMPAD3 keycode
   * @attribute NUMPAD3
   * @type {Number}
   * @static
   * @final
   */
  NUMPAD3:99,

  /**
   * NUMPAD4 keycode
   * @attribute NUMPAD4
   * @type {Number}
   * @static
   * @final
   */
  NUMPAD4:100,

  /**
   * NUMPAD5 keycode
   * @attribute NUMPAD5
   * @type {Number}
   * @static
   * @final
   */
  NUMPAD5:101,

  /**
   * NUMPAD6 keycode
   * @attribute NUMPAD6
   * @type {Number}
   * @static
   * @final
   */
  NUMPAD6:102,

  /**
   * NUMPAD7 keycode
   * @attribute NUMPAD7
   * @type {Number}
   * @static
   * @final
   */
  NUMPAD7:103,

  /**
   * NUMPAD8 keycode
   * @attribute NUMPAD8
   * @type {Number}
   * @static
   * @final
   */
  NUMPAD8:104,

  /**
   * NUMPAD9 keycode
   * @attribute NUMPAD9
   * @type {Number}
   * @static
   * @final
   */
  NUMPAD9:105,

  /**
   * MULTIPLY keycode
   * @attribute MULTIPLY
   * @type {Number}
   * @static
   * @final
   */
  MULTIPLY:106,

  /**
   * ADD keycode
   * @attribute ADD
   * @type {Number}
   * @static
   * @final
   */
  ADD:107,

  /**
   * SUBTRACT keycode
   * @attribute SUBTRACT
   * @type {Number}
   * @static
   * @final
   */
  SUBTRACT:109,

  /**
   * DECIMALPOINT keycode
   * @attribute DECIMALPOINT
   * @type {Number}
   * @static
   * @final
   */
  DECIMALPOINT:110,

  /**
   * DIVIDE keycode
   * @attribute DIVIDE
   * @type {Number}
   * @static
   * @final
   */
  DIVIDE:111,

  /**
   * F1 keycode
   * @attribute F1
   * @type {Number}
   * @static
   * @final
   */
  F1:112,

  /**
   * F2 keycode
   * @attribute F2
   * @type {Number}
   * @static
   * @final
   */
  F2:113,

  /**
   * F3 keycode
   * @attribute F3
   * @type {Number}
   * @static
   * @final
   */
  F3:114,

  /**
   * F4 keycode
   * @attribute F4
   * @type {Number}
   * @static
   * @final
   */
  F4:115,

  /**
   * F5 keycode
   * @attribute F5
   * @type {Number}
   * @static
   * @final
   */
  F5:116,

  /**
   * F6 keycode
   * @attribute F6
   * @type {Number}
   * @static
   * @final
   */
  F6:117,

  /**
   * F7 keycode
   * @attribute F7
   * @type {Number}
   * @static
   * @final
   */
  F7:118,

  /**
   * F8 keycode
   * @attribute F8
   * @type {Number}
   * @static
   * @final
   */
  F8:119,

  /**
   * F9 keycode
   * @attribute F9
   * @type {Number}
   * @static
   * @final
   */
  F9:120,

  /**
   * F10 keycode
   * @attribute F10
   * @type {Number}
   * @static
   * @final
   */
  F10:121,

  /**
   * F11 keycode
   * @attribute F11
   * @type {Number}
   * @static
   * @final
   */
  F11:122,

  /**
   * F12 keycode
   * @attribute F12
   * @type {Number}
   * @static
   * @final
   */
  F12:123,

  /**
   * NUMLOCK keycode
   * @attribute NUMLOCK
   * @type {Number}
   * @static
   * @final
   */
  NUMLOCK:144,

  /**
   * SCROLLLOCK keycode
   * @attribute SCROLLLOCK
   * @type {Number}
   * @static
   * @final
   */
  SCROLLLOCK:145,

  /**
   * SEMICOLON keycode
   * @attribute SEMICOLON
   * @type {Number}
   * @static
   * @final
   */
  SEMICOLON:186,

  /**
   * EQUALSIGN keycode
   * @attribute EQUALSIGN
   * @type {Number}
   * @static
   * @final
   */
  EQUALSIGN:187,

  /**
   * COMMA keycode
   * @attribute COMMA
   * @type {Number}
   * @static
   * @final
   */
  COMMA:188,

  /**
   * DASH keycode
   * @attribute DASH
   * @type {Number}
   * @static
   * @final
   */
  DASH:189,

  /**
   * PERIOD keycode
   * @attribute PERIOD
   * @type {Number}
   * @static
   * @final
   */
  PERIOD:190,

  /**
   * FORWARDSLASH keycode
   * @attribute FORWARDSLASH
   * @type {Number}
   * @static
   * @final
   */
  FORWARDSLASH:191,

  /**
   * GRAVEACCENT keycode
   * @attribute GRAVEACCENT
   * @type {Number}
   * @static
   * @final
   */
  GRAVEACCENT:192,

  /**
   * OPENBRACKET keycode
   * @attribute OPENBRACKET
   * @type {Number}
   * @static
   * @final
   */
  OPENBRACKET:219,

  /**
   * BACKSLASH keycode
   * @attribute BACKSLASH
   * @type {Number}
   * @static
   * @final
   */
  BACKSLASH:220,

  /**
   * CLOSEBRAKET keycode
   * @attribute CLOSEBRAKET
   * @type {Number}
   * @static
   * @final
   */
  CLOSEBRAKET:221,

  /**
   * SINGLEQUOTE keycode
   * @attribute SINGLEQUOTE
   * @type {Number}
   * @static
   * @final
   */
  SINGLEQUOTE:222
};

/**
 * Events.KEY_DOWN
 * @type {String}
 * @static
 * @final
 */
Events.KEY_DOWN = 'onkeydown';

/**
 * Events.KEY_UP
 * @type {String}
 * @static
 * @final
 */
Events.KEY_UP = 'onkeyup';

/**
 * Events.KEY_PRESS
 * @type {String}
 * @static
 * @final
 */
Events.KEY_PRESS = 'key';

/**
 * @property repeatRate
 * @type {Number}
 * @default 1
 */
Keyboard.repeatRate = 1;
Keyboard.handlers = {};
Keyboard.timers = {};

function triggerKeyEvent(type, evt) {
  var i, length, handlers = Keyboard.handlers[type];

  for (i=0, length=handlers.length; i<length; ++i) {
    handlers[i].handler.apply(handlers[i].target, [evt]);
  }
}

[Events.KEY_DOWN, Events.KEY_UP, Events.KEY_PRESS].forEach(function(eventType) {
  Keyboard.handlers[eventType] = [];

  Triggerable.register(eventType, function(evt) {
    if (Keyboard.handlers[eventType].indexOf(evt) === -1) {
      Keyboard.handlers[eventType].push(evt);
    }
  }, function(evt) {
    var index = Keyboard.handlers[eventType].indexOf(evt);
    if (index !== -1) {
      Keyboard.handlers[eventType].splice(index, 1);
    }
  });
});

// Bind document key down
document.onkeydown = function(e) {
 var key = (e || window.event).keyCode;
  if (!Keyboard.timers[key]) {
    triggerKeyEvent(Events.KEY_DOWN, e);
    triggerKeyEvent(Events.KEY_PRESS, e);

    if (Keyboard.repeatRate !== 0) {
      Keyboard.timers[key] = setInterval(function() {
        triggerKeyEvent(Events.KEY_PRESS, e);
      }, Keyboard.repeatRate);
    }
  }
};

// Bind document key up
document.onkeyup = function(e) {
  var key = (e || window.event).keyCode;
  if (key in Keyboard.timers) {
    triggerKeyEvent(Events.KEY_UP, e);
    if (Keyboard.timers[key]) {
      clearInterval(Keyboard.timers[key]);
    }
    delete Keyboard.timers[key];
  }
};

module.exports = Keyboard;

},{"../consts/events":9,"../core/triggerable":14}],19:[function(require,module,exports){
/**
 * @module Joy
 */

var Joy = require('../joy.js');
var Triggerable = require('../core/triggerable');
var RectCollider = require('../collider/rect_collider');
var Vector2d = require('../math/vector2d');
var Events = require('../consts/events');

/**
 * @class Mouse
 * @static
 * @readonly
 */
var Mouse = {
  // Create a 1x1 collider
  collider: new RectCollider(new Vector2d(), 1, 1),

  lastEvent: null,

  updateColliderPosition: function (e) {
    Mouse.collider.position.x = e.offsetX * Joy.currentEngine.currentScene.viewport.scale.x;
    Mouse.collider.position.y = e.offsetY * Joy.currentEngine.currentScene.viewport.scale.y;
    Mouse.collider.updateColliderPosition(Joy.currentEngine.currentScene.viewport.position);
  },

  /**
   * @method isOver
   * @param {DisplayObject} displayObject
   * @static
   * @return {Booelan}
   */
  isOver: function (displayObject) {
    return displayObject.collider.collide(Mouse.collider);
  },

  enable: function(engine) {
    var triggerMouseEvents = function (e) {
      var handlers = Mouse.handlers[e.type];

      this.lastEvent = e;
      Mouse.updateColliderPosition(e);

      for (var i=0, length = handlers.length; i<length; ++i) {
        if ( handlers[i].target.visible && Mouse.isOver(handlers[i].target) ) {
          handlers[i].handler.apply(handlers[i].target, [e]);
        }
      }
    };

    // Bind all mouse events
    engine.context.canvas['on' + Events.CLICK] = triggerMouseEvents;
    engine.context.canvas['on' + Events.DOUBLE_CLICK] = triggerMouseEvents;
    engine.context.canvas['on' + Events.MOUSE_MOVE] = triggerMouseEvents;
    engine.context.canvas['on' + Events.MOUSE_DOWN] = triggerMouseEvents;
    engine.context.canvas['on' + Events.MOUSE_UP] = triggerMouseEvents;
  },

  handlers: {},
  timers: {}
};

/**
 * Events.MOUSE_DOWN
 * @type {String}
 * @static
 * @final
 */
Events.MOUSE_DOWN = 'mousedown';

/**
 * Events.MOUSE_UP
 * @type {String}
 * @static
 * @final
 */
Events.MOUSE_UP = 'mouseup';

/**
 * Events.MOUSE_MOVE
 * @type {String}
 * @static
 * @final
 */
Events.MOUSE_MOVE = 'mousemove';

/**
 * Events.CLICK
 * @type {String}
 * @static
 * @final
 */
Events.CLICK = 'click';

/**
 * Events.DOUBLE_CLICK
 * @type {String}
 * @static
 * @final
 */
Events.DOUBLE_CLICK = 'dblclick';

/**
 * TODO: not implemented yet
 *       only available attaching Joy.Behaviour.Button behaviour
 *
 * Events.MOUSE_OVER
 * @type {String}
 * @static
 * @final
 */
Events.MOUSE_OVER = 'mouseover';

/**
 * TODO: not implemented yet
 *       only available attaching Joy.Behaviour.Button behaviour
 *
 * Events.MOUSE_OUT
 * @type {String}
 * @static
 * @final
 */
Events.MOUSE_OUT = 'mouseout';

[Events.CLICK, Events.DOUBLE_CLICK, Events.DOUBLE_CLICK, Events.MOUSE_MOVE, Events.MOUSE_DOWN, Events.MOUSE_UP].forEach(function(eventType) {
  Mouse.handlers[eventType] = [];

  Triggerable.register(eventType, function(evt) {
    if (Mouse.handlers[eventType].indexOf(evt) === -1) {
      Mouse.handlers[eventType].push(evt);
    }
  }, function(evt) {
    var index = Mouse.handlers[eventType].indexOf(evt);
    if (index !== -1) {
      Mouse.handlers[eventType].splice(index, 1);
    }
  });
});

module.exports = Mouse;

},{"../collider/rect_collider":6,"../consts/events":9,"../core/triggerable":14,"../joy.js":21,"../math/vector2d":25}],20:[function(require,module,exports){
/**
 * @module Joy
 */
var Support = require('../core/support');
var Events = require('../consts/events');

// Only bind touch events when devise supports it.
if (!Support.touch) { return; }

var Touch = {};

/**
 * Events.TOUCH_START
 * @type {String}
 * @static
 * @final
 */
Events.TOUCH_START = 'touchstart';

/**
 * Events.TOUCH_MOVE
 * @type {String}
 * @static
 * @final
 */
Events.TOUCH_MOVE = 'touchmove';

/**
 * Events.TOUCH_END
 * @type {String}
 * @static
 * @final
 */
Events.TOUCH_END = 'touchend';

module.exports = Touch;

},{"../consts/events":9,"../core/support":13}],21:[function(require,module,exports){
/**
 * @module Joy
 * @static
 */

module.exports = {
  Init: {},
  Render: {},
  Input: {},
  Context: {},

  /**
   * @attribute debug
   * @type {Boolean}
   * @static
   * @default false
   */
  debug: false,

  /**
   * @attribute deltaTime
   * @type {Number}
   * @default 1
   * @static
   */
  deltaTime: 1,

  // TODO: find a better way to reference currentEngine instance.
  // What will happen when we have two canvas contexts at the same time? (like a mini-map?)
  currentEngine: null,

  /**
   * @method ready
   * @static
   */
  ready: function(callback) {
    document.onload = callback;
  }
};

},{}],22:[function(require,module,exports){

/**
 * @class Math
 */

/**
 * @method clamp
 * @param {Number} number
 * @param {Number} low
 * @param {Number} high
 * @static
 *
 * @example
 *     Math.clamp(5, 10, 20); // returns 10
 */
Math.clamp = function(number, low, high) {
  return ((number < low) ? low : ((number > high) ? high : +number));
};

},{}],23:[function(require,module,exports){
/**
 * @module Joy
 */

/**
* Based on [EaselJS](https://github.com/CreateJS/EaselJS/) Matrix2D implementation.
*
* @class Matrix2D
* @constructor
*
* @param {Number} m11
* @param {Number} m12
* @param {Number} m21
* @param {Number} m22
* @param {Number} dx
* @param {Number} dy
*/
var Matrix2D = function(m11, m12, m21, m22, dx, dy) {
  if (m11 !== null) {
    this.m11 = m11;
  }
  this.m12 = m12 || 0;
  this.m21 = m21 || 0;
  if (m22 !== null) {
    this.m22 = m22;
  }
  this.dx = dx || 0;
  this.dy = dy || 0;
  return this;
};

/**
 * Generates matrix properties from the specified display object transform properties, and appends them with this matrix.
 * For example, you can use this to generate m11 matrix from m11 display object: var mtx = new Matrix2D();
 * mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
 * @method appendTransform
 * @param {Number} x
 * @param {Number} y
 * @param {Number} scaleX
 * @param {Number} scaleY
 * @param {Number} rotation
 * @param {Number} skewX
 * @param {Number} skewY
 * @param {Number} pivotX Optional.
 * @param {Number} pivotY Optional.
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.appendTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, pivotX, pivotY) {
  var cos, sin, r;
  if (rotation % 360) {
    r = rotation * Matrix2D.DEG_TO_RAD;
    cos = Math.cos(r);
    sin = Math.sin(r);
  } else {
    cos = 1;
    sin = 0;
  }

  if (skewX || skewY) {
    // TODO: can this be combined into m11 single append?
    skewX *= Matrix2D.DEG_TO_RAD;
    skewY *= Matrix2D.DEG_TO_RAD;

    this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
    this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
  } else {
    this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
  }

  if (pivotX || pivotY) {
    // prepend the registration offset:
    this.dx -= pivotX * this.m11+pivotY * this.m21;
    this.dy -= pivotX * this.m12+pivotY * this.m22;
  }
  return this;
};


/**
 * Appends the specified matrix properties with this matrix. All parameters are required.
 * @method append
 * @param {Number} m11
 * @param {Number} m12
 * @param {Number} m21
 * @param {Number} m22
 * @param {Number} dx
 * @param {Number} dy
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.append = function(m11, m12, m21, m22, dx, dy) {
  var a1 = this.m11;
  var b1 = this.m12;
  var c1 = this.m21;
  var d1 = this.m22;

  this.m11  = m11*a1+m12*c1;
  this.m12  = m11*b1+m12*d1;
  this.m21  = m21*a1+m22*c1;
  this.m22  = m21*b1+m22*d1;
  this.dx = dx*a1+dy*c1+this.dx;
  this.dy = dx*b1+dy*d1+this.dy;
  return this;
};

/**
 * Inverts the matrix, causing it to perform the opposite transformation.
 * @method invert
 * @return {Matrix2D} this
 **/
Matrix2D.prototype.invert = function() {
  var a1 = this.m11;
  var b1 = this.m12;
  var c1 = this.m21;
  var d1 = this.m22;
  var tx1 = this.dx;
  var n = a1*d1-b1*c1;

  this.m11 = d1/n;
  this.m12 = -b1/n;
  this.m21 = -c1/n;
  this.m22 = a1/n;
  this.dx = (c1*this.dy-d1*tx1)/n;
  this.dy = -(a1*this.dy-b1*tx1)/n;
  return this;
};

/**
 * Clone Matrix2D instance
 * @return {Matrix2D}
 */
Matrix2D.prototype.clone = function() {
  return new Matrix2D(this.m11, this.m12, this.m21, this.m22, this.dx, this.dy);
};

/**
 * Reset matrix to it's identity
 * @return {Matrix2D} this
 */
Matrix2D.prototype.identity = function() {
  this.m11 = this.m22 = 1;
  this.m12 = this.m21 = this.dx = this.dy = 0;
  return this;
};

/**
 * Multiplier for converting degrees to radians. Used internally by Matrix2D.
 *
 * @attribute DEG_TO_RAD
 * @static
 * @readonly
 * @return {Number}
 **/
Matrix2D.DEG_TO_RAD = Math.PI / 180;
Matrix2D.identity = new Matrix2D(1, 0, 0, 1, 0, 0);

module.exports = Matrix2D;

},{}],24:[function(require,module,exports){
/**
 * @module Joy
 */
/**
 * @class Range
 * @constructor
 * @param {Number} min
 * @param {Number} max
 */
var Range = function(_min, _max) {
  var min = _min,
      max = _max;

  if (typeof(min)==="object") {
    min = _min.min || 0;
    max = _min.max || 0;
  }

  this.min = parseFloat(min || 0, 10);
  this.max = parseFloat(max || this.min || 0, 10);
};

/**
 * Get a random value between this range.
 * @method random
 * @return {Number}
 */
Range.prototype.random = function () {
  return Range.random(this.min, this.max);
};

/**
 * Get a random integer value between this range
 * @method randomInt
 * @return {Number}
 */
Range.prototype.randomInt = function () {
  return Range.randomInt(this.min, this.max);
};

/**
 * Parse range object or string
 *
 * @example by given string
 *      var range = new Joy.Range("1..10");
 *
 * @example by given object
 *      var range = new Joy.Range({min: 1, max: 10});
 *
 * @example by single number
 *      var range = new Joy.Range(5);
 *
 * @param {String | Object | Number} range
 * @return {Range}
 */
Range.parse = function (obj) {
  if (typeof(obj)==="string") {
    var data = obj.split("..");
    return new Range(data[0], data[1]);
  } else {
    return new Range(obj);
  }
};

/**
 * Get a random floating value between min and max
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @static
 */
Range.random = function (min, max) {
  return ((Math.random() * (max - min + 1)) + min);
};

/**
 * Get a random integer value between min and max
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @static
 */
Range.randomInt = function (min, max) {
  return (Math.floor((Math.random() * (max - min + 1)) + min));
};

module.exports = Range;

},{}],25:[function(require,module,exports){
/**
 * @module Joy
 */
/**
 * @class Vector2d
 * @constructor
 * @param {Number} x
 * @param {Number} y
 */
var Vector2d = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;

  /**
   * Get the magnitude of this vector
   * @attribute length
   * @readonly
   */
  Object.defineProperty(this, 'length', {
    get: function () {
      return Math.sqrt((this.x * this.x) + (this.y * this.y));
    },
    configurable: true
  });

  /**
   * Get this vector with a magnitude of 1.
   * @attribute normalized
   * @readonly
   */
  Object.defineProperty(this, 'normalized', {
    get: function () {
      var magnitude = this.length;
      return new Vector2d(this.x / magnitude, this.y / magnitude);
    },
    configurable: true
  });
};

/**
 * @method set
 * @param {Number} x
 * @param {Number} y
 * @return {Vector2d}
 */
Vector2d.prototype.set = function (x, y) {
  this.x = x;
  this.y = y;
  return this;
};

/**
 * @method sum
 * @param {Vector2d} vector2d
 * @return {Vector2d}
 */
Vector2d.prototype.subtract = function (vector2d) {
  this.x -= vector2d.x;
  this.y -= vector2d.y;
  return this;
};

/**
 * @method sum
 * @param {Vector2d} vector2d
 * @return {Vector2d}
 */
Vector2d.prototype.sum = function (vector2d) {
  this.x += vector2d.x;
  this.y += vector2d.y;
  return this;
};

/**
 * @method scale
 * @param {Number} x (or x y)
 * @param {Number} y
 * @return {Vector2d}
 */
Vector2d.prototype.scale = function (x, y) {
  this.x *= x;
  this.y *= y || x;
  return this;
};

/**
 * @method clone
 * @return {Vector2d}
 */
Vector2d.prototype.clone = function() {
  return new Vector2d(this.x, this.y);
};

/**
 * Return unit vector
 * @return {Vector2d}
 */
Vector2d.prototype.unit = function() {
  return new Vector2d( Math.cos(this.x), Math.sin(this.y) );
};

/**
 * Normalize this vector
 * @return {Vector2d}
 */
Vector2d.prototype.normalize = function() {
  var normal = this.normalized;
  this.x = normal.x;
  this.y = normal.y;
  return this;
};

/**
 * Get the distance between this vector and the argument vector
 * @param {Vector2d} vector
 * @return {Number}
 */
Vector2d.distance = function(v1, v2) {
  var xdiff = v1.x - v2.x,
      ydiff = v1.y - v2.y;
  return Math.sqrt(xdiff * xdiff + ydiff * ydiff);
};

/**
 * @method toString
 * @return {String}
 */
Vector2d.prototype.toString = function () {
  return "#<Vector2d @x=" + this.x + ", @y=" + this.y + ">";
};

Vector2d.LEFT = new Vector2d(-1, 0);
Vector2d.RIGHT = new Vector2d(1, 0);
Vector2d.TOP = new Vector2d(0, -1);
Vector2d.BOTTOM = new Vector2d(0, 1);

module.exports = Vector2d;

},{}],26:[function(require,module,exports){
/**
 * @module Joy
 */

/**
 * OBS:
 * Audio library are provided by [howler.js](https://github.com/goldfire/howler.js).
 *
 * @class Sound
 */
module.exports = require('howler').Howl;

},{"howler":45}],27:[function(require,module,exports){
/**
 * @module Joy
 */

/**
 * OBS: Tweens are provided by [tween.js](https://github.com/sole/tween.js).
 *
 * Alias to TWEEN
 *
 * @class TweenManager
 */

var Joy = require('../joy.js');
var TWEEN = require('tween.js');

Joy.TweenManager = TWEEN;

/**
 * Create a new tween.
 * Alias to TWEEN.Tween
 *
 * @class Tween
 * @param {Object} target
 * @param {Number} duration (in milliseconds)
 * @constructor
 */

module.exports = function(vars, duration) {
  return new TWEEN.Tween(vars, duration);
};

/**
 * @method getAll
 * @return {Array}
 */
/**
 * @method removeAll
 */
/**
 * @param {Tween} tween
 * @method add
 */
/**
 * @param {Tween} tween
 * @method remove
 */
/**
 * @param {Number} time
 * @method update
 */

/**
 * @param {Object}
 * @method to
 * @return {Tween} this
 */

/**
 * @param {Object}
 * @method start
 * @return {Tween} this
 */

/**
 * @method stop
 * @return {Tween} this
 */

/**
 * @param {Number} times
 * @method repeat
 * @return {Tween} this
 */

/**
 * @param {Number} amount
 * @method delay
 * @return {Tween} this
 */

/**
 * @param {Function} method
 * @method easing
 * @return {Tween} this
 */

/**
 * @param {Function} method
 * @method interpolation
 * @return {Tween} this
 */

/**
 * @param {Function} callback
 * @method onUpdate
 * @return {Tween} this
 */

/**
 * @param {Function} callback
 * @method onComplete
 * @return {Tween} this
 */

},{"../joy.js":21,"tween.js":46}],28:[function(require,module,exports){
/**
 * @module Joy
 */
var Triggerable = require('../core/triggerable');
var Events = require('../consts/events');
var Vector2d = require('../math/vector2d');
var Matrix2D = require('../math/matrix2d');

var RectCollider = require('../collider/rect_collider');

var Support = require('../core/support');
var Utils = require('../util/utils.js');

var DisplayObject = Triggerable.extend({

  /**
   * Base class for rendering.
   * @class DisplayObject
   * @extends Triggerable
   * @constructor
   *
   * @param {Object} options
   */
  init: function(options) {
    if (!options) { options = {}; }

    /**
     * @attribute id
     * @type {String}
     * @default "joy..."
     */
    this.id = options.id || Utils.generateUniqueId();

    /**
     * @attribute position
     * @type {Vector2d}
     * @default 0,0
     */
    this.position = options.position || new Vector2d(options.x || 0, options.y || 0);
    Object.defineProperty(this, 'collidePosition', {
      get: function () {
        var origin = (this._parent !== null) ? this._parent.collidePosition : new Vector2d();
        return origin.sum(this.position).subtract(this.pivot);
      },
      configurable: true
    });

    /**
     * @attribute pivot
     * @type {Vector2d}
     * @default 0,0
     */
    this.pivot = options.pivot || new Vector2d(options.pivotX || 0, options.pivotY || 0);

    /**
     * @attribute skewX
     * @type {Number}
     * @default 0
     */
    this.skew = options.skew || new Vector2d(options.skewX || 0, options.skewY || 0);

    /**
     * @attribute scale
     * @type {Vector2d}
     * @default 1,1
     */
    this.scale = options.scale || new Vector2d(options.scaleX || 1, options.scaleY || 1);

    /**
     * @attribute alpha
     * @type {Number}
     * @default 1
     */
    this.alpha = (typeof(options.alpha) === "undefined") ? 1 : options.alpha;

    /**
     * @attribute rotation
     * @type {Number}
     * @default 0
     */
    this.rotation = options.rotation || 0;

    /**
     * @attribute smooth
     * @type {Boolean}
     * @default false
     */
    this.smooth = (typeof(options.smooth) === "undefined") ? true : options.smooth;

    /**
     * Is this destroyed? When true, this DisplayObject will be removed from
     * the container in the next loop.
     * @property destroyed
     * @default false
     * @type {Boolean}
     */
    this.destroyed = false;

    /**
     * @attribute width
     * @type {Number}
     * @default 0
     */
    this._width = options.width || 0;

    /**
     * @attribute height
     * @type {Number}
     * @default 0
     */
    this._height = options.height || 0;

    /**
     * Collider object. Can be a DisplayObject, or a geometry collider.
     * @attribute collider
     * @type {DisplayObject | RectCollider}
     * @default this
     */
    Object.defineProperty(this, 'collider', {
      get: function () {
        return this._collider;
      },
      set: function (collider) {
        this._collider = collider;
        this._collider.target = this;
      },
      configurable: true
    });
    this._collider = options.collider || this;

    /**
     * Index of this DisplayObject on the DisplayObjectContainer
     * @attribute index
     * @type {Number}
     * @readonly
     */
    this.index = null;

    /**
     * Context that this DisplayObject will be rendered in
     * @attribute ctx
     * @type {Canvas2D}
     * @readonly
     */
    this.ctx = options.ctx || null;
    this._shadow = null;
    this._parent = null;
    this._visible = (typeof(options.visible) === "undefined") ? true : options.visible;
    this._matrix = Matrix2D.identity.clone();
    this._collisionTargets = [];
    this._collisionActive = {};

    // Custom context operations
    this._hasContextOperations = false;
    this._contextOperations = {};

    /**
     * Parent DisplayObject
     * @attribute parent
     * @readonly
     * @type {DisplayObjectContainer}
     */
    Object.defineProperty(this, 'parent', {
      get: function () {
        return this._parent;
      },
      configurable: true
    });

    /**
     * Get scene where this DisplayObject is contained in
     * @readonly
     * @type {Scene}
     */
    Object.defineProperty(this, 'scene', {
      get: function () {
        var Scene = require('./scene'),
            parent = this._parent;
        while (!(parent instanceof Scene) && parent !== null) {
          parent = (parent && parent.parent) || null;
        }
        return parent;
      },
      configurable: true
    });

    /**
     * Is this DisplayObject able for rendering?
     * @attribute visible
     * @type {Boolean}
     */
    Object.defineProperty(this, 'visible', {
      get: function () {
        return this._visible && this.alpha > 0 && this.scale.y !== 0 && this.scale.y !== 0;
      },
      set: function (visible) {
        this._visible = visible;
      },
      configurable: true
    });

    /**
     * Reference of the current transformation matrix.
     * @attribute matrix
     * @type {Matrix2D}
     */
    Object.defineProperty(this, 'matrix', {
      get: function () {
        return this._matrix;
      },
      configurable: true
    });

    /**
     * @attribute width
     * @readonly
     * @type {Number}
     */
    Object.defineProperty(this, 'width', {
      get: function () {
        return this._width * Math.abs(this.scale.x);
      },
      configurable: true
    });

    /**
     * @attribute height
     * @readonly
     * @type {Number}
     */
    Object.defineProperty(this, 'height', {
      get: function () {
        return this._height * Math.abs(this.scale.y);
      },
      configurable: true
    });

    /**
     * @attribute right
     * @readonly
     * @type {Number}
     */
    Object.defineProperty(this, 'right', {
      get: function () {
        return this.position.x + this.width;
      },
      configurable: true
    });

    /**
     * @attribute bottom
     * @readonly
     * @type {Number}
     */
    Object.defineProperty(this, 'bottom', {
      get: function () {
        return this.position.y + this.height;
      },
      configurable: true
    });

    /**
     * @attribute flipX
     * @type {Boolean}
     * @default false
     */
    this.flipX = options.flipX || false;

    /**
     * @attribute flipY
     * @type {Boolean}
     * @default false
     */
    this.flipY = options.flipY || false;

    this._super(options);

    // Bind UPDATE event to check collisions
    if (this.collider) {
      this.bind(Events.UPDATE, this.checkCollisions);
    }
  },

  setContext: function(ctx) {
    this.ctx = ctx;
  },

  /**
   * Mark this DisplayObject as destroyed.
   * It will be removed from the container in the next loop.
   * @method destroy
   * @return {DisplayObject} this
   */
  destroy: function () {
    this.destroyed = true;
    return this;
  },

  /**
   * @method setScale
   * @param {Number} x
   * @param {Number} y
   */
  setScale: function (x, y) {
    this.scale.x = x;
    this.scale.y = y;
  },

  /**
   * @method allowCollisionFrom
   * @param {DisplayObject | Array} target
   * @return {DisplayObject} this
   */
  allowCollisionFrom: function (displayObjects) {
    if (displayObjects instanceof DisplayObject) {
      displayObjects = [displayObjects];
    }

    for (var i=0, length = displayObjects.length; i<length; ++i ) {
      this._collisionTargets.push(displayObjects[i]);
    }

    return this;
  },

  /**
   * @method translate
   * @param {Number} x
   * @param {Number} y
   */
  translate: function(x, y) {
    this._hasContextOperations = true;
    this._contextOperations.translate = [x, y];
    return this;
  },

  /**
   * @method rotate
   * @param {Number} angle
   */
  rotate: function(angle) {
    this.rotation = angle;
  },

  /**
   * @method transform
   * @param {Number} m11 The m1,1 value in the matrix.
   * @param {Number} m12 The m1,2 value in the matrix.
   * @param {Number} m21 The m2,1 value in the matrix.
   * @param {Number} m22 The m2,2 value in the matrix.
   * @param {Number} dx The delta x (dx) value in the matrix.
   * @param {Number} dy The delta y (dy) value in the matrix.
   */
  transform: function(m11, m12, m21, m22, dx, dy) {
    this._contextOperations.transform = [m11, m12, m21, m22, dx, dy];
    return this;
  },

  /**
   * Apply composite operation on DisplayObject's canvas.
   * @method blend
   * @param {String} compositeOperation
   * @return {DisplayObject} this
   */
  composite: function (compositeOperation) {
    this.compositeOperation = compositeOperation;
    return this;
  },

  /**
   * @method fillStyle
   * @param {Color, String} color
   * @return {DisplayObject} this
   */
  fillStyle: function(color) {
    this._hasContextOperations = true;
    this._contextOperations.fillStyle = color.toString();
    return this;
  },

  /**
   * @method fillRect
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @return {DisplayObject} this
   */
  fillRect: function(x, y, width, height) {
    this._hasContextOperations = true;
    this._contextOperations.fillRect = [x, y, width, height];
    return this;
  },

  /**
   * Register shadow context operations
   * @method shadow
   * @param {Object} [options] shadow options
   *  @param {Color, String} [options.color] shadow color
   *  @param {Number} [options.offsetX] shadow x offset
   *  @param {Number} [options.offsetY] shadow y offset
   *  @param {Number} [options.blur] shadow blur ratio
   * @return {DisplayObject} this
   */
  shadow: function(options) {
    if (options) {
      this._shadow = {
        color: options.color || "#000",
        offsetX: options.offsetX || 0,
        offsetY: options.offsetY || 0,
        blur: options.blur || 1
      };
    } else {
      this._shadow = null;
    }
    return this;
  },

  /**
   * Update canvas context, based on DisplayObject transformation variables
   * @method updateContext
   * @return {DisplayObject} this
   */
  updateContext: function() {
    var bit = {};
    bit[false] = -1;
    bit[true] = 1;

    var mtx = this._matrix.identity().appendTransform(this.position.x + (this.width * (this.flipX+0)),
                                                      this.position.y + (this.height * (this.flipY+0)),
                                                      this.scale.x * (bit[!this.flipX]), this.scale.y * (bit[!this.flipY]),
                                                      this.rotation,
                                                      this.skew.x, this.skew.y,
                                                      this.pivot.x, this.pivot.y);

    this.ctx.transform(mtx.m11, mtx.m12, mtx.m21, mtx.m22, mtx.dx, mtx.dy);
    this.ctx.globalAlpha *= this.alpha;

    if (this.compositeOperation) {
      this.ctx.globalCompositeOperation = this.compositeOperation;
    }

    this.ctx[Support.imageSmoothingEnabled] = this.smooth;

    // Apply shadow
    if (this._shadow) {
      this.ctx.shadowColor = this._shadow.color;
      this.ctx.shadowOffsetX = this._shadow.offsetX;
      this.ctx.shadowOffsetY = this._shadow.offsetY;
      this.ctx.shadowBlur = this._shadow.blur;
    }
  },

  /**
   * Is this DisplayObject colliding with {Object}?
   * @param {DisplayObject, Circle, Rectangle}
   * @return {Boolean} is colliding
   */
  collide: function(collider) {
    return !(
      this.collidePosition.x      >= collider.collidePosition.x + collider.width  ||
      collider.collidePosition.x  >= this.collidePosition.x + this.width          ||
      this.collidePosition.y      >= collider.collidePosition.y + collider.height ||
      collider.collidePosition.y  >= this.collidePosition.y + this.height
    );
  },

  /**
   * Called on UPDATE, triggers COLLISION_ENTER, COLLISION_EXIT and COLLISION events.
   * @method checkCollisions
   */
  checkCollisions: function() {
    var collider, totalTargets = this._collisionTargets.length;
    if (totalTargets === 0) { return ; }

    if (this.collider.updateColliderPosition !== undefined) {
      this.collider.updateColliderPosition(this.position);
    }

    // Draw debugging stroke around sprite
    // if (Joy.debug) {
    //   this.collider.renderStroke(this.ctx);
    // }

    // Check collisions
    for (var i = 0; i < totalTargets; ++i) {
      collider = this._collisionTargets[i].collider;

      if (collider.collide(this.collider)) {
        // Trigger COLLISION_START when it's colliding for the first time.
        if (!this._collisionActive[collider.id]) {
          this.trigger(Events.COLLISION_ENTER, [ this._collisionTargets[i] ]);
          this._collisionActive[collider.id] = true;
        }

        this.trigger(Events.COLLISION, [ this._collisionTargets[i] ]);

      } else if (this._collisionActive[collider.id]) {
        delete this._collisionActive[collider.id];
        this.trigger(Events.COLLISION_EXIT, [ this._collisionTargets[i] ]);
      }
    }
  },

  /**
   * @method willCollideAt
   * @param {Vector2d} projection
   * @return {DisplayObject, null}
   */
  willCollideAt: function (projection) {
    var tmpCollider = new RectCollider(this.collider.position.clone().sum(projection), 1, 1),
        totalTargets = this._collisionTargets.length;
    if (totalTargets === 0) { return; }

    tmpCollider.updateColliderPosition( this.position );

    for (var i = 0; i < totalTargets; ++i) {
      if (this._collisionTargets[i].collider.collide(tmpCollider)) {
        return this._collisionTargets[i];
      }
    }
    return null;
  },

  /**
   * Apply all custom context operations.
   * @method render
   */
  render: function() {
    // Remove DisplayObject from container
    if (this.destroyed && this.parent) {
      this.parent.removeChild(this);
      return;
    }

    if (this._hasContextOperations) {
      for (var operation in this._contextOperations) {
        if (this._contextOperations[operation] instanceof Array) {
          this.ctx[operation].apply(this.ctx, this._contextOperations[operation]);
        } else {
          this.ctx[operation] = this._contextOperations[operation];
        }
      }
    }
  },

  renderStroke: function (ctx) {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.collidePosition.x, this.collidePosition.y, this.width, this.height);
  },

  /**
   * Get a clone of the current transformation
   * @method getMatrix
   * @return {Matrix2D}
   */
  getMatrix: function() {
    return this._matrix.clone();
  },

  /**
   * Return DisplayObject boundaries as a rectangle.
   * @return {Rect}
   */
  getBounds: function () {
    var Rect = require('../geom/rect');
    return new Rect(this.position.x, this.position.y, this.width, this.height);
  }
});

module.exports = DisplayObject;

},{"../collider/rect_collider":6,"../consts/events":9,"../core/support":13,"../core/triggerable":14,"../geom/rect":16,"../math/matrix2d":23,"../math/vector2d":25,"../util/utils.js":44,"./scene":33}],29:[function(require,module,exports){
/**
 * @module Joy
 */
var DisplayObject = require('./display_object');
var Events = require('../consts/events');

var DisplayObjectContainer = DisplayObject.extend({
  /**
   * @class DisplayObjectContainer
   * @extends DisplayObject
   * @constructor
   */
  init: function(options) {
    if (!options) { options = {}; }

    /**
     * @attribute children
     * @type {Array}
     */
    this.children = [];

    /**
     * Number of children displayObject's attached to the container.
     * @attribute numChildren
     * @type {Number}
     * @readonly
     */
    Object.defineProperty(this, 'numChildren', {
      get: function () {
        return this.children.length;
      },
      configurable: true
    });

    Object.defineProperty(this, 'width', {
      get: function () {
        // Get child with greater width
        var width = 0;
        for (var i=0, length = this.children.length; i<length; ++i) {
          if (this.children[i].width > width) {
            width = this.children[i].width;
          }
        }
        return width;
      },
      configurable: true
    });

    Object.defineProperty(this, 'height', {
      get: function () {
        // Get child with greater height
        var height = 0;
        for (var i=0, length = this.children.length; i<length; ++i) {
          if (this.children[i].height > height) {
            height = this.children[i].height;
          }
        }
        return height;
      },
      configurable: true
    });

    this._super(options);

    // Add children after setup.
    if (options.children) {
      for (var i=0,length=options.children.length; i<length; ++i) {
        this.addChild(options.children[i]);
      }
    }
  },

  setContext: function(ctx) {
    this.ctx = ctx;
    var i = 0, length = this.children.length;
    for (; i<length; ++i) {
      this.children[i].setContext(ctx);
    }
  },

  render: function() {
    if (!this.visible) { return; }
    this.ctx.save();
    this.updateContext();

    this._super();
    this.renderChildren();

    this.ctx.restore();
  },

  renderChildren: function () {
    for (var i = 0, length = this.children.length; i<length; ++i) {
      if (!this.children[i].visible) { continue; }
      this.ctx.save();
      this.children[i].updateContext();
      this.children[i].render();
      this.children[i].trigger('update');
      this.ctx.restore();

      // Render collider, without any transformation
      if (Joy.debug) {
        this.children[i].collider.renderStroke(this.ctx);
      }
    }
  },

  /**
   * @method broadcast
   * @param {String}
   * @return {DisplayObjectContainer} this
   */
  broadcast: function (e, params) {
    this.trigger(e, params);
    for (var i = 0, length = this.children.length; i<length; ++i) {
      this.children[i].trigger(e, params);
    }
  },

  /**
   * Swap index of two children
   * @method swapChildren
   * @param {DisplayObject} child1
   * @param {DisplayObject} child2
   */
  swapChildren: function(child1, child2) {
    if (child1.parent !== child2.parent) {
      throw new Error("DisplayObject must be at same level to swap.");
    }

    var child1Index = child1.index;

    // Swap child references
    this.children[ child1Index ] = child2;
    this.children[ child2.index ] = child1;

    // Swap indexes
    child1.index = child2.index;
    child2.index = child1Index;
    return this;
  },

  /**
   * Add a display object in the list.
   * @method addChild
   * @param {DisplayObject | DisplayObjectContainer}
   * @return {DisplayObjectContainer} this
   */
  addChild: function(displayObject) {
    displayObject.setContext(this.ctx);
    displayObject.index = this.children.push(displayObject) - 1;
    displayObject._parent = this;

    if (displayObject.scene) {
      // Trigger ADDED event on target DisplayObject.
      displayObject.broadcast(Events.ADDED, [this]);
    }

    return this;
  },

  /**
   * Search for a child by id attribute
   * @method getChildById
   * @param {String} id
   * @return {DisplayObject}
   */
  getChildById: function (id) {
    for (var i = 0, length = this.children.length; i<length; ++i) {
      if (this.children[i].id == id) {
        return this.children[i];
      }
    }
  },

  /**
   * @method getChildAt
   * @param {Number} index
   * @return {DisplayObject}
   */
  getChildAt: function (index) {
    return this.children[index];
  },

  /**
   * Remove target child
   * @param {DisplayObject} displayObject
   * @return {DisplayObjectContainer} this
   */
  removeChild: function(displayObject) {
    var index = this.children.indexOf(displayObject);
    if (index !== -1) {
      this.removeChildAt(index);
    }
    return this;
  },

  /**
   * Remove child at specific index
   * @param {Number} index
   * @return {DisplayObjectContainer} this
   */
  removeChildAt: function(index) {
    var displayObject = this.children.splice(index, 1)[0];

    // Trigger REMOVED event on target DisplayObject.
    displayObject.trigger(Events.REMOVED, [this]);

    return this;
  }

});

// Export module
module.exports = DisplayObjectContainer;

},{"../consts/events":9,"./display_object":28}],30:[function(require,module,exports){
/**
 * @module Joy
 */

var Class = require('../core/class');

/*
 * TODO:
 * @class Font
 */
var Font = Class.extend({
  init: function () {}
});

module.exports = Font;

},{"../core/class":10}],31:[function(require,module,exports){
/**
 * @module Joy
 */
var DisplayObjectContainer = require('./display_object_container');

var Parallax = DisplayObjectContainer.extend({
  /**
   * @class Parallax
   * @constructor
   * @param {Object} options
   */
  init: function(options) {
    this._super(options);

    /**
     * Viewport that parallax effect will be based on.
     * @attribute viewport
     * @type {Viewport}
     */
    this.viewport = options.viewport || null;

    /**
     * Distance between each parallax child.
     * @attribute distance
     * @type {Number}
     */
    this.distance = options.distance || 1;

    /**
     * Amount of velocity that will increase by child.
     * @attribute velocity
     * @type {Number}
     */
    this.velocity = options.velocity || 1;

    // Bind on added to Container
    this.bind(Joy.Events.ADDED, this._setup);
  },

  _setup: function (scene) {
    if (!(scene instanceof Joy.Scene)) {
      throw new Error("'Parallax' instance must be added into a 'Scene'.");
    }
    this.viewport = scene.viewport;

    var parallax = this;

    // Add repeatable parts
    this.viewport.bind('setup', function() {
      var i, length, layer, child;

      for (i=0, length=parallax.numChildren; i < length; ++i) {

        if (parallax.getChildAt(i).position) {
          layer = parallax.getChildAt(i);

          // Empty previous setup
          while (layer.numChildren > 0) {
            layer.removeChildAt(0);
          }

          for (var j=0, childsToFill = Math.ceil(layer.width / this.width) - 1; j<childsToFill; ++j) {
            child = layer.clone();
            child.children = [];
            child.position.x = layer.width;
            layer.addChild(child);
          }
        }

      }
    });

    this.viewport.bind('translate', function() {
      var velocity = parallax.distance;

      for (var i=0, length=parallax.numChildren; i < length; ++i) {
        velocity *= parallax.velocity * (i + 1);
        if (parallax.getChildAt(i).position) {
          parallax.getChildAt(i).position.x += (this.translation.x * velocity) / this.width;
          parallax.getChildAt(i).position.y += (this.translation.y * velocity) / (this.height / 2);
        }
      }
    });
  }

});

module.exports = Parallax;

},{"./display_object_container":29}],32:[function(require,module,exports){
/**
 * module Joy
 */
var DisplayObject = require('./display_object');

var ParticleEmitter = DisplayObject.extend({
  /**
   * class ParticleEmitter
   * constructor
   * param {Object} options
   */
  init: function (options) {
    this._super(options);

    /**
     * Emit new particles each frame?
     * @property emit
     * @type {Boolean}
     */
    this.emit = (typeof(options.emit)==="undefined") ? true : options.emit;

    /*
     * Active particles list.
     * @property particles
     * @type Array
    this.particles = [];
     */

    /**
     * Particle variations to emitt.
     * @property particles
     * @type {Array}
     */
    this.sources = (typeof(options.source)!=="undefined") ? [options.source] : options.sources;

    /**
     * The minimum/maximum number of particles that will be spawned every second.
     * @property emission
     * @type {Number}
     */
    this.emission = (typeof(options.emission)!=="undefined") ? new Joy.Range(options.emission) : new Joy.Range(1, 5);

    /**
     * Tweening easing function.
     * @property ease
     * @type {Function}
     * @default Joy.Tween.Easing.Linear
     */
    this.ease = options.ease || Joy.TweenManager.Easing.Linear;

    /**
     * Particles start options.
     * @property start
     * @type {Obejct}
     */
    this.start = options.start || {};

    /**
     * Particles end options.
     * @property end
     * @type {Obejct}
     */
    this.end = options.end || {};

    /**
     * Minimum/maximum time to live of each generated particle.
     * @property particleLifetime
     * @type {Number}
     */
    this.particleLifetime = (typeof(options.particleLifetime)!=="undefined") ? new Joy.Range(options.particleLifetime) : new Joy.Range(1, 2);

    /**
     * Minimum/maximum time to live of particle emitter.
     * @property particleLifetime
     * @type {Number}
     */
    Object.defineProperty(this, 'lifetime', {
      get: function () {
        return this._lifetime;
      },
      set: function (lifetime) {
        this._lifetime = ((typeof(lifetime)!=="undefined") ? new Joy.Range(lifetime) : new Joy.Range(-1)).random();
      },
      configurable: true
    });
    this.lifetime = options.lifetime || Infinity;
    this._ttl = Infinity;

    // Propagate ADDED event to sources, to activate scene loader.
    this.bind(Joy.Events.ADDED, function () {
      for (var i = 0, l = this.sources.length; i < l; i ++) {
        this.sources[i].trigger(Joy.Events.ADDED);
      }
    });

    this.bind(Joy.Events.SCENE_ACTIVE, this._activate);
  },

  _activate: function () {
    this._ttl = Date.now() + (this.lifetime * 1000);
  },

  /**
   * Emit {qty} particles.
   * @method emit
   * @param {Number} qty
   * @return {ParticleEmitter} this
   */
  _emit: function (qty) {
    var particle;

    for (var i = 0; i < qty; i += 1) {
      particle = this.sources[ Joy.Range.randomInt(0, this.sources.length - 1) ].clone();
      particle.behave('particle', {
        emitter: this,
        ease: this.ease,
        start: this.start,
        end: this.end,
        ttl: this.particleLifetime.random()
      });
      this.parent.addChild(particle);
    }

    return this;
  },

  //clear: function () {
    //this.particles = [];
  //},

  render: function () {
    this._super();

    if (!this.emit || Date.now() > this._ttl) { return; }

    // TODO: check emission rate
    this._emit(1);
  }
});

module.exports = ParticleEmitter;

},{"./display_object":28}],33:[function(require,module,exports){
/**
 * @module Joy
 */
var DisplayObjectContainer = require('./display_object_container');

var Scene = DisplayObjectContainer.extend({
  /**
   * @class Scene
   * @constructor
   * @param {Object} options
   */
  init: function(options) {
    if (!options) { options = {}; }

    // Initialize scenes as invisible as default.
    // Use Engine methods to toggle scene visibility
    if (typeof(options.visible) === "undefined") {
      options.visible = false;
    }

    this._super(options);

    /**
     * @type {Loader}
     */
    this.loader = (typeof(options.loader) === "undefined") ? new Joy.Loader() : options.loader;

    /**
     * Is the scene on paused state?
     * @attribute paused
     * @type {Boolean}
     */
    this.paused = false;

    /**
     * List of active shaders on the scene.
     * @attribute shaders
     * @type {Array}
     */
    this.shaders = [];

    /**
     * @attribute viewport
     * @type {Viewport}
     */
    this.viewport = options.viewport || new Joy.Viewport({scene: this});
  },

  /**
   * Set background
   * @method background
   * @param {Color, String} color
   */
  background: function (color) {
    this.fillStyle(color.toString());
    this.fillRect(0, 0, this.width || Joy.currentEngine.width, this.height || Joy.currentEngine.height);
    return this;
  },

  /**
   * @method pause
   * @param {Object} options
   * @param {Number} options.blur radius for gaussian blur filter (optional)
   * @return {Scene} this
   */
  pause: function (options) {
    options = options || {};
    if (options.blur) {
      this.render();
      Joy.Shader.process(this.ctx, Joy.Shader.blur, options.blur);
    }
    this.paused = true;
    this.trigger('pause');
    return this;
  },

  updateContext: function () {
    this._super();

    // Update viewport context, if it's set.
    if (this.viewport.follow) {
      this.viewport.updateContext();
    }
  },

  render: function () {
    // Don't render when paused
    if (this.paused) { return; }

    this.updateContext();
    this._super();

    this.viewport.render();

    // Experimental: apply shaders
    if (this.shaders.length > 0) {
      for (var i=0, length = this.shaders.length; i < length; ++i) {
        Joy.Shader.process(this.ctx, this.shaders[i][0], this.shaders[i][1]);
      }
    }
  },

  broadcast: function (type, args) {
    this.viewport.broadcast(type, args);
    this._super(type, args);
  },

  /**
   * @method fadeOut
   * @param {Number} milliseconds
   * @param {String, Color} color
   * @return {Scene} this
   */
  fadeOut: function (milliseconds, color) {
    var self = this,
        rectangle = new Joy.Rect({
      width: this.viewport.width,
      height: this.viewport.height,
      color: color,
      alpha: 0
    });
    self.trigger('fadeOutStart');

    this.viewport.addHud(rectangle);
    var interval = setInterval(function () {
      rectangle.alpha += ((1000 / milliseconds) / 60) * Joy.deltaTime;
      if (rectangle.alpha >= 1) {
        clearInterval(interval);
        self.viewport.hud.removeChild(rectangle);
        self.trigger('fadeOutComplete');
      }
    }, 1);
    return this;
  },

  /**
   * @method fadeIn
   * @param {Number} milliseconds
   * @param {String, Color} color
   * @return {Scene} this
   */
  fadeIn: function (milliseconds, color) {
    var self = this,
        rectangle = new Joy.Rect({
      width: this.viewport.width,
      height: this.viewport.height,
      color: color,
      alpha: 1
    });
    self.trigger('fadeInStart');

    this.viewport.addHud(rectangle);
    var interval = setInterval(function () {
      rectangle.alpha -= ((1000 / milliseconds) / 60) * Joy.deltaTime;
      if (rectangle.alpha <= 0) {
        clearInterval(interval);
        self.viewport.hud.removeChild(rectangle);
        self.trigger('fadeInComplete');
      }
    }, 1000 / 60);
    return this;
  },

  /**
   * Experimental: add post-processing pixel effect.
   * @method addShader
   * @param {Function} shader
   * @param {Object} options shader options (optional)
   * @return {Scene} this
   */
  addShader: function(shader, args) {
    this.shaders.push([shader, args]);
    return this;
  }
});

module.exports = Scene;

},{"./display_object_container":29}],34:[function(require,module,exports){
/**
 * @module Joy
 */
var DisplayObjectContainer = require('./display_object_container');

/**
 * @class Sprite
 * @extends DisplayObjectContainer
 * @constructor
 *
 * @param {String | Object} data src (String) or
 *  @param {Number} width
 *  @param {Number} height
 */
var Sprite = DisplayObjectContainer.extend({
  init: function(options) {
    if (typeof(options)==="string") {
      options = { src: options };
    }

    // Asset
    this.image = options.image || new Image();

    // Real dimensions (without scale)
    options.width = this.image.width || options.width;
    options.height = this.image.height || options.height;

    this._super(options);

    // When is added into a container
    this.bind(Joy.Events.ADDED, function () {
      if (options.src) {
        this.load(options.src);
      }
    });
  },

  /**
   * @method load
   * @param {String} src image source
   */
  load: function(src) {
    var self = this;

    // Append sprite to scene loader
    // TODO: sprite loaders should be in layer outside the Scenes.
    if (this.scene && this.scene.loader && !this.scene.loader.completed) {
      this.scene.loader.add(this.image);
    }

    // Expose trigger
    this.image.addEventListener('load', function() {
      self.onLoad();
      self.trigger('load');
    });

    this.image.src = src;
  },

  onLoad: function() {
    if (!this._width) { this._width = this.image.width; }
    if (!this._height) { this._height = this.image.height; }
  },

  render: function() {
    if (!this.visible) { return; }
    this.ctx.drawImage(this.image, 0, 0, this._width, this._height);
    this.renderChildren();
  },

  /*
   * TODO: refactor me
   */
  clone: function () {
    var clone = new Joy.Sprite(this);
    this.position = this.position.clone();
    this.scale = this.scale.clone();
    this.pivot = this.pivot.clone();
    this.skew = this.skew.clone();
    return clone;
  }
});

module.exports = Sprite;

},{"./display_object_container":29}],35:[function(require,module,exports){
/**
 * @module Joy
 */

/**
 * This class is used on SpriteSheet's `animations` attribute.
 *
 * @class SpriteAnimation
 * @constructor
 */
var SpriteAnimation = function (options) {
  /**
   * @attribute parent
   * @type {SpriteSheet}
   */
  this.parent = options.parent;

  /**
   * @attribute name
   * @type {String}
   */
  this.name = options.name;

  /**
   * @attribute framesPerSecond
   * @type {Number}
   */
  this.framesPerSecond = options.framesPerSecond;

  /**
   * @attribute frames
   * @type {Array}
   */
  this.frames = options.frames;

  /**
   * @attribute firstFrame
   * @type {Number}
   */
  this.firstFrame = this.frames[0];

  /**
   * @attribute lastFrame
   * @type {Number}
   */
  this.lastFrame = lastFrame = this.frames[1] || this.frames[0];

  /**
   * @attribute currentFrame
   * @type {Number}
   */
  this.currentFrame = 0;
};

/**
 * Start the animation
 * @method start
 */
SpriteAnimation.prototype.start = function () {
  this.currentFrame = this.firstFrame;

  // Create the interval to change through frames
  var self = this;
  this._interval = setInterval(function(){ self.update(); }, 1000 / this.framesPerSecond);
};

/**
 * Stops the animation
 * @method stop
 */
SpriteAnimation.prototype.stop = function () {
  if (this._interval) {
    clearInterval(this._interval);
  }
  return this;
};

/**
 * Update frame animation
 * @method update
 */
SpriteAnimation.prototype.update = function () {
  if (this.currentFrame == this.lastFrame) {
    this.currentFrame = this.firstFrame;

    // Reached the first frame, trigger animation start callback.
    this.parent.trigger('animationStart');
  } else {
    this.currentFrame = this.currentFrame + 1;

    // Reached the last frame, trigger animation end callback.
    if (this.currentFrame == this.lastFrame) {
      this.parent.trigger('animationEnd');
    }
  }
};

module.exports = SpriteAnimation;

},{}],36:[function(require,module,exports){
/**
 * @module Joy
 */

var Sprite = require('./sprite.js');

/**
 * Handles spritesheet animations
 *
 * @class SpriteSheet
 * @constructor
 *
 * @param {Object} options
 *  @param {Object} animations
 */
var SpriteSheet = Sprite.extend({
  init: function (options) {
    this._super(options);

    this.animations = { length: 0 };
    this._frequencyInterval = null;

    // Frames
    this.frames = 1;

    /**
     * Frames per second.
     * @attribute framesPerSecond
     * @alias fps
     * @type {Number}
     */
    this.framesPerSecond = options.framesPerSecond || options.fps || 24;

    // Define animations
    if (options.animations) {
      for (var name in options.animations) {
        this.addAnimation(name, options.animations[name]);
      }
    }

    /**
     * Current running animation name
     * @attribute currentAnimationName
     * @type {String}
     * @readonly
     */
    this.currentAnimationName = 'all';

    // framesPerSecond alias
    Object.defineProperty(this, 'fps', {
      get: function () {
        return this.framesPerSecond;
      },
      configurable: true
    });

    /**
     * @attribute currentAnimation
     * @type {SpriteAnimation}
     * @readonly
     */
    Object.defineProperty(this, 'currentAnimation', {
      get: function () {
        return this.animations[this.currentAnimationName];
      },
      configurable: true
    });

  },

  /**
   * Add animation to sprite sheet.
   * @param {String} name
   * @param {Object, Array} data list of frame numbers or options object
   *   @param {Array} [options.frames] frame indexes
   *   @param {Number} [options.framesPerSecond]
   *
   * @example
   *  spriteSheet.addAnimation("walking", [0, 32]);
   *  spriteSheet.addAnimation("walking", {frames: [0, 32], framesPerSecond: 2});
   *
   * @return {SpriteSheet} this
   */
  addAnimation: function (name, data) {
    this.animations[name] = new Joy.SpriteAnimation({
      parent: this,
      name: name,
      frames: (data instanceof Array) ? data : data.frames,
      framesPerSecond: data.framesPerSecond || this.framesPerSecond
    });

    // Increase animations set length;
    this.animations.length = (this.animations.length || 0) + 1;

    return this;
  },

  onLoad: function () {
    this._super();
    var totalFrames = 1;

    // Check for spritesheet
    if (this._width < this.image.width) {
      totalFrames = this._columns = Math.ceil(this.image.width / this._width);
    }
    if (this._height < this.image.height) {
      totalFrames = totalFrames * (this._rows = Math.ceil(this.image.height / this._height));
    }

    this.addAnimation('all', [0, totalFrames-1]);

    if (this.animations.length === 0 || this.currentAnimation === null) {
      this.play('all');
    }
  },

  /**
   * Play specified animation by name
   * @param {String} animationName
   * @return {SpriteSheet} this
   */
  play: function (animationName) {
    if (this.currentAnimationName != animationName) {
      // Stop previous animation
      if (this.currentAnimation) {
        this.currentAnimation.stop();
      }

      this.currentAnimationName = animationName;

      // Throw error when requested animation doesn't exists.
      if (!this.animations[animationName]) {
        throw new Error("Animation '" + animationName + "' not found on '" + this.id + "'");
      }

      this.animations[animationName].start();
    }
    return this;
  },

  /**
   * Stop current animation
   * @method stop
   * @return {SpriteSheet} this
   */
  stop: function () {
    this.currentAnimation.stop();
  },

  render: function() {
    if (!this.visible) { return; }

    this.ctx.drawImage(this.image,
                       this._width * (this.currentAnimation.currentFrame % this._columns),
                       this._height * ((this.currentAnimation.currentFrame / this._columns) >> 0),
                       this._width,
                       this._height,
                       0,
                       0,
                       this._width,
                       this._height);
  }
});

module.exports = SpriteSheet;

},{"./sprite.js":34}],37:[function(require,module,exports){
/**
 * @module Joy
 */

var DisplayObject = require('./display_object');

/**
 * @property BASELINE
 * @static
 */
var BASELINE = {
  /**
   * @property BASELINE.TOP
   * @type {String}
   * @static
   */
  TOP : 'top',

  /**
   * @property BASELINE.HANGING
   * @type {String}
   * @static
   */
  HANGING : 'hanging',

  /**
   * @property BASELINE.MIDDLE
   * @type {String}
   * @static
   */
  MIDDLE : 'middle',

  /**
   * @property BASELINE.ALPHABETIC
   * @type {String}
   * @static
   */
  ALPHABETIC : 'alphabetic',

  /**
   * @property BASELINE.IDEOGRAPHIC
   * @type {String}
   * @static
   */
  IDEOGRAPHIC : 'ideographic',

  /**
   * @property BASELINE.BOTTOM
   * @type {String}
   * @static
   */
  BOTTOM : 'bottom'
};

/*
 * Default values
 */
var
  DEFAULT_FONT = "Normal 12px Verdana",
  DEFAULT_COLOR = "#000000",
  DEFAULT_ALIGN = "left",
  DEFAULT_BASELINE = BASELINE.TOP;

var Text = DisplayObject.extend({
  /**
   * @class Text
   * @extends DisplayObject
   *
   * @param {Object} options any attribute may be initialized by option
   *   @param {String} [options.text] default - ""
   *   @param {String} [options.font] default - "Normal 12px Verdana"
   *   @param {String} [options.align] default - "left"
   *   @param {String} [options.baseline] default - Joy.Text.BASELINE.TOP
   *   @param {String} [options.color] default - #000000
   *
   * @constructor
   */
  init: function(options) {
    if (typeof(options)==="undefined") {
      options = {};
    }

    this._super(options);

    /**
     * Text to be displayed
     * @attribute text
     * @default ""
     * @type {String}
     */
    this.text = options.text || "";

    /**
     * Font family and size
     * @attribute font
     * @default "Normal 12px Verdana"
     * @type {String}
     */
    this.font = options.font || DEFAULT_FONT;

    /**
     * Text horizontal alignment
     * @attribute align
     * @default "left"
     * @type {String}
     */
    this.align = options.align || DEFAULT_ALIGN;

    /**
     * Text vertical baseline
     * @attribute baseline
     * @default Joy.Text.BASELINE.TOP
     * @type {String}
     */
    this.baseline = options.baseline || DEFAULT_BASELINE;

    /**
     * Color of the text
     * @attribute color
     * @default "#000000"
     * @type {String, Color}
     */
    this._color = options.color || DEFAULT_COLOR;
    Object.defineProperty(this, 'color', {
      get: function () {
        return this._color;
      },
      set: function (color) {
        this._color = color.toString();
      },
      configurable: true
    });

    // this.__defineGetter__('width', function () {
    //   return this.getMeasure().width;
    // })

    // this.__defineGetter__('height', function () {
    //   return parseInt(this.font, 10);
    // })

    if (options.stroke) {
      this.useStroke();
    } else {
      this.useFill();
    }

  },

  /**
   * @method useStroke
   */
  useStroke: function() {
    this.stroke = true;
    this.fillMethod = "strokeText";
    this.styleMethod = "strokeStyle";
  },

  /**
   * @method useFill
   */
  useFill: function() {
    this.stroke = false;
    this.fillMethod = "fillText";
    this.styleMethod = "fillStyle";
  },

  updateContext: function() {
    this._super();

    this.ctx.font = this.font;
    this.ctx.textAlign = this.align;
    this.ctx.textBaseline = this.baseline;

    this.ctx[this.styleMethod] = this.color;
    this.ctx[this.fillMethod](this.text, 0, 0);
  },

  /**
   * @method getMeasure
   * @return {TextMetrics} text metrics
   */
  getMeasure: function() {
    return this.ctx.measureText(this.text);
  }

});

Text.BASELINE = BASELINE;
module.exports = Text;

},{"./display_object":28}],38:[function(require,module,exports){
/**
 * @module Joy
 */
var DisplayObjectContainer = require('./display_object_container.js');

var Tilemap = DisplayObjectContainer.extend({
  /**
   * @class Tilemap
   * @constructor
   * @param {Object} options
   */
  init: function (options) {
    if (!(options.tileset instanceof Joy.Tileset)) {
      throw new Error("'tileset' must be given on Tilemap constructor, as Sprite instance.");
    }
    this._super(options);

    /**
     * @attribute tileset
     * @type {Tileset}
     */
    this.tileset = options.tileset;

    /**
     * @attribute lines
     * @type {Number}
     */
    this.lines = options.lines || 1;

    /**
     * @attribute columns
     * @type {Number}
     */
    this.columns = options.columns || 1;

    /**
     * @attribute data
     * @type {Array}
     */
    Object.defineProperty(this, 'data', {
      get: function () {
        return this._data;
      },
      set: function (data) {
        this._data = data;

        if (this.collider == this || this.collider instanceof Joy.TilemapCollider) {
          this.collider = new Joy.TilemapCollider(this);
        }
      },
      configurable: true
    });
    this.data = options.data;

    /**
     * @attribute height
     * @readonly
     * @type {Number}
     */
    Object.defineProperty(this, 'height', {
      get: function () {
        return this.lines * this.tileset.tileHeight;
      },
      configurable: true
    });

    /**
     * @attribute width
     * @readonly
     * @type {Number}
     */
    Object.defineProperty(this, 'width', {
      get: function () {
        return this.columns * this.tileset.tileWidth;
      },
      configurable: true
    });

    // Propagate ADDED event to tileset.
    this.bind(Joy.Events.ADDED, function () {
      this.tileset.trigger(Joy.Events.ADDED);
    });
  },

  renderChildren: function () {
    for (var i=0, length = this.data.length; i < length; ++i) {
      if (this.data[i] === 0) { continue; }

      this.ctx.drawImage(this.tileset.image,
                         this.tileset.tileWidth * ((this.data[i]-1) % this.tileset.columns),
                         this.tileset.tileHeight * (((this.data[i]-1) / this.tileset.columns) >> 0),
                         this.tileset.tileWidth,
                         this.tileset.tileHeight,
                         this.tileset.tileWidth * (i % this.columns),
                         this.tileset.tileHeight * ((i / this.columns) >> 0),
                         this.tileset.tileWidth,
                         this.tileset.tileHeight);
    }
  }

});

module.exports = Tilemap;

},{"./display_object_container.js":29}],39:[function(require,module,exports){
/**
 * @module Joy
 */
var Sprite = require('./sprite');

var Tileset = Sprite.extend({
  /**
   * @class Tileset
   * @constructor
   * @param {Object} options
   *   @param {String} [options.src]
   *   @param {Number} [options.width] tile width
   *   @param {Number} [options.height] tile height
   */
  init: function(options) {
    this.tileWidth = options.width;
    this.tileHeight = options.height;

    delete options.width;
    delete options.height;

    this._super(options);
  },

  onLoad: function() {
    this._super();

    this.columns = (this._width / this.tileWidth) >> 0;
    this.lines = (this._height / this.tileHeight) >> 0;
  }
});

module.exports = Tileset;

},{"./sprite":34}],40:[function(require,module,exports){
/**
 * @module Joy
 */
var Triggerable = require('../core/triggerable');
var Utils = require('../util/utils');
var Events = require('../consts/events');
var Vector2d = require('../math/vector2d');
var DisplayObjectContainer = require('./display_object_container');

var Viewport = Triggerable.extend({
  /**
   * @class Viewport
   * @constructor
   *
   * @param {Object} options
   * @param {DisplayObject} options.follow
   * @param {Number} options.width
   * @param {Number} options.height
   */
  init: function (options) {
    this._super(options);
    this.id = options.id || Utils.generateUniqueId();

    /**
     * @attribute position
     * @type {Vector2d}
     */
    this.position = new Vector2d();
    this._lastPosition = new Vector2d();

    /**
     * Current viewport translation offset
     * @attribute translation
     * @type {Vector2d}
     */
    this.translation = new Vector2d();

    /**
     * Container DisplayObject
     * @attribute scene
     * @type {DisplayObjectContainer}
     */
    if (options.scene) {
      this.scene = options.scene;
      this.ctx = this.scene.ctx;
    }

    /**
     * @attribute hud
     * @type {DisplayObjectContainer}
     */
    this.hud = new DisplayObjectContainer({id: this.id + "_HUD", ctx: this.ctx});
    this.hud.position = this.position;

    /**
     * @attribute active
     * @type {Boolean}
     * @readonly
     */
    this.active = true;

    this._translationTotal = new Vector2d();

    this.setup(options);
  },

  /**
   * Add head up display on the viewport.
   * @method addHud
   * @param {DisplayObject}
   * @return {Viewport}
   */
  addHud: function (displayObject) {
    return this.hud.addChild(displayObject);
  },

  setup: function (options) {
    /**
     * @attribute width
     * @type {Number}
     */
    this.width = options.width || this.scene.ctx.canvas.width;

    /**
     * @attribute height
     * @type {Number}
     */
    this.height = options.height || this.scene.ctx.canvas.height;

    /**
     * DisplayObject that will be followed.
     * @attribute follow
     * @type {DisplayObject}
     */
    if (options.follow) {
      this.follow = options.follow;
    }

    this.scale = new Vector2d(1, 1);

    // Set viewport size when scene is active.
    this.bind(Events.SCENE_ACTIVE, function () {
      if (this.width && this.height) {
        this.setSize(this.width, this.height);
      }

      // Trigger setup
      this.trigger('setup');
    });

  },

  /**
   * @method setSize
   * @param {Number} width
   * @param {Number} height
   * @return {Viewport}
   */
  setSize: function (width, height) {
    this.reset();

    this.width = width;
    this.height = height;

    this.ctx.scale((this.ctx.canvas.width / this.width) * this.scale.x, (this.ctx.canvas.height / this.height) * this.scale.y);

    this.scale.x = this.width / this.ctx.canvas.width;
    this.scale.y = this.height / this.ctx.canvas.height;

    return this;
  },

  /**
   * TODO: not supported yet
   * method setDeadzone
   * param {Number} width
   * param {Number} height
   * return {Viewport} this
   */
  setDeadzone: function(width, height) {
    this.deadzone = new Vector2d(width, height);
    return this;
  },

  updateContext: function() {
    var widthLimit = this.width / 2,
        heightLimit = this.height / 2;

    this.position.x = ~~ (this.follow.position.x + (this.follow.width / 2) - (this.width / 2));
    this.position.y = ~~ (this.follow.position.y + (this.follow.height / 2) - (this.height / 2));

    this.translation.x = -this.position.x + this._lastPosition.x;
    this.translation.y = -this.position.y + this._lastPosition.y;

    this._translationTotal.sum(this.translation);

    if (this.active) {
      this.trigger('translate');
      this.ctx.translate(this.translation.x,  this.translation.y);
    }

    this._lastPosition.x = this.position.x;
    this._lastPosition.y = this.position.y;
  },

  render: function () {
    this.hud.render();
  },

  /**
   * Restore context translation
   * @method reset
   * @return {Viewport} this
   */
  reset: function () {
    this.translation.x = -this._translationTotal.x;
    this.translation.y = -this._translationTotal.y;

    this.ctx.translate(this.translation.x, this.translation.y);
    this.trigger('translate');

    this._translationTotal.set(0, 0);
    this._lastPosition.set(0, 0);
    return this;
  }

});

module.exports = Viewport;

},{"../consts/events":9,"../core/triggerable":14,"../math/vector2d":25,"../util/utils":44,"./display_object_container":29}],41:[function(require,module,exports){
/**
 * @module Joy
 */

/**
 * @param {String | Number} hexOrRed hexadecimal color (String), or red (Number)
 * @param {Number} green
 * @param {Number} blue
 * @param {Number} alpha
 *
 * @example
 *     // color name
 *     var color = new Joy.Color("red");
 *
 * @example
 *     // hexadecimal
 *     var color = new Joy.Color("#fff");
 *
 * @example
 *     // rgb
 *     var color = new Joy.Color(255, 50, 255);
 *
 * @example
 *     // rgba
 *     var color = new Joy.Color(255, 50, 255, 100);
 *
 * @class Color
 * @constructor
 */
var Color = function(r, g, b, a) {
  this.red = r;
  this.green = g;
  this.blue = b;
  this.alpha = a;
};

/**
 * Get color definition as CSS string.
 * @method toString
 * @return {String}
 */
Color.prototype.toString = function() {
  if (!this.green && !this.blue) {
    return this.red;
  } else if (this.alpha) {
    return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
  } else {
    return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
  }
};

module.exports = Color;

},{}],42:[function(require,module,exports){
/**
 * @module Joy
 */
var Triggerable = require('../core/triggerable');

var Loader = Triggerable.extend({
  /**
   * @class Loader
   */
  init: function() {
    this._super();

    this.assets = [];
    this.loaded = 0;

    /**
     * Loaded percentage
     * @property percentage
     * @type {Number}
     */
    Object.defineProperty(this, 'percentage', {
      get: function () {
        return Math.round((this.loaded / this.assets.length) * 100);
      },
      configurable: true
    });

    /**
     * Is loading?
     * @property loading
     * @type {Boolean}
     */
    Object.defineProperty(this, 'loading', {
      get: function () {
        return this.assets.length !== this.loaded;
      },
      configurable: true
    });

    /**
     * Completed?
     * @property loading
     * @type {Boolean}
     */
    Object.defineProperty(this, 'completed', {
      get: function () {
        return (this.assets.length > 0) && !this.loading;
      },
      configurable: true
    });
  },

  add: function(asset) {
    var that = this;
    this.assets.push(asset);

    asset.addEventListener('load', function() {
      that.loaded += 1;

      that.trigger('loadProgress');

      // Trigger load complete
      if (that.loaded == that.assets.length) {
        that.trigger('loadComplete');
      }
    });
  }

});

module.exports = Loader;

},{"../core/triggerable":14}],43:[function(require,module,exports){
/**
 * @module Joy
 */

/**
 * @class Shader
 */
var Shader = function() {};

/**
 * Process
 * @method process
 * @param {CanvasRenderingContext2D} ctx
 * @param {Function} method
 * @static
 */
Shader.process = function(ctx, method) {
  var imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  method.call(this, imageData);
  ctx.putImageData(imageData, 0, 0);
};

/*
 * Blur filter extracted from: http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html
 */
var blur_mul_table = [ 512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512, 454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512, 482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456, 437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512, 497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328, 320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456, 446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335, 329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512, 505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405, 399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328, 324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271, 268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456, 451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388, 385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335, 332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292, 289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];
var blur_shg_table = [ 9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];

Shader.blur = function(imageData) {
  var index = 0, next;
  var BlurStack = function () {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
  };

  var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
      r_out_sum, g_out_sum, b_out_sum,
      r_in_sum, g_in_sum, b_in_sum,
      pixels = imageData.data,
      pr, pg, pb, rbs, radius = 5, width = imageData.width, height = imageData.height;

  var div = radius + radius + 1;
  var w4 = width << 2;
  var widthMinus1  = width - 1;
  var heightMinus1 = height - 1;
  var radiusPlus1  = radius + 1;
  var sumFactor = radiusPlus1 * ( radiusPlus1 + 1 ) / 2;

  var stackStart = new BlurStack();
  var stackEnd;
  var stack = stackStart;
  for ( i = 1; i < div; i++ )
  {
    stack = stack.next = new BlurStack();
    if ( i == radiusPlus1 ) stackEnd = stack;
  }
  stack.next = stackStart;
  var stackIn = null;
  var stackOut = null;

  yw = yi = 0;

  var mul_sum = blur_mul_table[radius];
  var shg_sum = blur_shg_table[radius];

  for ( y = 0; y < height; y++ )
  {
    r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;

    r_out_sum = radiusPlus1 * ( pr = pixels[yi] );
    g_out_sum = radiusPlus1 * ( pg = pixels[yi+1] );
    b_out_sum = radiusPlus1 * ( pb = pixels[yi+2] );

    r_sum += sumFactor * pr;
    g_sum += sumFactor * pg;
    b_sum += sumFactor * pb;

    stack = stackStart;

    for( i = 0; i < radiusPlus1; i++ )
    {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack = stack.next;
    }

    for( i = 1; i < radiusPlus1; i++ )
    {
      p = yi + (( widthMinus1 < i ? widthMinus1 : i ) << 2 );
      r_sum += ( stack.r = ( pr = pixels[p])) * ( rbs = radiusPlus1 - i );
      g_sum += ( stack.g = ( pg = pixels[p+1])) * rbs;
      b_sum += ( stack.b = ( pb = pixels[p+2])) * rbs;

      r_in_sum += pr;
      g_in_sum += pg;
      b_in_sum += pb;

      stack = stack.next;
    }


    stackIn = stackStart;
    stackOut = stackEnd;
    for ( x = 0; x < width; x++ )
    {
      pixels[yi]   = (r_sum * mul_sum) >> shg_sum;
      pixels[yi+1] = (g_sum * mul_sum) >> shg_sum;
      pixels[yi+2] = (b_sum * mul_sum) >> shg_sum;

      r_sum -= r_out_sum;
      g_sum -= g_out_sum;
      b_sum -= b_out_sum;

      r_out_sum -= stackIn.r;
      g_out_sum -= stackIn.g;
      b_out_sum -= stackIn.b;

      p =  ( yw + ( ( p = x + radius + 1 ) < widthMinus1 ? p : widthMinus1 ) ) << 2;

      r_in_sum += ( stackIn.r = pixels[p]);
      g_in_sum += ( stackIn.g = pixels[p+1]);
      b_in_sum += ( stackIn.b = pixels[p+2]);

      r_sum += r_in_sum;
      g_sum += g_in_sum;
      b_sum += b_in_sum;

      stackIn = stackIn.next;

      r_out_sum += ( pr = stackOut.r );
      g_out_sum += ( pg = stackOut.g );
      b_out_sum += ( pb = stackOut.b );

      r_in_sum -= pr;
      g_in_sum -= pg;
      b_in_sum -= pb;

      stackOut = stackOut.next;

      yi += 4;
    }
    yw += width;
  }


  for ( x = 0; x < width; x++ )
  {
    g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;

    yi = x << 2;
    r_out_sum = radiusPlus1 * ( pr = pixels[yi]);
    g_out_sum = radiusPlus1 * ( pg = pixels[yi+1]);
    b_out_sum = radiusPlus1 * ( pb = pixels[yi+2]);

    r_sum += sumFactor * pr;
    g_sum += sumFactor * pg;
    b_sum += sumFactor * pb;

    stack = stackStart;

    for( i = 0; i < radiusPlus1; i++ )
    {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack = stack.next;
    }

    yp = width;

    for( i = 1; i <= radius; i++ )
    {
      yi = ( yp + x ) << 2;

      r_sum += ( stack.r = ( pr = pixels[yi])) * ( rbs = radiusPlus1 - i );
      g_sum += ( stack.g = ( pg = pixels[yi+1])) * rbs;
      b_sum += ( stack.b = ( pb = pixels[yi+2])) * rbs;

      r_in_sum += pr;
      g_in_sum += pg;
      b_in_sum += pb;

      stack = stack.next;

      if( i < heightMinus1 )
        {
          yp += width;
        }
    }

    yi = x;
    stackIn = stackStart;
    stackOut = stackEnd;
    for ( y = 0; y < height; y++ )
    {
      p = yi << 2;
      pixels[p]   = (r_sum * mul_sum) >> shg_sum;
      pixels[p+1] = (g_sum * mul_sum) >> shg_sum;
      pixels[p+2] = (b_sum * mul_sum) >> shg_sum;

      r_sum -= r_out_sum;
      g_sum -= g_out_sum;
      b_sum -= b_out_sum;

      r_out_sum -= stackIn.r;
      g_out_sum -= stackIn.g;
      b_out_sum -= stackIn.b;

      p = ( x + (( ( p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;

      r_sum += ( r_in_sum += ( stackIn.r = pixels[p]));
      g_sum += ( g_in_sum += ( stackIn.g = pixels[p+1]));
      b_sum += ( b_in_sum += ( stackIn.b = pixels[p+2]));

      stackIn = stackIn.next;

      r_out_sum += ( pr = stackOut.r );
      g_out_sum += ( pg = stackOut.g );
      b_out_sum += ( pb = stackOut.b );

      r_in_sum -= pr;
      g_in_sum -= pg;
      b_in_sum -= pb;

      stackOut = stackOut.next;

      yi += width;
    }
  }
};

/**
 * Noise pixel shader
 * @method noise
 * @param {ImageData} imageData
 * @static
 */
Shader.noise = function(imageData) {
  var index = 0, x, y, random;
  for (x=0; x < imageData.width; ++x) {
    for (y=0; y < imageData.height; ++y) {
      random = Math.random() * 0.8;
      index = (x * 4) + (y * (imageData.width * 4));
      imageData.data[index] *= random; // red channel
      imageData.data[index+1] *= random; // green channel
      imageData.data[index+2] *= random; // blue channel
    }
  }
};

module.exports == Shader;

},{}],44:[function(require,module,exports){
/**
* @module Joy
*/

/**
 * @class Utils
 * @static
 */
var Utils = {

  /**
   * @method applyFriction
   * @param {Number} v velocity
   * @param {Number} f friction
   * @return {Number}
   */
  applyFriction: function(v, f) {
    return (v + f < 0) ? v + (f * Joy.deltaTime) : (v - f > 0) ? v - (f * Joy.deltaTime) : 0;
  },

  /**
   * @method generateUniqueId
   * @return {String}
   */
  generateUniqueId: function () {
    return "joy" + (new Date().getTime());
  }

};

module.exports = Utils;

},{}],45:[function(require,module,exports){
/*!
 *  howler.js v1.1.24
 *  howlerjs.com
 *
 *  (c) 2013-2014, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

(function() {
  // setup
  var cache = {};

  // setup the audio context
  var ctx = null,
    usingWebAudio = true,
    noAudio = false;
  try {
    if (typeof AudioContext !== 'undefined') {
      ctx = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
      ctx = new webkitAudioContext();
    } else {
      usingWebAudio = false;
    }
  } catch(e) {
    usingWebAudio = false;
  }

  if (!usingWebAudio) {
    if (typeof Audio !== 'undefined') {
      try {
        new Audio();
      } catch(e) {
        noAudio = true;
      }
    } else {
      noAudio = true;
    }
  }

  // create a master gain node
  if (usingWebAudio) {
    var masterGain = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);
  }

  // create global controller
  var HowlerGlobal = function(codecs) {
    this._volume = 1;
    this._muted = false;
    this.usingWebAudio = usingWebAudio;
    this.noAudio = noAudio;
    this._howls = [];
    this._codecs = codecs;
    this.iOSAutoEnable = true;
  };
  HowlerGlobal.prototype = {
    /**
     * Get/set the global volume for all sounds.
     * @param  {Float} vol Volume from 0.0 to 1.0.
     * @return {Howler/Float}     Returns self or current volume.
     */
    volume: function(vol) {
      var self = this;

      // make sure volume is a number
      vol = parseFloat(vol);

      if (vol >= 0 && vol <= 1) {
        self._volume = vol;

        if (usingWebAudio) {
          masterGain.gain.value = vol;
        }

        // loop through cache and change volume of all nodes that are using HTML5 Audio
        for (var key in self._howls) {
          if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
            // loop through the audio nodes
            for (var i=0; i<self._howls[key]._audioNode.length; i++) {
              self._howls[key]._audioNode[i].volume = self._howls[key]._volume * self._volume;
            }
          }
        }

        return self;
      }

      // return the current global volume
      return (usingWebAudio) ? masterGain.gain.value : self._volume;
    },

    /**
     * Mute all sounds.
     * @return {Howler}
     */
    mute: function() {
      this._setMuted(true);

      return this;
    },

    /**
     * Unmute all sounds.
     * @return {Howler}
     */
    unmute: function() {
      this._setMuted(false);

      return this;
    },

    /**
     * Handle muting and unmuting globally.
     * @param  {Boolean} muted Is muted or not.
     */
    _setMuted: function(muted) {
      var self = this;

      self._muted = muted;

      if (usingWebAudio) {
        masterGain.gain.value = muted ? 0 : self._volume;
      }

      for (var key in self._howls) {
        if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
          // loop through the audio nodes
          for (var i=0; i<self._howls[key]._audioNode.length; i++) {
            self._howls[key]._audioNode[i].muted = muted;
          }
        }
      }
    },

    /**
     * Check for codec support.
     * @param  {String} ext Audio file extention.
     * @return {Boolean}
     */
    codecs: function(ext) {
      return this._codecs[ext];
    },

    /**
     * iOS will only allow audio to be played after a user interaction.
     * Attempt to automatically unlock audio on the first user interaction.
     * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
     * @return {Howler}
     */
    _enableiOSAudio: function() {
      var self = this;

      // only run this on iOS if audio isn't already eanbled
      if (ctx && (self._iOSEnabled || !/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
        return;
      }

      self._iOSEnabled = false;

      // call this method on touch start to create and play a buffer,
      // then check if the audio actually played to determine if
      // audio has now been unlocked on iOS
      var unlock = function() {
        // create an empty buffer
        var buffer = ctx.createBuffer(1, 1, 22050);
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);

        // play the empty buffer
        if (typeof source.start === 'undefined') {
          source.noteOn(0);
        } else {
          source.start(0);
        }

        // setup a timeout to check that we are unlocked on the next event loop
        setTimeout(function() {
          if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
            // update the unlocked state and prevent this check from happening again
            self._iOSEnabled = true;
            self.iOSAutoEnable = false;

            // remove the touch start listener
            window.removeEventListener('touchstart', unlock, false);
          }
        }, 0);
      };

      // setup a touch start listener to attempt an unlock in
      window.addEventListener('touchstart', unlock, false);

      return self;
    }
  };

  // check for browser codec support
  var audioTest = null;
  var codecs = {};
  if (!noAudio) {
    audioTest = new Audio();
    codecs = {
      mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''),
      opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
      ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
      wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
      aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
      m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
    };
  }

  // allow access to the global audio controls
  var Howler = new HowlerGlobal(codecs);

  // setup the audio object
  var Howl = function(o) {
    var self = this;

    // setup the defaults
    self._autoplay = o.autoplay || false;
    self._buffer = o.buffer || false;
    self._duration = o.duration || 0;
    self._format = o.format || null;
    self._loop = o.loop || false;
    self._loaded = false;
    self._sprite = o.sprite || {};
    self._src = o.src || '';
    self._pos3d = o.pos3d || [0, 0, -0.5];
    self._volume = o.volume !== undefined ? o.volume : 1;
    self._urls = o.urls || [];
    self._rate = o.rate || 1;

    // allow forcing of a specific panningModel ('equalpower' or 'HRTF'),
    // if none is specified, defaults to 'equalpower' and switches to 'HRTF'
    // if 3d sound is used
    self._model = o.model || null;

    // setup event functions
    self._onload = [o.onload || function() {}];
    self._onloaderror = [o.onloaderror || function() {}];
    self._onend = [o.onend || function() {}];
    self._onpause = [o.onpause || function() {}];
    self._onplay = [o.onplay || function() {}];

    self._onendTimer = [];

    // Web Audio or HTML5 Audio?
    self._webAudio = usingWebAudio && !self._buffer;

    // check if we need to fall back to HTML5 Audio
    self._audioNode = [];
    if (self._webAudio) {
      self._setupAudioNode();
    }

    // automatically try to enable audio on iOS
    if (typeof ctx !== 'undefined' && ctx && Howler.iOSAutoEnable) {
      Howler._enableiOSAudio();
    }

    // add this to an array of Howl's to allow global control
    Howler._howls.push(self);

    // load the track
    self.load();
  };

  // setup all of the methods
  Howl.prototype = {
    /**
     * Load an audio file.
     * @return {Howl}
     */
    load: function() {
      var self = this,
        url = null;

      // if no audio is available, quit immediately
      if (noAudio) {
        self.on('loaderror');
        return;
      }

      // loop through source URLs and pick the first one that is compatible
      for (var i=0; i<self._urls.length; i++) {
        var ext, urlItem;

        if (self._format) {
          // use specified audio format if available
          ext = self._format;
        } else {
          // figure out the filetype (whether an extension or base64 data)
          urlItem = self._urls[i];
          ext = /^data:audio\/([^;,]+);/i.exec(urlItem);
          if (!ext) {
            ext = /\.([^.]+)$/.exec(urlItem.split('?', 1)[0]);
          }

          if (ext) {
            ext = ext[1].toLowerCase();
          } else {
            self.on('loaderror');
            return;
          }
        }

        if (codecs[ext]) {
          url = self._urls[i];
          break;
        }
      }

      if (!url) {
        self.on('loaderror');
        return;
      }

      self._src = url;

      if (self._webAudio) {
        loadBuffer(self, url);
      } else {
        var newNode = new Audio();

        // listen for errors with HTML5 audio (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror)
        newNode.addEventListener('error', function () {
          if (newNode.error && newNode.error.code === 4) {
            HowlerGlobal.noAudio = true;
          }

          self.on('loaderror', {type: newNode.error ? newNode.error.code : 0});
        }, false);

        self._audioNode.push(newNode);

        // setup the new audio node
        newNode.src = url;
        newNode._pos = 0;
        newNode.preload = 'auto';
        newNode.volume = (Howler._muted) ? 0 : self._volume * Howler.volume();

        // add this sound to the cache
        cache[url] = self;

        // setup the event listener to start playing the sound
        // as soon as it has buffered enough
        var listener = function() {
          // round up the duration when using HTML5 Audio to account for the lower precision
          self._duration = Math.ceil(newNode.duration * 10) / 10;

          // setup a sprite if none is defined
          if (Object.getOwnPropertyNames(self._sprite).length === 0) {
            self._sprite = {_default: [0, self._duration * 1000]};
          }

          if (!self._loaded) {
            self._loaded = true;
            self.on('load');
          }

          if (self._autoplay) {
            self.play();
          }

          // clear the event listener
          newNode.removeEventListener('canplaythrough', listener, false);
        };
        newNode.addEventListener('canplaythrough', listener, false);
        newNode.load();
      }

      return self;
    },

    /**
     * Get/set the URLs to be pulled from to play in this source.
     * @param  {Array} urls  Arry of URLs to load from
     * @return {Howl}        Returns self or the current URLs
     */
    urls: function(urls) {
      var self = this;

      if (urls) {
        self.stop();
        self._urls = (typeof urls === 'string') ? [urls] : urls;
        self._loaded = false;
        self.load();

        return self;
      } else {
        return self._urls;
      }
    },

    /**
     * Play a sound from the current time (0 by default).
     * @param  {String}   sprite   (optional) Plays from the specified position in the sound sprite definition.
     * @param  {Function} callback (optional) Returns the unique playback id for this sound instance.
     * @return {Howl}
     */
    play: function(sprite, callback) {
      var self = this;

      // if no sprite was passed but a callback was, update the variables
      if (typeof sprite === 'function') {
        callback = sprite;
      }

      // use the default sprite if none is passed
      if (!sprite || typeof sprite === 'function') {
        sprite = '_default';
      }

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.play(sprite, callback);
        });

        return self;
      }

      // if the sprite doesn't exist, play nothing
      if (!self._sprite[sprite]) {
        if (typeof callback === 'function') callback();
        return self;
      }

      // get the node to playback
      self._inactiveNode(function(node) {
        // persist the sprite being played
        node._sprite = sprite;

        // determine where to start playing from
        var pos = (node._pos > 0) ? node._pos : self._sprite[sprite][0] / 1000;

        // determine how long to play for
        var duration = 0;
        if (self._webAudio) {
          duration = self._sprite[sprite][1] / 1000 - node._pos;
          if (node._pos > 0) {
            pos = self._sprite[sprite][0] / 1000 + pos;
          }
        } else {
          duration = self._sprite[sprite][1] / 1000 - (pos - self._sprite[sprite][0] / 1000);
        }

        // determine if this sound should be looped
        var loop = !!(self._loop || self._sprite[sprite][2]);

        // set timer to fire the 'onend' event
        var soundId = (typeof callback === 'string') ? callback : Math.round(Date.now() * Math.random()) + '',
          timerId;
        (function() {
          var data = {
            id: soundId,
            sprite: sprite,
            loop: loop
          };
          timerId = setTimeout(function() {
            // if looping, restart the track
            if (!self._webAudio && loop) {
              self.stop(data.id).play(sprite, data.id);
            }

            // set web audio node to paused at end
            if (self._webAudio && !loop) {
              self._nodeById(data.id).paused = true;
              self._nodeById(data.id)._pos = 0;

              // clear the end timer
              self._clearEndTimer(data.id);
            }

            // end the track if it is HTML audio and a sprite
            if (!self._webAudio && !loop) {
              self.stop(data.id);
            }

            // fire ended event
            self.on('end', soundId);
          }, duration * 1000);

          // store the reference to the timer
          self._onendTimer.push({timer: timerId, id: data.id});
        })();

        if (self._webAudio) {
          var loopStart = self._sprite[sprite][0] / 1000,
            loopEnd = self._sprite[sprite][1] / 1000;

          // set the play id to this node and load into context
          node.id = soundId;
          node.paused = false;
          refreshBuffer(self, [loop, loopStart, loopEnd], soundId);
          self._playStart = ctx.currentTime;
          node.gain.value = self._volume;

          if (typeof node.bufferSource.start === 'undefined') {
            node.bufferSource.noteGrainOn(0, pos, duration);
          } else {
            node.bufferSource.start(0, pos, duration);
          }
        } else {
          if (node.readyState === 4 || !node.readyState && navigator.isCocoonJS) {
            node.readyState = 4;
            node.id = soundId;
            node.currentTime = pos;
            node.muted = Howler._muted || node.muted;
            node.volume = self._volume * Howler.volume();
            setTimeout(function() { node.play(); }, 0);
          } else {
            self._clearEndTimer(soundId);

            (function(){
              var sound = self,
                playSprite = sprite,
                fn = callback,
                newNode = node;
              var listener = function() {
                sound.play(playSprite, fn);

                // clear the event listener
                newNode.removeEventListener('canplaythrough', listener, false);
              };
              newNode.addEventListener('canplaythrough', listener, false);
            })();

            return self;
          }
        }

        // fire the play event and send the soundId back in the callback
        self.on('play');
        if (typeof callback === 'function') callback(soundId);

        return self;
      });

      return self;
    },

    /**
     * Pause playback and save the current position.
     * @param {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    pause: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.pause(id);
        });

        return self;
      }

      // clear 'onend' timer
      self._clearEndTimer(id);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        activeNode._pos = self.pos(null, id);

        if (self._webAudio) {
          // make sure the sound has been created
          if (!activeNode.bufferSource || activeNode.paused) {
            return self;
          }

          activeNode.paused = true;
          if (typeof activeNode.bufferSource.stop === 'undefined') {
            activeNode.bufferSource.noteOff(0);
          } else {
            activeNode.bufferSource.stop(0);
          }
        } else {
          activeNode.pause();
        }
      }

      self.on('pause');

      return self;
    },

    /**
     * Stop playback and reset to start.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl}
     */
    stop: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.stop(id);
        });

        return self;
      }

      // clear 'onend' timer
      self._clearEndTimer(id);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        activeNode._pos = 0;

        if (self._webAudio) {
          // make sure the sound has been created
          if (!activeNode.bufferSource || activeNode.paused) {
            return self;
          }

          activeNode.paused = true;

          if (typeof activeNode.bufferSource.stop === 'undefined') {
            activeNode.bufferSource.noteOff(0);
          } else {
            activeNode.bufferSource.stop(0);
          }
        } else if (!isNaN(activeNode.duration)) {
          activeNode.pause();
          activeNode.currentTime = 0;
        }
      }

      return self;
    },

    /**
     * Mute this sound.
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    mute: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.mute(id);
        });

        return self;
      }

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (self._webAudio) {
          activeNode.gain.value = 0;
        } else {
          activeNode.muted = true;
        }
      }

      return self;
    },

    /**
     * Unmute this sound.
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    unmute: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.unmute(id);
        });

        return self;
      }

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (self._webAudio) {
          activeNode.gain.value = self._volume;
        } else {
          activeNode.muted = false;
        }
      }

      return self;
    },

    /**
     * Get/set volume of this sound.
     * @param  {Float}  vol Volume from 0.0 to 1.0.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl/Float}     Returns self or current volume.
     */
    volume: function(vol, id) {
      var self = this;

      // make sure volume is a number
      vol = parseFloat(vol);

      if (vol >= 0 && vol <= 1) {
        self._volume = vol;

        // if the sound hasn't been loaded, add it to the event queue
        if (!self._loaded) {
          self.on('play', function() {
            self.volume(vol, id);
          });

          return self;
        }

        var activeNode = (id) ? self._nodeById(id) : self._activeNode();
        if (activeNode) {
          if (self._webAudio) {
            activeNode.gain.value = vol;
          } else {
            activeNode.volume = vol * Howler.volume();
          }
        }

        return self;
      } else {
        return self._volume;
      }
    },

    /**
     * Get/set whether to loop the sound.
     * @param  {Boolean} loop To loop or not to loop, that is the question.
     * @return {Howl/Boolean}      Returns self or current looping value.
     */
    loop: function(loop) {
      var self = this;

      if (typeof loop === 'boolean') {
        self._loop = loop;

        return self;
      } else {
        return self._loop;
      }
    },

    /**
     * Get/set sound sprite definition.
     * @param  {Object} sprite Example: {spriteName: [offset, duration, loop]}
     *                @param {Integer} offset   Where to begin playback in milliseconds
     *                @param {Integer} duration How long to play in milliseconds
     *                @param {Boolean} loop     (optional) Set true to loop this sprite
     * @return {Howl}        Returns current sprite sheet or self.
     */
    sprite: function(sprite) {
      var self = this;

      if (typeof sprite === 'object') {
        self._sprite = sprite;

        return self;
      } else {
        return self._sprite;
      }
    },

    /**
     * Get/set the position of playback.
     * @param  {Float}  pos The position to move current playback to.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl/Float}      Returns self or current playback position.
     */
    pos: function(pos, id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.pos(pos);
        });

        return typeof pos === 'number' ? self : self._pos || 0;
      }

      // make sure we are dealing with a number for pos
      pos = parseFloat(pos);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (pos >= 0) {
          self.pause(id);
          activeNode._pos = pos;
          self.play(activeNode._sprite, id);

          return self;
        } else {
          return self._webAudio ? activeNode._pos + (ctx.currentTime - self._playStart) : activeNode.currentTime;
        }
      } else if (pos >= 0) {
        return self;
      } else {
        // find the first inactive node to return the pos for
        for (var i=0; i<self._audioNode.length; i++) {
          if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
            return (self._webAudio) ? self._audioNode[i]._pos : self._audioNode[i].currentTime;
          }
        }
      }
    },

    /**
     * Get/set the 3D position of the audio source.
     * The most common usage is to set the 'x' position
     * to affect the left/right ear panning. Setting any value higher than
     * 1.0 will begin to decrease the volume of the sound as it moves further away.
     * NOTE: This only works with Web Audio API, HTML5 Audio playback
     * will not be affected.
     * @param  {Float}  x  The x-position of the playback from -1000.0 to 1000.0
     * @param  {Float}  y  The y-position of the playback from -1000.0 to 1000.0
     * @param  {Float}  z  The z-position of the playback from -1000.0 to 1000.0
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl/Array}   Returns self or the current 3D position: [x, y, z]
     */
    pos3d: function(x, y, z, id) {
      var self = this;

      // set a default for the optional 'y' & 'z'
      y = (typeof y === 'undefined' || !y) ? 0 : y;
      z = (typeof z === 'undefined' || !z) ? -0.5 : z;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.pos3d(x, y, z, id);
        });

        return self;
      }

      if (x >= 0 || x < 0) {
        if (self._webAudio) {
          var activeNode = (id) ? self._nodeById(id) : self._activeNode();
          if (activeNode) {
            self._pos3d = [x, y, z];
            activeNode.panner.setPosition(x, y, z);
            activeNode.panner.panningModel = self._model || 'HRTF';
          }
        }
      } else {
        return self._pos3d;
      }

      return self;
    },

    /**
     * Fade a currently playing sound between two volumes.
     * @param  {Number}   from     The volume to fade from (0.0 to 1.0).
     * @param  {Number}   to       The volume to fade to (0.0 to 1.0).
     * @param  {Number}   len      Time in milliseconds to fade.
     * @param  {Function} callback (optional) Fired when the fade is complete.
     * @param  {String}   id       (optional) The play instance ID.
     * @return {Howl}
     */
    fade: function(from, to, len, callback, id) {
      var self = this,
        diff = Math.abs(from - to),
        dir = from > to ? 'down' : 'up',
        steps = diff / 0.01,
        stepTime = len / steps;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.fade(from, to, len, callback, id);
        });

        return self;
      }

      // set the volume to the start position
      self.volume(from, id);

      for (var i=1; i<=steps; i++) {
        (function() {
          var change = self._volume + (dir === 'up' ? 0.01 : -0.01) * i,
            vol = Math.round(1000 * change) / 1000,
            toVol = to;

          setTimeout(function() {
            self.volume(vol, id);

            if (vol === toVol) {
              if (callback) callback();
            }
          }, stepTime * i);
        })();
      }
    },

    /**
     * [DEPRECATED] Fade in the current sound.
     * @param  {Float}    to      Volume to fade to (0.0 to 1.0).
     * @param  {Number}   len     Time in milliseconds to fade.
     * @param  {Function} callback
     * @return {Howl}
     */
    fadeIn: function(to, len, callback) {
      return this.volume(0).play().fade(0, to, len, callback);
    },

    /**
     * [DEPRECATED] Fade out the current sound and pause when finished.
     * @param  {Float}    to       Volume to fade to (0.0 to 1.0).
     * @param  {Number}   len      Time in milliseconds to fade.
     * @param  {Function} callback
     * @param  {String}   id       (optional) The play instance ID.
     * @return {Howl}
     */
    fadeOut: function(to, len, callback, id) {
      var self = this;

      return self.fade(self._volume, to, len, function() {
        if (callback) callback();
        self.pause(id);

        // fire ended event
        self.on('end');
      }, id);
    },

    /**
     * Get an audio node by ID.
     * @return {Howl} Audio node.
     */
    _nodeById: function(id) {
      var self = this,
        node = self._audioNode[0];

      // find the node with this ID
      for (var i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].id === id) {
          node = self._audioNode[i];
          break;
        }
      }

      return node;
    },

    /**
     * Get the first active audio node.
     * @return {Howl} Audio node.
     */
    _activeNode: function() {
      var self = this,
        node = null;

      // find the first playing node
      for (var i=0; i<self._audioNode.length; i++) {
        if (!self._audioNode[i].paused) {
          node = self._audioNode[i];
          break;
        }
      }

      // remove excess inactive nodes
      self._drainPool();

      return node;
    },

    /**
     * Get the first inactive audio node.
     * If there is none, create a new one and add it to the pool.
     * @param  {Function} callback Function to call when the audio node is ready.
     */
    _inactiveNode: function(callback) {
      var self = this,
        node = null;

      // find first inactive node to recycle
      for (var i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
          // send the node back for use by the new play instance
          callback(self._audioNode[i]);
          node = true;
          break;
        }
      }

      // remove excess inactive nodes
      self._drainPool();

      if (node) {
        return;
      }

      // create new node if there are no inactives
      var newNode;
      if (self._webAudio) {
        newNode = self._setupAudioNode();
        callback(newNode);
      } else {
        self.load();
        newNode = self._audioNode[self._audioNode.length - 1];

        // listen for the correct load event and fire the callback
        var listenerEvent = navigator.isCocoonJS ? 'canplaythrough' : 'loadedmetadata';
        var listener = function() {
          newNode.removeEventListener(listenerEvent, listener, false);
          callback(newNode);
        };
        newNode.addEventListener(listenerEvent, listener, false);
      }
    },

    /**
     * If there are more than 5 inactive audio nodes in the pool, clear out the rest.
     */
    _drainPool: function() {
      var self = this,
        inactive = 0,
        i;

      // count the number of inactive nodes
      for (i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].paused) {
          inactive++;
        }
      }

      // remove excess inactive nodes
      for (i=self._audioNode.length-1; i>=0; i--) {
        if (inactive <= 5) {
          break;
        }

        if (self._audioNode[i].paused) {
          // disconnect the audio source if using Web Audio
          if (self._webAudio) {
            self._audioNode[i].disconnect(0);
          }

          inactive--;
          self._audioNode.splice(i, 1);
        }
      }
    },

    /**
     * Clear 'onend' timeout before it ends.
     * @param  {String} soundId  The play instance ID.
     */
    _clearEndTimer: function(soundId) {
      var self = this,
        index = 0;

      // loop through the timers to find the one associated with this sound
      for (var i=0; i<self._onendTimer.length; i++) {
        if (self._onendTimer[i].id === soundId) {
          index = i;
          break;
        }
      }

      var timer = self._onendTimer[index];
      if (timer) {
        clearTimeout(timer.timer);
        self._onendTimer.splice(index, 1);
      }
    },

    /**
     * Setup the gain node and panner for a Web Audio instance.
     * @return {Object} The new audio node.
     */
    _setupAudioNode: function() {
      var self = this,
        node = self._audioNode,
        index = self._audioNode.length;

      // create gain node
      node[index] = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
      node[index].gain.value = self._volume;
      node[index].paused = true;
      node[index]._pos = 0;
      node[index].readyState = 4;
      node[index].connect(masterGain);

      // create the panner
      node[index].panner = ctx.createPanner();
      node[index].panner.panningModel = self._model || 'equalpower';
      node[index].panner.setPosition(self._pos3d[0], self._pos3d[1], self._pos3d[2]);
      node[index].panner.connect(node[index]);

      return node[index];
    },

    /**
     * Call/set custom events.
     * @param  {String}   event Event type.
     * @param  {Function} fn    Function to call.
     * @return {Howl}
     */
    on: function(event, fn) {
      var self = this,
        events = self['_on' + event];

      if (typeof fn === 'function') {
        events.push(fn);
      } else {
        for (var i=0; i<events.length; i++) {
          if (fn) {
            events[i].call(self, fn);
          } else {
            events[i].call(self);
          }
        }
      }

      return self;
    },

    /**
     * Remove a custom event.
     * @param  {String}   event Event type.
     * @param  {Function} fn    Listener to remove.
     * @return {Howl}
     */
    off: function(event, fn) {
      var self = this,
        events = self['_on' + event],
        fnString = fn ? fn.toString() : null;

      if (fnString) {
        // loop through functions in the event for comparison
        for (var i=0; i<events.length; i++) {
          if (fnString === events[i].toString()) {
            events.splice(i, 1);
            break;
          }
        }
      } else {
        self['_on' + event] = [];
      }

      return self;
    },

    /**
     * Unload and destroy the current Howl object.
     * This will immediately stop all play instances attached to this sound.
     */
    unload: function() {
      var self = this;

      // stop playing any active nodes
      var nodes = self._audioNode;
      for (var i=0; i<self._audioNode.length; i++) {
        // stop the sound if it is currently playing
        if (!nodes[i].paused) {
          self.stop(nodes[i].id);
          self.on('end', nodes[i].id);
        }

        if (!self._webAudio) {
          // remove the source if using HTML5 Audio
          nodes[i].src = '';
        } else {
          // disconnect the output from the master gain
          nodes[i].disconnect(0);
        }
      }

      // make sure all timeouts are cleared
      for (i=0; i<self._onendTimer.length; i++) {
        clearTimeout(self._onendTimer[i].timer);
      }

      // remove the reference in the global Howler object
      var index = Howler._howls.indexOf(self);
      if (index !== null && index >= 0) {
        Howler._howls.splice(index, 1);
      }

      // delete this sound from the cache
      delete cache[self._src];
      self = null;
    }

  };

  // only define these functions when using WebAudio
  if (usingWebAudio) {

    /**
     * Buffer a sound from URL (or from cache) and decode to audio source (Web Audio API).
     * @param  {Object} obj The Howl object for the sound to load.
     * @param  {String} url The path to the sound file.
     */
    var loadBuffer = function(obj, url) {
      // check if the buffer has already been cached
      if (url in cache) {
        // set the duration from the cache
        obj._duration = cache[url].duration;

        // load the sound into this object
        loadSound(obj);
        return;
      }
      
      if (/^data:[^;]+;base64,/.test(url)) {
        // Decode base64 data-URIs because some browsers cannot load data-URIs with XMLHttpRequest.
        var data = atob(url.split(',')[1]);
        var dataView = new Uint8Array(data.length);
        for (var i=0; i<data.length; ++i) {
          dataView[i] = data.charCodeAt(i);
        }
        
        decodeAudioData(dataView.buffer, obj, url);
      } else {
        // load the buffer from the URL
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
          decodeAudioData(xhr.response, obj, url);
        };
        xhr.onerror = function() {
          // if there is an error, switch the sound to HTML Audio
          if (obj._webAudio) {
            obj._buffer = true;
            obj._webAudio = false;
            obj._audioNode = [];
            delete obj._gainNode;
            obj.load();
          }
        };
        try {
          xhr.send();
        } catch (e) {
          xhr.onerror();
        }
      }
    };

    /**
     * Decode audio data from an array buffer.
     * @param  {ArrayBuffer} arraybuffer The audio data.
     * @param  {Object} obj The Howl object for the sound to load.
     * @param  {String} url The path to the sound file.
     */
    var decodeAudioData = function(arraybuffer, obj, url) {
      // decode the buffer into an audio source
      ctx.decodeAudioData(
        arraybuffer,
        function(buffer) {
          if (buffer) {
            cache[url] = buffer;
            loadSound(obj, buffer);
          }
        },
        function(err) {
          obj.on('loaderror');
        }
      );
    };

    /**
     * Finishes loading the Web Audio API sound and fires the loaded event
     * @param  {Object}  obj    The Howl object for the sound to load.
     * @param  {Objecct} buffer The decoded buffer sound source.
     */
    var loadSound = function(obj, buffer) {
      // set the duration
      obj._duration = (buffer) ? buffer.duration : obj._duration;

      // setup a sprite if none is defined
      if (Object.getOwnPropertyNames(obj._sprite).length === 0) {
        obj._sprite = {_default: [0, obj._duration * 1000]};
      }

      // fire the loaded event
      if (!obj._loaded) {
        obj._loaded = true;
        obj.on('load');
      }

      if (obj._autoplay) {
        obj.play();
      }
    };

    /**
     * Load the sound back into the buffer source.
     * @param  {Object} obj   The sound to load.
     * @param  {Array}  loop  Loop boolean, pos, and duration.
     * @param  {String} id    (optional) The play instance ID.
     */
    var refreshBuffer = function(obj, loop, id) {
      // determine which node to connect to
      var node = obj._nodeById(id);

      // setup the buffer source for playback
      node.bufferSource = ctx.createBufferSource();
      node.bufferSource.buffer = cache[obj._src];
      node.bufferSource.connect(node.panner);
      node.bufferSource.loop = loop[0];
      if (loop[0]) {
        node.bufferSource.loopStart = loop[1];
        node.bufferSource.loopEnd = loop[1] + loop[2];
      }
      node.bufferSource.playbackRate.value = obj._rate;
    };

  }

  /**
   * Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
   */
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return {
        Howler: Howler,
        Howl: Howl
      };
    });
  }

  /**
   * Add support for CommonJS libraries such as browserify.
   */
  if (typeof exports !== 'undefined') {
    exports.Howler = Howler;
    exports.Howl = Howl;
  }

  // define globally in case AMD is not available or available but not used

  if (typeof window !== 'undefined') {
    window.Howler = Howler;
    window.Howl = Howl;
  }

})();

},{}],46:[function(require,module,exports){
/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/sole/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/sole/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */

// Date.now shim for (ahem) Internet Explo(d|r)er
if ( Date.now === undefined ) {

	Date.now = function () {

		return new Date().valueOf();

	};

}

var TWEEN = TWEEN || ( function () {

	var _tweens = [];

	return {

		REVISION: '14',

		getAll: function () {

			return _tweens;

		},

		removeAll: function () {

			_tweens = [];

		},

		add: function ( tween ) {

			_tweens.push( tween );

		},

		remove: function ( tween ) {

			var i = _tweens.indexOf( tween );

			if ( i !== -1 ) {

				_tweens.splice( i, 1 );

			}

		},

		update: function ( time ) {

			if ( _tweens.length === 0 ) return false;

			var i = 0;

			time = time !== undefined ? time : ( typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now() );

			while ( i < _tweens.length ) {

				if ( _tweens[ i ].update( time ) ) {

					i++;

				} else {

					_tweens.splice( i, 1 );

				}

			}

			return true;

		}
	};

} )();

TWEEN.Tween = function ( object ) {

	var _object = object;
	var _valuesStart = {};
	var _valuesEnd = {};
	var _valuesStartRepeat = {};
	var _duration = 1000;
	var _repeat = 0;
	var _yoyo = false;
	var _isPlaying = false;
	var _reversed = false;
	var _delayTime = 0;
	var _startTime = null;
	var _easingFunction = TWEEN.Easing.Linear.None;
	var _interpolationFunction = TWEEN.Interpolation.Linear;
	var _chainedTweens = [];
	var _onStartCallback = null;
	var _onStartCallbackFired = false;
	var _onUpdateCallback = null;
	var _onCompleteCallback = null;
	var _onStopCallback = null;

	// Set all starting values present on the target object
	for ( var field in object ) {

		_valuesStart[ field ] = parseFloat(object[field], 10);

	}

	this.to = function ( properties, duration ) {

		if ( duration !== undefined ) {

			_duration = duration;

		}

		_valuesEnd = properties;

		return this;

	};

	this.start = function ( time ) {

		TWEEN.add( this );

		_isPlaying = true;

		_onStartCallbackFired = false;

		_startTime = time !== undefined ? time : ( typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now() );
		_startTime += _delayTime;

		for ( var property in _valuesEnd ) {

			// check if an Array was provided as property value
			if ( _valuesEnd[ property ] instanceof Array ) {

				if ( _valuesEnd[ property ].length === 0 ) {

					continue;

				}

				// create a local copy of the Array with the start value at the front
				_valuesEnd[ property ] = [ _object[ property ] ].concat( _valuesEnd[ property ] );

			}

			_valuesStart[ property ] = _object[ property ];

			if( ( _valuesStart[ property ] instanceof Array ) === false ) {
				_valuesStart[ property ] *= 1.0; // Ensures we're using numbers, not strings
			}

			_valuesStartRepeat[ property ] = _valuesStart[ property ] || 0;

		}

		return this;

	};

	this.stop = function () {

		if ( !_isPlaying ) {
			return this;
		}

		TWEEN.remove( this );
		_isPlaying = false;

		if ( _onStopCallback !== null ) {

			_onStopCallback.call( _object );

		}

		this.stopChainedTweens();
		return this;

	};

	this.stopChainedTweens = function () {

		for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++ ) {

			_chainedTweens[ i ].stop();

		}

	};

	this.delay = function ( amount ) {

		_delayTime = amount;
		return this;

	};

	this.repeat = function ( times ) {

		_repeat = times;
		return this;

	};

	this.yoyo = function( yoyo ) {

		_yoyo = yoyo;
		return this;

	};


	this.easing = function ( easing ) {

		_easingFunction = easing;
		return this;

	};

	this.interpolation = function ( interpolation ) {

		_interpolationFunction = interpolation;
		return this;

	};

	this.chain = function () {

		_chainedTweens = arguments;
		return this;

	};

	this.onStart = function ( callback ) {

		_onStartCallback = callback;
		return this;

	};

	this.onUpdate = function ( callback ) {

		_onUpdateCallback = callback;
		return this;

	};

	this.onComplete = function ( callback ) {

		_onCompleteCallback = callback;
		return this;

	};

	this.onStop = function ( callback ) {

		_onStopCallback = callback;
		return this;

	};

	this.update = function ( time ) {

		var property;

		if ( time < _startTime ) {

			return true;

		}

		if ( _onStartCallbackFired === false ) {

			if ( _onStartCallback !== null ) {

				_onStartCallback.call( _object );

			}

			_onStartCallbackFired = true;

		}

		var elapsed = ( time - _startTime ) / _duration;
		elapsed = elapsed > 1 ? 1 : elapsed;

		var value = _easingFunction( elapsed );

		for ( property in _valuesEnd ) {

			var start = _valuesStart[ property ] || 0;
			var end = _valuesEnd[ property ];

			if ( end instanceof Array ) {

				_object[ property ] = _interpolationFunction( end, value );

			} else {

				// Parses relative end values with start as base (e.g.: +10, -3)
				if ( typeof(end) === "string" ) {
					end = start + parseFloat(end, 10);
				}

				// protect against non numeric properties.
				if ( typeof(end) === "number" ) {
					_object[ property ] = start + ( end - start ) * value;
				}

			}

		}

		if ( _onUpdateCallback !== null ) {

			_onUpdateCallback.call( _object, value );

		}

		if ( elapsed == 1 ) {

			if ( _repeat > 0 ) {

				if( isFinite( _repeat ) ) {
					_repeat--;
				}

				// reassign starting values, restart by making startTime = now
				for( property in _valuesStartRepeat ) {

					if ( typeof( _valuesEnd[ property ] ) === "string" ) {
						_valuesStartRepeat[ property ] = _valuesStartRepeat[ property ] + parseFloat(_valuesEnd[ property ], 10);
					}

					if (_yoyo) {
						var tmp = _valuesStartRepeat[ property ];
						_valuesStartRepeat[ property ] = _valuesEnd[ property ];
						_valuesEnd[ property ] = tmp;
					}

					_valuesStart[ property ] = _valuesStartRepeat[ property ];

				}

				if (_yoyo) {
					_reversed = !_reversed;
				}

				_startTime = time + _delayTime;

				return true;

			} else {

				if ( _onCompleteCallback !== null ) {

					_onCompleteCallback.call( _object );

				}

				for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++ ) {

					_chainedTweens[ i ].start( time );

				}

				return false;

			}

		}

		return true;

	};

};


TWEEN.Easing = {

	Linear: {

		None: function ( k ) {

			return k;

		}

	},

	Quadratic: {

		In: function ( k ) {

			return k * k;

		},

		Out: function ( k ) {

			return k * ( 2 - k );

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
			return - 0.5 * ( --k * ( k - 2 ) - 1 );

		}

	},

	Cubic: {

		In: function ( k ) {

			return k * k * k;

		},

		Out: function ( k ) {

			return --k * k * k + 1;

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
			return 0.5 * ( ( k -= 2 ) * k * k + 2 );

		}

	},

	Quartic: {

		In: function ( k ) {

			return k * k * k * k;

		},

		Out: function ( k ) {

			return 1 - ( --k * k * k * k );

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
			return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

		}

	},

	Quintic: {

		In: function ( k ) {

			return k * k * k * k * k;

		},

		Out: function ( k ) {

			return --k * k * k * k * k + 1;

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
			return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

		}

	},

	Sinusoidal: {

		In: function ( k ) {

			return 1 - Math.cos( k * Math.PI / 2 );

		},

		Out: function ( k ) {

			return Math.sin( k * Math.PI / 2 );

		},

		InOut: function ( k ) {

			return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

		}

	},

	Exponential: {

		In: function ( k ) {

			return k === 0 ? 0 : Math.pow( 1024, k - 1 );

		},

		Out: function ( k ) {

			return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

		},

		InOut: function ( k ) {

			if ( k === 0 ) return 0;
			if ( k === 1 ) return 1;
			if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
			return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

		}

	},

	Circular: {

		In: function ( k ) {

			return 1 - Math.sqrt( 1 - k * k );

		},

		Out: function ( k ) {

			return Math.sqrt( 1 - ( --k * k ) );

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
			return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function ( k ) {

			var s, a = 0.1, p = 0.4;
			if ( k === 0 ) return 0;
			if ( k === 1 ) return 1;
			if ( !a || a < 1 ) { a = 1; s = p / 4; }
			else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
			return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

		},

		Out: function ( k ) {

			var s, a = 0.1, p = 0.4;
			if ( k === 0 ) return 0;
			if ( k === 1 ) return 1;
			if ( !a || a < 1 ) { a = 1; s = p / 4; }
			else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
			return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

		},

		InOut: function ( k ) {

			var s, a = 0.1, p = 0.4;
			if ( k === 0 ) return 0;
			if ( k === 1 ) return 1;
			if ( !a || a < 1 ) { a = 1; s = p / 4; }
			else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
			if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
			return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

		}

	},

	Back: {

		In: function ( k ) {

			var s = 1.70158;
			return k * k * ( ( s + 1 ) * k - s );

		},

		Out: function ( k ) {

			var s = 1.70158;
			return --k * k * ( ( s + 1 ) * k + s ) + 1;

		},

		InOut: function ( k ) {

			var s = 1.70158 * 1.525;
			if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
			return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

		}

	},

	Bounce: {

		In: function ( k ) {

			return 1 - TWEEN.Easing.Bounce.Out( 1 - k );

		},

		Out: function ( k ) {

			if ( k < ( 1 / 2.75 ) ) {

				return 7.5625 * k * k;

			} else if ( k < ( 2 / 2.75 ) ) {

				return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

			} else if ( k < ( 2.5 / 2.75 ) ) {

				return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

			} else {

				return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

			}

		},

		InOut: function ( k ) {

			if ( k < 0.5 ) return TWEEN.Easing.Bounce.In( k * 2 ) * 0.5;
			return TWEEN.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function ( v, k ) {

		var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = TWEEN.Interpolation.Utils.Linear;

		if ( k < 0 ) return fn( v[ 0 ], v[ 1 ], f );
		if ( k > 1 ) return fn( v[ m ], v[ m - 1 ], m - f );

		return fn( v[ i ], v[ i + 1 > m ? m : i + 1 ], f - i );

	},

	Bezier: function ( v, k ) {

		var b = 0, n = v.length - 1, pw = Math.pow, bn = TWEEN.Interpolation.Utils.Bernstein, i;

		for ( i = 0; i <= n; i++ ) {
			b += pw( 1 - k, n - i ) * pw( k, i ) * v[ i ] * bn( n, i );
		}

		return b;

	},

	CatmullRom: function ( v, k ) {

		var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = TWEEN.Interpolation.Utils.CatmullRom;

		if ( v[ 0 ] === v[ m ] ) {

			if ( k < 0 ) i = Math.floor( f = m * ( 1 + k ) );

			return fn( v[ ( i - 1 + m ) % m ], v[ i ], v[ ( i + 1 ) % m ], v[ ( i + 2 ) % m ], f - i );

		} else {

			if ( k < 0 ) return v[ 0 ] - ( fn( v[ 0 ], v[ 0 ], v[ 1 ], v[ 1 ], -f ) - v[ 0 ] );
			if ( k > 1 ) return v[ m ] - ( fn( v[ m ], v[ m ], v[ m - 1 ], v[ m - 1 ], f - m ) - v[ m ] );

			return fn( v[ i ? i - 1 : 0 ], v[ i ], v[ m < i + 1 ? m : i + 1 ], v[ m < i + 2 ? m : i + 2 ], f - i );

		}

	},

	Utils: {

		Linear: function ( p0, p1, t ) {

			return ( p1 - p0 ) * t + p0;

		},

		Bernstein: function ( n , i ) {

			var fc = TWEEN.Interpolation.Utils.Factorial;
			return fc( n ) / fc( i ) / fc( n - i );

		},

		Factorial: ( function () {

			var a = [ 1 ];

			return function ( n ) {

				var s = 1, i;
				if ( a[ n ] ) return a[ n ];
				for ( i = n; i > 1; i-- ) s *= i;
				return a[ n ] = s;

			};

		} )(),

		CatmullRom: function ( p0, p1, p2, p3, t ) {

			var v0 = ( p2 - p0 ) * 0.5, v1 = ( p3 - p1 ) * 0.5, t2 = t * t, t3 = t * t2;
			return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;

		}

	}

};

module.exports=TWEEN;
},{}]},{},[1]);
