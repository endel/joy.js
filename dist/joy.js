/* 
 * Joy.js - v0.0.1pre (http://joyjs.org)
 * Copyright (c) 2012 Joy.js Foundation and other contributors 
 * Build date: 12/19/2012
 */

/**
 * This is the main class for the Joy engine.
 * Everything will be loaded from here, to be used at full extent.
 *
 * @class Joy
 */
(function(global) {
  // Exports Joy engine.
  var Joy = global.Joy || {
    Init: {},
    Render: {},
    Input: {},
    Context: {},
    debug: false
  };

  global.Joy = Joy;
})(window);

/**
 * Simple JavaScript Inheritance - http://ejohn.org/blog/simple-javascript-inheritance/
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 *
 * @class Class
 */
// Inspired by base2 and Prototype
/*jshint immed:true loopfunc:true*/
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){'xyz';}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};

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
})();
/*jshint immed:false loopfunc:false*/

/**
 * The Context2d class is responsible for drawing everything at the canvas.
 * It works using a buffer of sprites, so you can use it alone, adding sprites to it.
 * Sprites are arranged into layers, so to speed up the Context2ding process.
 * You can have as much layers as you wish, although remember that, the more layers you have, the slower the Context2ding will be.
 * Animations are also handled by the class.
 *
 * @class Context2d
*/
(function(J) {
  /**
   * Initializes 2d context
   * @param {Object} options
   * @constructor
   */
  var Context2d = function(options) {
    this.setCanvas(options.canvas);
    this.setSmooth(false);
  };

  /**
   * setSmooth
   * @param {Boolean} enabled Enable image smoothing?
   */
  Context2d.prototype.setSmooth = function(bool) {
    this.ctx.imageSmoothingEnabled = bool;
    this.ctx.mozImageSmoothingEnabled = bool;
    this.ctx.oImageSmoothingEnabled = bool;
    this.ctx.webkitImageSmoothingEnabled = bool;
    return this;
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
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    return this;
  };

  /**
   * Render everything in the buffer to the screen.
   * @method Context2d
   */
  Context2d.prototype.render = function (scenes) {
    var len = scenes.length, i = 0;
    this.clear();

    for (; i < len; ++i) {
      //
      // TODO: save/restore bottleneck.
      // Removing save/restore increases ~10fps, rendering 1000 sprites on sprite-benchmark.html example.
      //
      scenes[i].render();
    }
  };

  // Exports Context2d module
  J.Context.Context2d = Context2d;
})(Joy);

/**
 * Base class for rendering.
 * @class DisplayObject
 */
(function(J) {
  var DisplayObject = Class.extend({
    init: function() {
      this.ctx = null;
      this.index = null;
      this._parent = null;

      this.alpha = 1;
      this.scaleX = 1;
      this.scaleY = 1;
      this._visible = true;

      /**
       * Parent DisplayObject
       * @property parent
       * @readonly
       * @type {DisplayObject, DisplayObjectContainer}
       */
      this.__defineGetter__('parent', function() {
        return this._parent;
      });

      this.__defineSetter__('visible', function(visible) {
        this._visible = visible;
      });

      this.__defineGetter__('visible', function() {
        return this._visible && this.alpha > 0 && this.scaleX !== 0 && this.scaleY !== 0;
      });

      this.hasContextOperations = false;
      this._contextOperations = {};
    },

    setContext: function(ctx) {
      this.ctx = ctx;
    },

    /**
     * Register scale context operations
     * @method scale
     * @param {Number} scaleX
     * @param {Number} scaleY
     */
    scale: function(scaleX, scaleY) {
      this.hasContextOperations = true;
      this.scaleX = scaleX;
      this.scaleY = scaleY;
      this._contextOperations.scale = [this.scaleX, this.scaleY];
      return this;
    },

    /**
     * @method translate
     * @param {Number} x
     * @param {Number} y
     */
    translate: function(x, y) {
      this.hasContextOperations = true;
      this._contextOperations.translate = [x, y];
      return this;
    },

    fillStyle: function(color) {
      this.hasContextOperations = true;
      this._contextOperations.fillStyle = color.toString();
    },

    fillRect: function(x, y, width, height) {
      this.hasContextOperations = true;
      this._contextOperations.fillRect = [x, y, width, height];
    },

    /**
     * Register shadow context operations
     * @method shadow
     * @param {Object} options
     */
    shadow: function(options) {
      this.hasContextOperations = true;
      this._contextOperations.shadowColor   = options.color || "#000";
      this._contextOperations.shadowOffsetX = options.offsetX || 0;
      this._contextOperations.shadowOffsetY = options.offsetY || 0;
      this._contextOperations.shadowBlur    = options.blur || 1;
    },

    /**
     * Apply all custom context operations.
     * @method render
     */
    render: function() {
      for (var operation in this._contextOperations) {
        if (this._contextOperations[operation] instanceof Array) {
          this.ctx[operation].apply(this.ctx, this._contextOperations[operation]);
        } else {
          this.ctx[operation] = this._contextOperations[operation];
        }
      }
    }
  });

  J.DisplayObject = DisplayObject;
})(Joy);

