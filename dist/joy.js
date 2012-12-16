/* 
 * Joy.js - v0.0.1pre (http://joyjs.org)
 * Copyright (c) 2012 Joy.js Foundation and other contributors 
 * Build date: 12/16/2012
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
    Context: {}
  };

  global.Joy = Joy;
})(window);

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

/**
 * Base class for rendering.
 * @class Renderable
 */
(function(J) {
  var Renderable = Class.extend({
    init: function() {
      this.ctx = null;
      this.plugins = [];
      this._preRender = [];
      this._postRender = [];
    },

    setContext: function(ctx) {
      var i = 0,
          length = this.plugins.length;

      this.ctx = ctx;

      for (;i<length;++i) {
        this.plugins[i].setContext(ctx);
      }
    },

    addPlugin: function(plugin) {
      if (plugin.preRender) {
        this._preRender.push(plugin);
      }

      if (plugin.postRender) {
        this._postRender.push(plugin);
      }

      this.plugins.push(plugin);
    },

    preRender: function() {
      var i = 0,
          length = this._preRender.length;
      for (;i<length;++i) {
        this._preRender[i].preRender();
      }
    },

    postRender: function() {
      var i = 0,
          length = this._postRender.length;
      for (;i<length;++i) {
        this._postRender[i].postRender();
      }
    },

    render: function() {
      throw new Exception("You must override `render` method for `" + this.constructor + "`.");
    }
  });

  J.Renderable = Renderable;
})(Joy);

/**
 * Singleton time variables.
 * @class Time
 */
Joy.Time = {
  deltaTime: 1
};

/**
 * @class Behaviour
 */
(function(J) {
  var Behaviour = Class.extend({
    init: function() {
    }
  });

  Joy.Behaviour = Behaviour;
})(Joy);

/**
 * @class GameObject
 */
(function(J) {
  var GameObject = function(options) {
    this.x = 0;
    this.y = 0;
    this.graphic = options.graphic || null;
  };

  GameObject.prototype.addBehaviour = function() {};

  J.GameObject = GameObject;
})(Joy);


/**
 * Analyses HTML tags inside <canvas> tag, and add those childs
 * to Joy contexting pipeline.
 *
 * Dependency: Sizzle
 * @class Markup
 */
(function(J){
  // Use Sizzle as CSS Selector Engine.
  var $ = (typeof(Sizzle) !== "undefined") ? Sizzle : null;

  var Markup = function() {};

  Markup.prototype.analyse = function(context) {
    that = this;

    // Sprite
    $('img', context.canvas).forEach(function(img) {
      var dataset = that.evaluateDataset(img.dataset, context.context);
      context.addChild(new Joy.Sprite({
        x: img.dataset.x,
        y: img.dataset.y,
        asset: img
      }));
    });

    // Text
    $('label', context.canvas).forEach(function(label) {
      var dataset = that.evaluateDataset(label.dataset, context.context);
      dataset.text = label.innerHTML;
      context.addChild(new Joy.Text(dataset));
    });
  };

  Markup.prototype.evaluateDataset = function(dataset, context) {
    var attr, matches,
        width = context.width,
        height = context.height;

    for (var key in dataset) {
      attr = dataset[key];
      matches = attr.match(/\{\{([^\}]*)\}\}/)[1];

      // Replace expression by the evaluation of it.
      attr.replace(attr, eval(matches[1]));
    }
  };

  J.Markup = Markup;
})(Joy);

/**
 * Reads a stand-alone package.
 * @class Package
 */
