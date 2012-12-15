/* 
 * Joy.js - v0.0.1pre (http://joyjs.org)
 * Copyright (c) 2012 Joy.js Foundation and other contributors 
 * Build date: 12/15/2012
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

/*
 * Simple JavaScript Inheritance - http://ejohn.org/blog/simple-javascript-inheritance/
 * By John Resig http://ejohn.org/
 * MIT Licensed.
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

(function(J) {
  var Renderable = Class.extend({
    init: function() {
      this.ctx = null;
    },

    setContext: function(ctx) {
      this.ctx = ctx;
    },

    render: function() {
      throw new Exception("You must override `render` method for `" + this.constructor + "`.");
    }
  });

  J.Renderable = Renderable;
})(Joy);

Joy.Time = {
  deltaTime: 1
};

(function(J) {
  var GameObject = function() {
    this.x = 0;
    this.y = 0;
    this.sprite = null;
    this.transform = null;
  };

  J.GameObject = GameObject;
})(Joy);


/**
 * Markup class
 *
 * Analyses HTML tags inside <canvas> tag, and add those childs
 * to Joy contexting pipeline.
 *
 * Dependency: Sizzle
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
 * Package class
 *
 * Reads a stand-alone package.
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
 * The Context2ding class is responsible for drawing everything at the canvas.
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
   *
   * @method constructor
   * @option [context] {Object} 2d canvas context to be used on the Context2ding.
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
   * @param enabled {Boolean} Enable image smoothing?
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

  Context2d.prototype.addChild = function(node) {
    node.setContext(this.context);
    this.pipeline.push(node);
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
      this.pipeline[i].render();
    }
  };

  Context2d.prototype.onEnterFrame = function () {
    window.onEnterFrame(currentContext.onEnterFrame);
    currentContext.render();
  };

  // Exports Context2d module
  J.Context.Context2d = Context2d;
})(Joy);

(function(J) {
  var Shadow = J.Renderable.extend({
    init: function() {
    },

    render: function() {
      throw new Exception("You must override `render` method for `" + this.constructor + "`.");
    }
  });

  Joy.Render.Shadow = Shadow;
})(Joy);


(function(J) {
  var Sprite = J.Renderable.extend({
    init: function(options) {
      this.ctx = null;
      this.asset = options.asset || new Image();
      this.x = options.x || 0;
      this.y = options.y || 0;

      if (options.url) {
        this.load(options.url);
      }
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
    DEFAULT_FONT = "normal 12px Verdana",
    DEFAULT_COLOR = "#000000",
    DEFAULT_ALIGN = "left",
    DEFAULT_BASELINE = BASELINE.TOP;

  var Text = J.Renderable.extend({
    init: function(options) {
      if (typeof(options)==="undefined") {
        options = {};
      }
      this.ctx = null;
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
      return this;
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
     * getMeasure
     * @return {TextMetrics}
     */
    getMeasure: function() {
      this.ctx.measureText(this.text);
    }

  });

  Text.BASELINE = BASELINE;
  J.Text = Text;
})(Joy);


(function(J) {
  var Keyboard = function() {
  };

  Joy.Input.Keyboard = Keyboard;
})(Joy);