/**
 * @class DisplayObjectContainer
 */
(function(J) {
  var DisplayObjectContainer = J.DisplayObject.extend({
    init: function() {
      this._super();
      this.displayObjects = [];
    },

    render: function() {
      var i = 0, length = this.displayObjects.length;
      this.ctx.save();
      this._super();

      for (; i<length; ++i) {
        if (!this.displayObjects[i].visible) { continue; }

        if (this.displayObjects[i].hasContextOperations) { this.ctx.save(); }
        this.displayObjects[i].render();
        if (this.displayObjects[i].hasContextOperations) { this.ctx.restore(); }

      }
      this.ctx.restore();
    },

    /**
     * Swap index of two DisplayObjects
     * @method swapChildren
     * @param {DisplayObject} child1
     * @param {DisplayObject} child2
     */
    swapChildren: function(child1, child2) {
      var child1Index = child1.index;

      // Swap child references
      this.displayObjects[ child1Index ] = child2;
      this.displayObjects[ child2.index ] = child1;

      // Swap indexes
      child1.index = child2.index;
      child2.index = child1Index;
      return this;
    },

    /**
     * Add a display object in the list.
     * @method addChild
     * @param {DisplayObject, DisplayObjectContainer}
     */
    addChild: function(displayObject) {
      displayObject.index = this.displayObjects.push(displayObject) - 1;
      displayObject._parent = this;
    },

    removeChild: function(displayObject) {
      // TODO
    },

    removeChildAt: function(index) {
      // TODO
    }
  });

  // Export module
  J.DisplayObjectContainer = DisplayObjectContainer;
})(Joy);

/**
 * @class Sprite
 */