(function(J){
  // Use Sizzle as CSS Selector Engine.
  var $ = Sizzle;

  var Markup = function() {};

  Markup.prototype.analyse = function(render) {
    that = this;

    // Sprite
    $('img', render.canvas).forEach(function(img) {
      var dataset = that.evaluateDataset(img.dataset, render.context);
      render.addChild(new Joy.Sprite({
        x: img.dataset.x,
        y: img.dataset.y,
        asset: img
      }));
    });

    // Text
    $('label', render.canvas).forEach(function(label) {
      var dataset = that.evaluateDataset(label.dataset, render.context);
      dataset.text = label.innerHTML;
      render.addChild(new Joy.Text(dataset));
    });
  };

  Markup.prototype.evaluateDataset = function(dataset, context) {
    var attr, matches,
        width = context.width,
        height = context.height;

    for (var key in dataset) {
      attr = dataset[key];
      matches = attr.match(/\{\{([^\}]*)\}\}/)[1];

      // Replace expression by the evaluation of it.
      attr.replace(attr, eval(matches[1]));
    }
  };

  J.Markup = Markup;
})(Joy);


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
  // TODO: find a better way to reference currentContext instance.
  // What will happen when we have two canvas contexts at the same time? (like a mini-map?)
  var currentContext = null;

  /**
   * Initializes the currentContext.
   * @param {Object} options
   * @constructor
   */
  var Context2d = function(options) {
    currentContext = this;
    this.canvas = options.canvas;
    this.context = this.canvas.getContext('2d');
    this.setSmooth(false);
    this.spriteBuffer = {};
    this.pipeline = [];

    // requestAnimationFrame
    this.onEnterFrame();
  };

  /**
   * setSmooth
   * @param {Boolean} enabled Enable image smoothing?
   */
  Context2d.prototype.setSmooth = function(bool) {
    this.context.imageSmoothingEnabled = bool;
    this.context.mozImageSmoothingEnabled = bool;
    this.context.oImageSmoothingEnabled = bool;
    this.context.webkitImageSmoothingEnabled = bool;
    return this;
  };

  Context2d.prototype.setCanvas = function(canvas) {
    this.canvas = canvas;
    return this;
  };

  /**
   * Add a graphic object to enqueue to rendering pipeline.
   * @param {GameObject, Renderable} node
   */
  Context2d.prototype.addChild = function(node) {
    var renderable = (node instanceof J.GameObject) ? node.graphic : node;
    if (renderable) {
      renderable.setContext(this.context);
      this.pipeline.push(renderable);
    }
  };

  Context2d.prototype.removeChild = function() {
    // TODO
  };

  /**
   * Clears the entire screen.
   *
   * @method clear
   */
  Context2d.prototype.clear = function () {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    return this;
  };

  /**
   * Context2ds everything in the buffer to the screen.
   *
   * @method Context2d
   */
  Context2d.prototype.render = function () {
    var len = this.pipeline.length, i = 0;
    this.clear();

    for (; i < len; ++i) {
      /*
       * TODO: Improve pre/post rendering performance.
       */
      if (this.pipeline[i]._preRender.length > 0) {
        this.pipeline[i].preRender();
      }

      this.pipeline[i].render();

      if (this.pipeline[i]._postRender.length > 0) {
        this.pipeline[i].postRender();
      }
    }
  };

  /**
   * Call window's requestAnimationFrame.
   * @method onEnterFrame
   */
  Context2d.prototype.onEnterFrame = function () {
    currentContext.render();
    window.onEnterFrame(currentContext.onEnterFrame);
  };

  // Exports Context2d module
  J.Context.Context2d = Context2d;
})(Joy);

(function(J) {
  var DEFAULT_COLOR = "#000000";

  var Shadow = J.Renderable.extend({
    init: function(options) {
      this.color = options.color || DEFAULT_COLOR;
      this.offsetX = options.offsetX || 0;
      this.offsetY = options.offsetY || 0;
      this.blur = options.blur || 0;
      this._super();
    },

    preRender: function() {
      this.ctx.save();
      this.ctx.shadowColor = this.color;
      this.ctx.shadowBlur = this.blur;
      this.ctx.shadowOffsetX = this.offsetX;
      this.ctx.shadowOffsetY = this.offsetY;
    },

    postRender: function() {
      this.ctx.restore();
    }
  });

  Joy.Render.Shadow = Shadow;
})(Joy);


/**
 * @class Sprite
 */
(function(J) {
  var Sprite = J.Renderable.extend({
    init: function(options) {
      this.asset = options.asset || new Image();
      this.x = options.x || 0;
      this.y = options.y || 0;

      if (options.url) {
        this.load(options.url);
      }

      this._super();
    },

    load: function(src, onload) {
      if (onload) {
        this.asset.onload = onload;
      }
      this.asset.src = src;
    },

    render: function() {
      this.ctx.drawImage(this.asset, this.x, this.y, this.asset.width, this.asset.height);
    }
  });

  J.Sprite = Sprite;
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

  var Text = J.Renderable.extend({
    init: function(options) {
      if (typeof(options)==="undefined") {
        options = {};
      }
      this.x = options.x || 0;
      this.y = options.y || 0;
      this.text = options.text || "";
      this.font = options.font || DEFAULT_FONT;
      this.color = options.color || DEFAULT_COLOR;
      this.align = options.align || DEFAULT_ALIGN;
      this.baseline = options.baseline || DEFAULT_BASELINE;

      if (options.stroke) {
        this.useStroke();
      } else {
        this.useFill();
      }

      this._super();
    },

    useStroke: function() {
      this.stroke = true;
      this.fillMethod = "strokeText";
      this.styleMethod = "strokeStyle";
    },

    useFill: function() {
      this.stroke = false;
      this.fillMethod = "fillText";
      this.styleMethod = "fillStyle";
    },

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