(function(J) {
  var Sprite = J.DisplayObject.extend({
    init: function(options) {
      this._super();

      // Asset
      this.asset = options.asset || new Image();

      // Position / Dimensions
      this.x = this._x = options.x || 0;
      this.y = this._y = options.y || 0;

      // Real dimensions (without scale)
      this._width = this.asset.width || options.width;
      this._height = this.asset.height || options.height;

      // Public dimensions (with scale)
      this.width = this._width;
      this.height = this._height;

      // flip
      this.flipX = false;
      this.flipY = false;

      // Frames
      this.frames = 1;
      this.currentFrame = 0;

      if (options.src) {
        this.load(options.src);
      }

      // Use 1x1 scale by default.
      this.scale(1, 1);
    },

    /**
     * Set sprite scale
     * @method scale
     * @param {Number} scaleX
     * @param {Number} scaleY
     */
    scale: function (scaleX, scaleY) {
      this._super(scaleX, scaleY);
      this.width = this._width * this.scaleX;
      this.height = this._height * this.scaleY;
    },

    /**
     * @method load
     * @param {String} src image source
     */
    load: function(src) {
      var self = this;

      if (onload) {
        this.asset.onload = function() { self.onLoad(); };
      }
      this.asset.src = src;
    },

    onLoad: function() {
      if (!this._width) {
        this._width = this.asset.width;
      }
      if (!this._height) {
        this._height = this.asset.height;
      }

      // We may have discovered sprite size for the first time here.
      // Re-calculate it's width based on scale.
      this.scale(this.scaleX, this.scaleY);

      // Check frames
      if (this._width < this.asset.width) {
        this.frames = Math.ceil(this.asset.width / this._width);
      }
    },

    render: function() {

      if (this.flipX === true || this.flipY === true) {
        // TODO: I'm weird and not working as expected
        this.ctx.translate((this.flipX - 0) * this._width, (this.flipY - 0) * this._height);
        this.ctx.scale((this.flipX === true) ? -1 : 1 , (this.flipY === true) ? -1 : 1);
      }

      // Normalize coordinates according to current scale.
      this._x = (this.x * this.ctx.canvas.width / (this.scaleX * this.ctx.canvas.width));
      this._y = (this.y * this.ctx.canvas.height / (this.scaleY * this.ctx.canvas.height));

      this._super();

      // Don't use scale-corrected dimensions on draw.
      this.ctx.drawImage(this.asset, this._width * this.currentFrame, 0, this._width, this._height, this._x, this._y, this._width, this._height);

      // Draw debugging rectangle around sprite
      if (J.debug) {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this._x, this._y, this._width, this._height);
      }

    }
  });

  J.Sprite = Sprite;
})(Joy);

/**
 * Handles spritesheet animations
 * @class SpriteSheet
 */
(function(J) {
  var SpriteSheet = function() {
  };

  J.SpriteSheet = SpriteSheet;
})(Joy);

/**
 * @class Text
 */
(function(J) {
  /*
   * Constants
   */
  var BASELINE = {
    TOP : 'top',
    HANGING : 'hanging',
    MIDDLE : 'middle',
    ALPHABETIC : 'alphabetic',
    IDEOGRAPHIC : 'ideographic',
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

  var Text = J.DisplayObject.extend({
    /**
     * Create Text instance
     * @param {Object} options any attribute may be initialized by option
     * @constructor
     */
    init: function(options) {
      if (typeof(options)==="undefined") {
        options = {};
      }

      /**
       * X position
       * @property x
       * @default 0
       * @type {Number}
       */
      this.x = options.x || 0;

      /**
       * Y position
       * @property y
       * @default 0
       * @type {Number}
       */
      this.y = options.y || 0;

      /**
       * Text to be displayed
       * @property text
       * @default ""
       * @type {String}
       */
      this.text = options.text || "";

      /**
       * Font family and size
       * @property font
       * @default "Normal 12px Verdana"
       * @type {String}
       */
      this.font = options.font || DEFAULT_FONT;

      /**
       * Text horizontal alignment
       * @property align
       * @default "left"
       * @type {String}
       */
      this.align = options.align || DEFAULT_ALIGN;

      /**
       * Text vertical baseline
       * @property baseline
       * @default Joy.Text.BASELINE.TOP
       * @type {String}
       */
      this.baseline = options.baseline || DEFAULT_BASELINE;

      /**
       * Color of the text
       * @property color
       * @default "#000000"
       * @type {String, Joy.Color}
       */
      this._color = options.color || DEFAULT_COLOR;
      this.__defineGetter__('color', function() {
        return this._color;
      });
      this.__defineSetter__('color', function(color) {
        this._color = color.toString();
      });

      if (options.stroke) {
        this.useStroke();
      } else {
        this.useFill();
      }

      this._super();
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

    /**
     * @method render
     */
    render: function() {
      this.ctx.font = this.font;
      this.ctx.textAlign = this.align;
      this.ctx.textBaseline = this.baseline;

      this.ctx[this.styleMethod] = this.color;
      this.ctx[this.fillMethod](this.text, this.x, this.y);
    },

    /**
     * @method getMeasure
     * @return {TextMetrics} text metrics
     */
    getMeasure: function() {
      this.ctx.measureText(this.text);
    }

  });

  Text.BASELINE = BASELINE;
  J.Text = Text;
})(Joy);


/**
 * @class GameObject
 */
(function(J) {
  var Actor = Class.extend({
    init: function (options) {
      this.engine = null;
      this.visible = true;

      this.x = 0;
      this.y = 0;
      this.graphic = options.graphic || null;

      this._intervals = {};
      this._behaviours = [];
    },

    /**
     * @method bind
     * @param {String} action action name (update, key, keypress, keyrelease)
     * @param {Function} callback
     */
    bind: function(action, func) {
      var behaviour = J.Behaviour.extend({});
      behaviour.prototype[action] = func;
      this.addBehaviour(behaviour);
    },

    /**
     * @method addBehaviour
     * @param {Joy.Behaviour} behaviour behaviour class
     */
    addBehaviour: function (b) {
      var self = this,
          behaviour = new b();
      if (behaviour.update && !this._intervals.update) {
        this.addInterval('update', function() {
          behaviour.update.apply(self);
        }, 100);
      }
      this._behaviours.push(behaviour);
    },

    /**
     * @method addInterval
     * @param {String} id
     * @param {Function} callback
     * @param {Number} interval in milliseconds
     */
    addInterval: function (id, callback, interval) {
      // Prevent lost interval reference to keep running.
      if (this._intervals[id]) {
        clearInterval(this._intervals[id]);
      }
      this._intervals[id] = setInterval(callback, interval);
    },

    update: function() {
      var i=0, totalBehaviours = this._behaviours.length;
      for (;i<totalBehaviours;++i) {
        this._behaviours[i].update.apply(this);
      }
    }
  });

  J.Actor = Actor;
})(Joy);


/**
 * @class Behaviour
 */
(function(J) {
  var Behaviour = Class.extend({
    init: function() {}
  });

  Joy.Behaviour = Behaviour;
})(Joy);

/**
 * @class Scene
 */
(function(J) {
  var Scene = J.DisplayObjectContainer.extend({
    init: function(context) {
      this._super();
      this.actors = [];
    },

    addChild: function(node) {
      var displayObject;

      if (node instanceof J.Actor) {
        this.actors.push(node);
        displayObject = node.graphic;
      } else {
        displayObject = node;
      }

      displayObject.setContext(this.ctx);
      this._super(displayObject);
    }
  });

  J.Scene = Scene;
})(Joy);

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

/**
 * Analyses HTML tags inside <canvas> tag, and add those childs
 * to Joy contexting pipeline.
 *
 * TODO: This feature is extremely experimental.
 *
 * Dependency: Sizzle
 * @class Markup
 */
(function(J){
  // Use Sizzle as CSS Selector Engine.
  var $ = (typeof(Sizzle) !== "undefined") ? Sizzle : null;

  var Markup = function() {};

  Markup.prototype.analyse = function(context) {
    var i, length, dataset;

    // Sprite
    var imgs = $('img', context.canvas);
    length = imgs.length;
    for (i=0; i<length; ++i) {
      dataset = this.evaluateDataset.call(imgs[i], imgs[i].dataset, context.context);
      context.addChild(new Joy.Sprite({
        x: imgs[i].dataset.x,
        y: imgs[i].dataset.y,
        asset: imgs[i]
      }));
    }

    // Text
    var labels = $('label', context.canvas);
    length = labels.length;
    for (i=0; i<length; ++i) {
      dataset = this.evaluateDataset(labels[i].dataset, context.context);
      dataset.text = labels[i].innerHTML;
      context.addChild(new Joy.Text(dataset));
    }
  };

  Markup.prototype.evaluateDataset = function(dataset, context) {
    var attr, matches,
        width = context.canvas.width,
        height = context.canvas.height;

    for (var key in dataset) {
      attr = dataset[key];
      matches = attr.match(/\{\{([^\}]*)\}\}/);
      if (matches) {
        // Replace expression by the evaluation of it.
        dataset[key] = attr.replace(attr, eval(matches[1]));
      }
    }
    return dataset;
  };

  J.Markup = Markup;
})(Joy);

/**
 * Reads a stand-alone package.
 * @class Package
 */
(function(J){
  var Package = function() {};
  J.Package = Package;
})(Joy);


/**
 * Singleton time variables.
 * @class Time
 */
Joy.Time = {
  deltaTime: 1
};

/**
 * Color utility class
 * @class Color
 */
(function(J) {
  /**
   * Create a color.
   * @param {String, Number} HEX_or_RED hexadecimal color (String), or red (Number)
   * @param {Number} green
   * @param {Number} blue
   * @param {Number} alpha
   *
   * @example Color name
   *  var color = new Joy.Color("red");
   *
   * @example Hexadecimal
   *  var color = new Joy.Color("#fff");
   *
   * @example RGB
   *  var color = new Joy.Color(255, 50, 255);
   *
   * @example RGBA
   *  var color = new Joy.Color(255, 50, 255, 100);
   *
   * @constructor
   */
  var Color = function(r, g, b, a) {
    if (!g && !b) {
      this.value = r;
    } else if (a) {
      this.value = "rgba("+r+","+g+","+b+","+a+")";
    } else {
      this.value = "rgb("+r+","+g+","+b+")";
    }
  };

  Color.prototype.toString = function() {
    return this.value;
  };

  J.Color = Color;
})(Joy);

/**
 * @class Keyboard
 * Singleton keyboard constants.
 */
(function(J) {
  var Keyboard = {
    ENTER:13,
    BACKSPACE:8,
    TAB:9,
    SHIFT:16,
    CTRL:17,
    ALT:18,
    PAUSE:19,
    CAPSLOCK:20,
    ESCAPE:27,
    PAGEUP:33,
    PAGEDOWN:34,
    END:35,
    HOME:36,
    LEFT:37,
    UP:38,
    RIGHT:39,
    DOWN:40,
    INSERT:45,
    DELETE:46,
    0:48,
    1:49,
    2:50,
    3:51,
    4:52,
    5:53,
    6:54,
    7:55,
    8:56,
    9:57,
    A:65,
    B:66,
    C:67,
    D:68,
    E:69,
    F:70,
    G:71,
    H:72,
    I:73,
    J:74,
    K:75,
    L:76,
    M:77,
    N:78,
    O:79,
    P:80,
    Q:81,
    R:82,
    S:83,
    T:84,
    U:85,
    V:86,
    W:87,
    X:88,
    Y:89,
    Z:90,
    SELECT:93,
    NUMPAD0:96,
    NUMPAD1:97,
    NUMPAD2:98,
    NUMPAD3:99,
    NUMPAD4:100,
    NUMPAD5:101,
    NUMPAD6:102,
    NUMPAD7:103,
    NUMPAD8:104,
    NUMPAD9:105,
    MULTIPLY:106,
    ADD:107,
    SUBTRACT:109,
    DECIMALPOINT:110,
    DIVIDE:111,
    F1:112,
    F2:113,
    F3:114,
    F4:115,
    F5:116,
    F6:117,
    F7:118,
    F8:119,
    F9:120,
    F10:121,
    F11:122,
    F12:123,
    NUMLOCK:144,
    SCROLLLOCK:145,
    SEMICOLON:186,
    EQUALSIGN:187,
    COMMA:188,
    DASH:189,
    PERIOD:190,
    FORWARDSLASH:191,
    GRAVEACCENT:192,
    OPENBRACKET:219,
    BACKSLASH:220,
    CLOSEBRAKET:221,
    SINGLEQUOTE:222
  };

  Joy.Keyboard = Keyboard;
})(Joy);

/*
 * Normalizes browser support
 */

/**
 * window.onEnterFrame
 */
window.onEnterFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ) { window.setTimeout(callback, 1000 / 60); };		// TODO: use FPS rate from render module
})();
