/* 
 * joy.js v0.0.1pre 
 * http://joyjs.org
 * 
 * @copyright 2012-2013 Endel Dreyer 
 * @license MIT
 * @build 1/11/2013
 */

(function(global) {
  /**
   * Joy namespace
   * @class Joy
   */
  var Joy = global.Joy || {
    Init: {},
    Render: {},
    Input: {},
    Context: {},

    Events: {
      /**
       * @property Events.INIT
       * @type {String}
       * @static
       * @readonly
       */
      INIT: 'init',

      /**
       * @property Events.UPDATE
       * @type {String}
       * @static
       * @readonly
       */
      UPDATE: 'update',

      /**
       * @property Events.COLLISION
       * @type {String}
       * @static
       * @readonly
       */
      COLLISION: 'collision',

      /**
       * @property Events.COLLISION_START
       * @type {String}
       * @static
       * @readonly
       */
      COLLISION_ENTER: 'collisionEnter',

      /**
       * @property Events.COLLISION_EXIT
       * @type {String}
       * @static
       * @readonly
       */
      COLLISION_EXIT: 'collisionExit'
    },

    /**
     * @property debug
     * @type {Boolean}
     * @static
     * @default false
     */
    debug: false,

    /**
     * @property deltaTime
     * @type {Number}
     * @default 1
     * @static
     */
    deltaTime: 1,

    /**
     * @method ready
     * @static
     */
    ready: function(callback) {
      document.onload = callback;
    }
  };

  /**
   * @method generateUniqueId
   * @return {String}
   */
  Joy.generateUniqueId = function () {
    return "joy" + (new Date().getTime());
  };

  global.Joy = Joy;
})(window);

/**
 * Simple JavaScript Inheritance - http://ejohn.org/blog/simple-javascript-inheritance/
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 *
 * @class Object
 */
// Inspired by base2 and Prototype
/*jshint immed:true loopfunc:true*/
(function(J){
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

  Joy.Object = Class;
})(Joy);
/*jshint immed:false loopfunc:false*/

(function(J) {
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
   * @property DEG_TO_RAD
   * @static
   * @readonly
   * @return {Number}
   **/
  Matrix2D.DEG_TO_RAD = Math.PI / 180;
  Matrix2D.identity = new Matrix2D(1, 0, 0, 1, 0, 0);

  J.Matrix2D = Matrix2D;
})(Joy);

(function(J) {
  /**
   * Event triggering and handling.
   *
   * @class Triggerable
   * @constructor
   */
  var Triggerable = J.Object.extend({
    init: function() {
      this._handlers = {};
    },

    /**
     * Behave like a {Behaviour}
     * @param {Behaviour}
     * @return this
     */
    behave: function (Behaviour) {
      var behaviour = new Behaviour();
      for (var i in behaviour) {
        if (typeof(Joy.Events[i])==="string") {
          this.bind(Joy.Events[i], behaviour[i]);

        } else if (i !== "constructor") { // Deny 'constructor' method of being overwritten
          // Define methods on this instance
          this[i] = behaviour[i];
        }
      }
      return this;
    },

    /**
     * Bind event handler
     * @param {String} type event type
     * @param {Function} handler
     * @return this
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
     * @param {String} type event type
     * @return this
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
  Triggerable.register(Joy.Events.INIT, function(evt) {
    evt.handler.call(this);
  });

  // Exports module
  J.Triggerable = Triggerable;
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
  /**
   * Initializes 2d context
   * @param {Object} options
   * @constructor
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
   * @method Context2d
   */
  Context2d.prototype.render = function (scenes) {
    var len = scenes.length, i = 0;
    this.clear();

    for (; i < len; ++i) {
      scenes[i].render();
    }
  };

  // Exports Context2d module
  J.Context.Context2d = Context2d;
})(Joy);

(function(J) {
  var DisplayObject = J.Triggerable.extend({

    /**
     * Base class for rendering.
     * @class DisplayObject
     * @extends Triggerable
     * @constructor
     */
    init: function(options) {
      if (!options) { options = {}; }

      /**
       * @property id
       * @type {String}
       * @default "joy..."
       */
      this.id = options.id || Joy.generateUniqueId();

      /**
       * @property position
       * @type {Vector2d}
       * @default 0,0
       */
      this.position = new J.Vector2d(options.x || 0, options.y || 0);
      this.__defineGetter__('collidePosition', function() {
        return this.position;
      });

      /**
       * @property pivot
       * @type {Vector2d}
       * @default 0,0
       */
      this.pivot = new J.Vector2d(options.pivotX || 0, options.pivotY || 0);

      /**
       * @property skewX
       * @type {Number}
       * @default 0
       */
      this.skew = new J.Vector2d(options.skewX || 0, options.skewY || 0);

      /**
       * @property scale
       * @type {Vector2d}
       * @default 1,1
       */
      this.scale = new J.Vector2d(options.scaleX || 1, options.scaleY || 1);

      /**
       * @property alpha
       * @type {Number}
       * @default 1
       */
      this.alpha = options.alpha || 1;

      /**
       * @property rotation
       * @type {Number}
       * @default 0
       */
      this.rotation = options.rotation || 0;

      /**
       * @property smooth
       * @type {Boolean}
       * @default false
       */
      this.smooth = options.smooth || false;

      /**
       * @property width
       * @type {Number}
       * @default 0
       */
      this._width = options.width || 0;

      /**
       * @property height
       * @type {Number}
       * @default 0
       */
      this._height = options.height || 0;

      /**
       * Collider object. Can be a DisplayObject, or a geometry.
       * @property collider
       * @type {DisplayObject, Rect, Circle}
       * @default this
       */
      this.collider = options.collider || this;

      /**
       * Index of this DisplayObject on the DisplayObjectContainer
       * @property index
       * @type {Number}
       * @readonly
       */
      this.index = null;

      /**
       * Context that this DisplayObject will be rendered in
       * @property ctx
       * @type {Canvas2D, Canvas3D}
       * @readonly
       */
      this.ctx = null;
      this._shadow = null;
      this._parent = null;
      this._visible = options.visible || true;
      this._matrix = J.Matrix2D.identity.clone();
      this._collisionTargets = [];
      this._collisionActive = {};

      // Custom context operations
      this._hasContextOperations = false;
      this._contextOperations = {};

      /**
       * Parent DisplayObject
       * @property parent
       * @readonly
       * @type {DisplayObjectContainer}
       */
      this.__defineGetter__('parent', function() {
        return this._parent;
      });

      /**
       * Is this DisplayObject able for rendering?
       * @property visible
       * @type {Boolean}
       */
      this.__defineGetter__('visible', function() {
        return this._visible && this.alpha > 0 && this.scale.y !== 0 && this.scale.y !== 0;
      });
      this.__defineSetter__('visible', function(visible) {
        this._visible = visible;
      });

      /**
       * Reference of the current transformation matrix.
       * @property matrix
       * @type {Matrix2D}
       */
      this.__defineGetter__('matrix', function() {
        return this._matrix;
      });

      /**
       * @property width
       * @readonly
       * @type {Number}
       */
      this.__defineGetter__('width', function() {
        return this._width * Math.abs(this.scale.x);
      });

      /**
       * @property height
       * @readonly
       * @type {Number}
       */
      this.__defineGetter__('height', function() {
        return this._height * Math.abs(this.scale.y);
      });

      /**
       * @property right
       * @readonly
       * @type {Number}
       */
      this.__defineGetter__('right', function () {
        return this.position.x + this.width;
      });

      /**
       * @property bottom
       * @readonly
       * @type {Number}
       */
      this.__defineGetter__('bottom', function () {
        return this.position.y + this.height;
      });

      /**
       * @property flipX
       * @type {Boolean}
       * @default false
       */
      this.flipX = false;

      /**
       * @property flipY
       * @type {Boolean}
       * @default false
       */
      this.flipY = false;

      this._super();

      // Bind UPDATE event to check collisions
      if (this.collider) {
        this.bind(J.Events.UPDATE, this.checkCollisions);
      }
    },

    setContext: function(ctx) {
      this.ctx = ctx;
    },

    /**
     * @method allowCollisionFrom
     * @param {DisplayObject}
     * @return this
     */
    allowCollisionFrom: function (displayObject) {
      this._collisionTargets.push(displayObject);
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
     * @return this
     */
    composite: function (compositeOperation) {
      this.compositeOperation = compositeOperation;
      return this;
    },

    /**
     * @method fillStyle
     * @param {Color, String} color
     * @return this
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
     * @return this
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
     * @return this
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

      this.ctx[J.Support.imageSmoothingEnabled] = this.smooth;

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

    // updateColliderPosition: function() {},

    /**
     * Called on UPDATE, triggers COLLISION_ENTER, COLLISION_EXIT and COLLISION events.
     * @method checkCollisions
     */
    checkCollisions: function() {
      var collider, totalTargets = this._collisionTargets.length;
      // if (totalTargets == 0) { return ; }

      if (this.collider.updateColliderPosition !== undefined) {
        this.collider.updateColliderPosition(this.position);
      }

      // Draw debugging stroke around sprite
      if (J.debug) {
        this.collider.renderStroke(this.ctx);
      }

      // Check collisions
      for (var i = 0; i < totalTargets; ++i) {
        collider = this._collisionTargets[i].collider;

        if (collider.collide(this.collider)) {
          // Trigger COLLISION_START when it's colliding for the first time.
          if (!this._collisionActive[collider]) {
            this.trigger(J.Events.COLLISION_ENTER, [ this._collisionTargets[i] ]);
            this._collisionActive[collider] = true;
          }

          this.trigger(J.Events.COLLISION, [ this._collisionTargets[i] ]);

        } else if (this._collisionActive[collider]) {
          delete this._collisionActive[collider];
          this.trigger(J.Events.COLLISION_EXIT, [ this._collisionTargets[i] ]);
        }
      }
    },

    /**
     * @method willCollisionAt
     * @param {Vector2d} projection
     * @return {Boolean}
     */
    willCollideAt: function (projection) {
      var tmpCollider = new J.RectCollider(this.collider.position.clone().sum(projection), 1, 1),
          totalTargets = this._collisionTargets.length;

      if (totalTargets == 0) { return ; }

      tmpCollider.updateColliderPosition( this.position );

      if (this.id === "rufus") {
        console.log(tmpCollider.collidePosition);
        tmpCollider.renderStroke(this.ctx, true);
      }

      for (var i = 0; i < totalTargets; ++i) {
        if (this._collisionTargets[i].collider.collide(tmpCollider)) {
          return true;
        }
      }
      return false;
    },

    /**
     * Apply all custom context operations.
     * @method render
     */
    render: function() {
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
      ctx.strokeRect(0, 0, this._width, this._height);
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
      return new J.Rect(this.position.x, this.position.y, this.width, this.height);
    }
  });

  J.DisplayObject = DisplayObject;
})(Joy);

(function(J) {
  var DisplayObjectContainer = J.DisplayObject.extend({
    /**
     * @class DisplayObjectContainer
     * @extends DisplayObject
     * @constructor
     */
    init: function(options) {
      if (!options) { options = {}; }

      /**
       * @property children
       * @type {Array}
       */
      this.children = [];

      if (options.children) {
        for (var i=0,length=options.children.length; i<length; ++i) {
          this.addChild(options.children[i]);
        }
      }
      /**
       * Number of children displayObject's attached to the container.
       * @property numChildren
       * @type {Number}
       * @readonly
       */
      this.__defineGetter__('numChildren', function() {
        return this.children.length;
      });

      this.__defineGetter__('width', function() {
        // Get child with greater width
        var width = 0;
        for (var i=0, length = this.children.length; i<length; ++i) {
          if (this.children[i].width > width) {
            width = this.children[i].width;
          }
        }
        return width;
      });

      this.__defineGetter__('height', function() {
        // Get child with greater height
        var height = 0;
        for (var i=0, length = this.children.length; i<length; ++i) {
          if (this.children[i].height > height) {
            height = this.children[i].height;
          }
        }
        return height;
      });

      this._super(options);
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

      var i = 0, length = this.children.length;
      this.ctx.save();

      this.updateContext();
      this._super();

      for (; i<length; ++i) {
        if (!this.children[i].visible) { continue; }
        this.ctx.save();
        this.children[i].updateContext();
        this.children[i].render();
        this.children[i].trigger('update');
        this.ctx.restore();
      }

      // Draw debugging rectangle around sprite
      //if (J.debug) {
        //this.ctx.strokeStyle = "red";
        //this.ctx.strokeRect(this.x, this.y, this.width, this.height);
      //}

      this.ctx.restore();
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
     * @param {DisplayObject, DisplayObjectContainer}
     */
    addChild: function(displayObject) {
      displayObject.index = this.children.push(displayObject) - 1;
      displayObject._parent = this;
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
     * @return this
     */
    removeChild: function(displayObject) {
      return this.removeChildAt(displayObject.index);
    },

    /**
     * Remove child at specific index
     * @param {Number} index
     * @return this
     */
    removeChildAt: function(index) {
      this.children.splice(index, index+1);
      return this;
    }

  });

  // Export module
  J.DisplayObjectContainer = DisplayObjectContainer;
})(Joy);

(function(J) {
  /**
   * @class Shape
   * @constructor
   */
  var Shape = J.DisplayObject.extend({
    init: function (options) {
      if (!options) {
        options = {};
      }

      /**
       * Geometry
       * @property geom
       * @type {Rect, Polygon, Circle}
       */
      this.__defineSetter__('geom', function(geom) {
        this._geom = geom;
      });
      this.__defineGetter__('geom', function() { return this._geom; });

      if (options.geom) {
        this.geom = options.geom;
      }

      this._super(options);

      // Override DisplayObject width getter
      this.__defineGetter__('width', function() {
        return this._geom.width;
      });
      // Override DisplayObject height getter
      this.__defineGetter__('height', function() {
        return this._geom.height;
      });

    },

    render: function() {
      this._super();
      this._geom.render(this.ctx);
    }
  });


  J.Shape = Shape;
})(Joy);

(function(J) {
  /**
   * @class Sprite
   * @extends DisplayObjectContainer
   * @constructor
   *
   * @param {String, Object} data src (String) or
   *  @param {Number} width
   *  @param {Number} height
   */
  var Sprite = J.DisplayObjectContainer.extend({
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

      // Bind on load trigger.
      this.bind('load', this.onLoad);
      if (options.src) {
        this.load(options.src);
      }
    },

    /**
     * @method load
     * @param {String} src image source
     */
    load: function(src) {
      var self = this;

      // Expose trigger
      this.image.onload = function() {
        self.trigger('load');
      };

      this.image.src = src;
    },

    onLoad: function() {
      if (!this._width) { this._width = this.image.width; }
      if (!this._height) { this._height = this.image.height; }
    },

    render: function() {
      this._super();

      this.ctx.drawImage(this.image, 0, 0, this._width, this._height);

      // Draw debugging rectangle around sprite
      if (J.debug) {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(0, 0, this._width, this._height);
      }

    }
  });

  J.Sprite = Sprite;
})(Joy);

(function(J) {
  /**
   * Handles spritesheet animations
   * @class SpriteSheet
   * @constructor
   *
   * @param {Object} options
   *  @param {Object} animations
   */
  var SpriteSheet = J.Sprite.extend({
    init: function (options) {
      var self = this;
      this._super(options);

      this._animations = {length: 0};
      this._frequencyInterval = null;

      // Frames
      this.frames = 1;

      /**
       * @property currentFrame
       * @type {Number}
       */
      this.currentFrame = 0;

      /**
       * Frames per second.
       * @property framesPerSecond
       * @alias fps
       * @type {Number}
       */
      this.framesPerSecond = options.framesPerSecond || options.fps || 24;

      if (options.animations) {
        for (var name in options.animations) {
          if (options.animations[name] instanceof Array) {
            this.addAnimation(name, options.animations[name]);
          }
        }
      }

      /**
       * @property currentAnimation
       * @type {String}
       * @readonly
       */
      this._currentAnimation = null;
      this.__defineGetter__('currentAnimation', function () {
        return this._currentAnimation;
      });

      // framesPerSecond alias
      this.__defineGetter__('fps', function () {
        return this.framesPerSecond;
      });

      // Create the interval to change through frames
      this._frequencyInterval = setInterval(function(){ self._update(); }, 1000 / this.framesPerSecond);
    },

    _update: function() {
      var currentAnimation = this._animations[this._currentAnimation];

      if (this.currentFrame == currentAnimation.lastFrame) {
        this.currentFrame = currentAnimation.firstFrame;

        // Reached the first frame, trigger animation start callback.
        this.trigger('animationStart');
      } else {
        this.currentFrame = this.currentFrame + 1;

        // Reached the last frame, trigger animation end callback.
        if (this.currentFrame == currentAnimation.lastFrame) {
          this.trigger('animationEnd');
        }
      }
    },

    /**
     * Add animation to sprite sheet.
     * @param {String} name
     * @param {Array} frames
     *
     * @example
     *  spriteSheet.addAnimation("walking", [0, 32]);
     *
     * @return this
     */
    addAnimation: function (name, frames) {
      var firstFrame = frames[0], lastFrame = frames[1];
      this._animations[name] = {firstFrame: firstFrame, lastFrame: lastFrame};

      // Increase animations set length;
      this._animations.length = (this._animations.length || 0) + 1;

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

      if (this._animations.length === 0 || this._currentAnimation === null) {
        this.addAnimation('default', [0, totalFrames-1]);
        this.play('default');
      }
    },

    /**
     * Play specified animation by name
     * @param {String} animationName
     * @return this
     */
    play: function (animationName) {
      if (this._currentAnimation != animationName) {
        this._currentAnimation = animationName;
        if (!this._animations[animationName]) {
          throw new Error("Animation '" + animationName + "' not found on '" + this.id + "'");
        }
        this.currentFrame = this._animations[animationName].firstFrame;
      }
      return this;
    },

    render: function() {
      if (!this.visible) { return; }

      this.ctx.drawImage(this.image,
                         this._width * (this.currentFrame % this._columns),
                         this._height * ((this.currentFrame / this._columns) >> 0),
                         this._width,
                         this._height,
                         0,
                         0,
                         this._width,
                         this._height);
    }
  });

  J.SpriteSheet = SpriteSheet;
})(Joy);

/**
 * @class Text
 * @extends DisplayObject
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

      this._super(options);

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
      this.ctx.font = this.font;
      this.ctx.textAlign = this.align;
      this.ctx.textBaseline = this.baseline;

      this.ctx[this.styleMethod] = this.color;
      this.ctx[this.fillMethod](this.text, this.position.x, this.position.y);

      this._super();
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


(function(J) {
  /**
   * @class Behaviour
   */
  var Behaviour = J.Object.extend({});
  Joy.Behaviour = Behaviour;
})(Joy);

(function(J) {
  var Scene = J.DisplayObjectContainer.extend({
    /**
     * @class Scene
     * @constructor
     * @param {Object} options
     */
    init: function(options) {
      options = options || {};
      this.engine = options.engine;

      /**
       * @property viewport
       * @type {Viewport}
       */
      this.viewport = options.viewport || null;

      /**
       * Is the scene on paused state?
       * @property paused
       * @type {Boolean}
       */
      this.paused = false;

      /**
       * List of active shaders on the scene.
       * @property shaders
       * @type {Array}
       */
      this.shaders = [];

      this._super(options);
    },

    /**
     * @method createViewport
     * @see Viewport.constructor
     */
    createViewport: function (options) {
      options.scene = this;
      this.viewport = new J.Viewport(options);
      return this;
    },

    addChild: function(displayObject) {
      displayObject.setContext(this.ctx);
      this._super(displayObject);
    },

    /**
     * Set background
     * @method background
     * @param {Color, String} color
     */
    background: function (color) {
      this.fillStyle(color.toString());
      this.fillRect(0, 0, this.engine.width, this.engine.height);
      return this;
    },

    /**
     * @method pause
     * @param {Object} options
     * @param {Number} options.blur radius for gaussian blur filter (optional)
     * @return this
     */
    pause: function (options) {
      options = options || {};
      if (options.blur) {
        this.render();
        J.Shader.process(this.ctx, J.Shader.blur, options.blur);
      }
      this.paused = true;
      this.trigger('pause');
      return this;
    },

    render: function () {
      // Don't render when paused
      if (this.paused) { return; }

      // Update viewport context, if it's set.
      if (this.viewport !== null) {
        this.viewport.updateContext(this.ctx);
      }

      this._super();

      // Experimental: apply shaders
      if (this.shaders.length > 0) {
        for (var i=0, length = this.shaders.length; i < length; ++i) {
          J.Shader.process(this.ctx, this.shaders[i][0], this.shaders[i][1]);
        }
      }

    },

    /**
     * Experimental: add post-processing pixel effect.
     * @method addShader
     * @param {Function} shader
     * @param {Object} options shader options (optional)
     * @return this
     */
    addShader: function(shader, args) {
      this.shaders.push([shader, args]);
      return this;
    }
  });

  J.Scene = Scene;
})(Joy);

(function(J) {
  /**
   * @class Viewport
   * @constructor
   *
   * @param {Object} options
   * @param {DisplayObject} options.follow
   * @param {Number} options.width
   * @param {Number} options.height
   */
  var Viewport = function(options) {
    /**
     * Container DisplayObject
     * @property scene
     * @type {DisplayObject}
     */
    this.scene = options.scene;

    /**
     * DisplayObject that will be followed.
     * @property follow
     * @type {DisplayObject}
     */
    this.follow = options.follow;

    /**
     * @property width
     * @type {Number}
     */
    this.width = options.width;

    /**
     * @property height
     * @type {Number}
     */
    this.height = options.height;
    this.lastTranslateX = 0;
  };

  Viewport.prototype.updateContext = function(ctx) {
    if (this.follow.x > ctx.canvas.width / 2) {
      ctx.translate(  -(this.follow.x) - this.lastTranslateX, 0  );
      this.lastTranslateX = -this.follow.x;
    }
  };

  J.Viewport = Viewport;
})(Joy);

(function(J) {
  /**
   * Built-in behaviour that have acceleration / friction / velocity control.
   * May be appended to any DisplayObject, by `behave` method.
   *
   * @example Append Movimentation behavior into player instance.
   *   player.behave(Joy.Behaviour.Movimentation);
   *   player.acceleration.x = 5;
   *   player.friction.x = 5;
   *
   * @class Behaviour.Movimentation
   */
  var Movimentation = J.Behaviour.extend({
    INIT: function (options) {
      /**
       * Current object's velocity
       * @property velocity
       * @type {Vector2d}
       * @readonly
       */
      this.velocity = new J.Vector2d();

      /**
       * Max velocity control.
       * @property maxVelocity
       * @type {Vector2d}
       * @default Joy.Vector2d(500,500)
       */
      this.maxVelocity = new J.Vector2d(500, 500);

      /**
       * Acceleration by frame, in pixels.
       * @property acceleration
       * @type {Vector2d}
       */
      this.acceleration = new J.Vector2d();

      /**
       * Friction for velocity.
       * @property friction
       * @type {Vector2d}
       */
      this.friction = new J.Vector2d();
    },

    UPDATE: function () {
      if (this.friction.x) {
        this.velocity.x = J.Utils.applyFriction(this.velocity.x, this.friction.x);
      }

      if (this.friction.y) {
        this.velocity.y = J.Utils.applyFriction(this.velocity.y, this.friction.y);
      }

      this.velocity.x += this.acceleration.x * J.deltaTime;
      this.velocity.y += this.acceleration.y * J.deltaTime;

      if (this.velocity.x !== 0) {
        this.velocity.x = Math.clamp(this.velocity.x, -this.maxVelocity.x, this.maxVelocity.x);
      }

      if (this.velocity.y !== 0) {
        this.velocity.y = Math.clamp(this.velocity.y, -this.maxVelocity.y, this.maxVelocity.y);
      }

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  });

  J.Behaviour.Movimentation = Movimentation;
})(Joy);

(function(J) {
  /**
   * @class RectCollider
   * @param {Vector2d} position
   * @param {Number} width
   * @param {Number} height
   * @constructor
   */
  var RectCollider = function(position, width, height) {
    this.position = position;
    this.collidePosition = this.position.clone();
    this.width = width;
    this.height = height;
  };

  RectCollider.prototype.updateColliderPosition = function(position) {
    this.collidePosition.x = position.x + this.position.x;
    this.collidePosition.y = position.y + this.position.y;
  };

  RectCollider.prototype.renderStroke = function(ctx, s) {
    if (s!==undefined) {
      ctx.strokeStyle = "blue";
    }
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    ctx.strokeStyle = "black";
  };

  /**
   * @method clone
   * @return {RectCollider}
   */
  RectCollider.prototype.clone = function() {
    return new RectCollider(this.position.clone(), this.width, this.height);
  };

  J.RectCollider = RectCollider;
})(Joy);

(function(J) {
  /**
   * Used on DisplayObject#composite
   * @class CompositeOperation
   * @static
   */
  J.CompositeOperation = {
    /**
     * @property SOURCE_OVER
     * @static
     * @final
     * @type {String}
     */
    SOURCE_OVER: 'source-over',

    /**
     * @property SOURCE_IN
     * @static
     * @final
     * @type {String}
     */
    SOURCE_IN: 'source-in',

    /**
     * @property SOURCE_OUT
     * @static
     * @final
     * @type {String}
     */
    SOURCE_OUT: 'source-out',

    /**
     * @property SOURCE_ATOP
     * @static
     * @final
     * @type {String}
     */
    SOURCE_ATOP: 'source-atop',

    /**
     * @property LIGHTER
     * @static
     * @final
     * @type {String}
     */
    LIGHTER: 'lighter',

    /**
     * @property XOR
     * @static
     * @final
     * @type {String}
     */
    XOR: 'xor',

    /**
     * @property DESTINATION_OVER
     * @static
     * @final
     * @type {String}
     */
    DESTINATION_OVER: 'destination-over',

    /**
     * @property DESTINATION_IN
     * @static
     * @final
     * @type {String}
     */
    DESTINATION_IN: 'destination-in',

    /**
     * @property DESTINATION_OUT
     * @static
     * @final
     * @type {String}
     */
    DESTINATION_OUT: 'destination-out',

    /**
     * @property DESTINATION_ATOP
     * @static
     * @final
     * @type {String}
     */
    DESTINATION_ATOP: 'destination-atop',

    /**
     * @property DESTINATION_COPY
     * @static
     * @final
     * @type {String}
     */
    DESTINATION_COPY: 'copy'
  };
})(Joy);

(function(J) {
  // TODO: find a better way to reference currentEngine instance.
  // What will happen when we have two canvas contexts at the same time? (like a mini-map?)
  J.currentEngine = null;

  /**
   * Engine context. Start your application from here.
   *
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
    var scene = new J.Scene();
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

  Engine.prototype.addScene = function(scene) {
    scene.engine = this;
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

(function(J) {
  /**
   * Initialize a Circle
   *
   * @param {Vector2d} position
   * @param {Number} radius
   *
   * @class Circle
   * @constructor
   */
  var Circle = function(position, radius) {
    this.position = position;
    this.radius = radius;
  };

  Circle.prototype.render = function(ctx) {
    // TODO
  };

  J.Circle = Circle;
})(Joy);

(function(J) {
  /**
   * @class Polygon
   * @constructor
   * @param {Array} Array of Vector2d's.
   */
  var Polygon = function(points) {
    this.points = [];

    if (points) {
      for (var i=0, length=points.length; i < length; ++i) {
        this.addPoint(points[i]);
      }
    }
  };

  Polygon.prototype.addPoint = function(point) {
    this.points.push(point);
  };

  Polygon.prototype.render = function(ctx) {
    // TODO
  };

  J.Polygon = Polygon;
})(Joy);

(function(J){
  /**
   * @class Rect
   * @constructor
   * @param {Vector2d} position
   * @param {Number} width
   * @param {Number} height
   */
  var Rect = function(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
  };

  /**
   * @param {DisplayObject, Circle, Rectangle}
   * @return {Boolean} is colliding
   */
  Rect.prototype.collide = function(collider) {
    return !(
      this.position.x      >= collider.position.x + collider.width  ||
      collider.position.x  >= this.position.x + this.width          ||
      this.position.y      >= collider.position.y + collider.height ||
      collider.position.y  >= this.position.y + this.height
    );
  };

  Rect.prototype.render = function(ctx) {
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  };

  J.Rect = Rect;
})(Joy);

(function(J){
  /**
   * @class Vector2d
   * @constructor
   * @param {Number} x
   * @param {Number} y
   */
  var Vector2d = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
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
   * @method clone
   * @return {Vector2d}
   */
  Vector2d.prototype.clone = function() {
    return new Vector2d(this.x, this.y);
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

  J.Vector2d = Vector2d;
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

  J.Color = Color;
})(Joy);

(function(J) {
  /**
   * @method clamp
   * @param {Number} number
   * @param {Number} low
   * @param {Number} high
   */
  Math.clamp = function(number, low, high) {
    return ((number < low) ? low : ((number > high) ? high : +number));
  };
})(Joy);

(function(J) {
  /**
   * Utility class
   * @class Utils
   * @static
   */
  J.Utils = {

    /**
     * @method applyFriction
     * @param {Number} v velocity
     * @param {Number} f friction
     * @return {Number}
     */
    applyFriction: function(v, f) {
      return (v + f < 0) ? v + (f * J.deltaTime) : (v - f > 0) ? v - (f * J.deltaTime) : 0;
    }
  };
})(Joy);

(function(J) {
  var Button = J.DisplayObject.extend({
    init: function() {
    }
  });
})(Joy);

(function(J) {
  /**
   * Singleton keyboard finals.
   * @static
   * @readonly
   * @class Keyboard
   */
  var Keyboard = {
    /**
     * Enter keycode
     * @property ENTER
     * @type {Number}
     * @static
     * @final
     */
    ENTER:13,

    /**
     * SPACE keycode
     * @property SPACE
     * @type {Number}
     * @static
     * @final
     */
    SPACE:32,

    /**
     * BACKSPACE keycode
     * @property BACKSPACE
     * @type {Number}
     * @static
     * @final
     */
    BACKSPACE:8,

    /**
     * TAB keycode
     * @property TAB
     * @type {Number}
     * @static
     * @final
     */
    TAB:9,

    /**
     * SHIFT keycode
     * @property SHIFT
     * @type {Number}
     * @static
     * @final
     */
    SHIFT:16,

    /**
     * CTRL keycode
     * @property CTRL
     * @type {Number}
     * @static
     * @final
     */
    CTRL:17,

    /**
     * ALT keycode
     * @property ALT
     * @type {Number}
     * @static
     * @final
     */
    ALT:18,

    /**
     * PAUSE keycode
     * @property PAUSE
     * @type {Number}
     * @static
     * @final
     */
    PAUSE:19,

    /**
     * CAPSLOCK keycode
     * @property CAPSLOCK
     * @type {Number}
     * @static
     * @final
     */
    CAPSLOCK:20,

    /**
     * ESCAPE keycode
     * @property ESCAPE
     * @type {Number}
     * @static
     * @final
     */
    ESCAPE:27,

    /**
     * PAGEUP keycode
     * @property PAGEUP
     * @type {Number}
     * @static
     * @final
     */
    PAGEUP:33,

    /**
     * PAGEDOWN keycode
     * @property PAGEDOWN
     * @type {Number}
     * @static
     * @final
     */
    PAGEDOWN:34,

    /**
     * END keycode
     * @property END
     * @type {Number}
     * @static
     * @final
     */
    END:35,

    /**
     * HOME keycode
     * @property HOME
     * @type {Number}
     * @static
     * @final
     */
    HOME:36,

    /**
     * LEFT keycode
     * @property LEFT
     * @type {Number}
     * @static
     * @final
     */
    LEFT:37,

    /**
     * UP keycode
     * @property UP
     * @type {Number}
     * @static
     * @final
     */
    UP:38,

    /**
     * RIGHT keycode
     * @property RIGHT
     * @type {Number}
     * @static
     * @final
     */
    RIGHT:39,

    /**
     * DOWN keycode
     * @property DOWN
     * @type {Number}
     * @static
     * @final
     */
    DOWN:40,

    /**
     * INSERT keycode
     * @property INSERT
     * @type {Number}
     * @static
     * @final
     */
    INSERT:45,

    /**
     * DELETE keycode
     * @property DELETE
     * @type {Number}
     * @static
     * @final
     */
    DELETE:46,

    /**
     * KEY_0 keycode
     * @property KEY_0
     * @type {Number}
     * @static
     * @final
     */
    KEY_0:48,

    /**
     * KEY_1 keycode
     * @property KEY_1
     * @type {Number}
     * @static
     * @final
     */
    KEY_1:49,

    /**
     * KEY_2 keycode
     * @property KEY_2
     * @type {Number}
     * @static
     * @final
     */
    KEY_2:50,

    /**
     * KEY_3 keycode
     * @property KEY_3
     * @type {Number}
     * @static
     * @final
     */
    KEY_3:51,

    /**
     * KEY_4 keycode
     * @property KEY_4
     * @type {Number}
     * @static
     * @final
     */
    KEY_4:52,

    /**
     * KEY_5 keycode
     * @property KEY_5
     * @type {Number}
     * @static
     * @final
     */
    KEY_5:53,

    /**
     * KEY_6 keycode
     * @property KEY_6
     * @type {Number}
     * @static
     * @final
     */
    KEY_6:54,

    /**
     * KEY_7 keycode
     * @property KEY_7
     * @type {Number}
     * @static
     * @final
     */
    KEY_7:55,

    /**
     * KEY_8 keycode
     * @property KEY_8
     * @type {Number}
     * @static
     * @final
     */
    KEY_8:56,

    /**
     * KEY_9 keycode
     * @property KEY_9
     * @type {Number}
     * @static
     * @final
     */
    KEY_9:57,

    /**
     * KEY_A keycode
     * @property KEY_A
     * @type {Number}
     * @static
     * @final
     */
    KEY_A:65,

    /**
     * KEY_B keycode
     * @property KEY_B
     * @type {Number}
     * @static
     * @final
     */
    KEY_B:66,

    /**
     * KEY_C keycode
     * @property KEY_C
     * @type {Number}
     * @static
     * @final
     */
    KEY_C:67,

    /**
     * KEY_D keycode
     * @property KEY_D
     * @type {Number}
     * @static
     * @final
     */
    KEY_D:68,

    /**
     * KEY_E keycode
     * @property KEY_E
     * @type {Number}
     * @static
     * @final
     */
    KEY_E:69,

    /**
     * KEY_F keycode
     * @property KEY_F
     * @type {Number}
     * @static
     * @final
     */
    KEY_F:70,

    /**
     * KEY_G keycode
     * @property KEY_G
     * @type {Number}
     * @static
     * @final
     */
    KEY_G:71,

    /**
     * KEY_H keycode
     * @property KEY_H
     * @type {Number}
     * @static
     * @final
     */
    KEY_H:72,

    /**
     * KEY_I keycode
     * @property KEY_I
     * @type {Number}
     * @static
     * @final
     */
    KEY_I:73,

    /**
     * KEY_J keycode
     * @property KEY_J
     * @type {Number}
     * @static
     * @final
     */
    KEY_J:74,

    /**
     * KEY_K keycode
     * @property KEY_K
     * @type {Number}
     * @static
     * @final
     */
    KEY_K:75,

    /**
     * KEY_L keycode
     * @property KEY_L
     * @type {Number}
     * @static
     * @final
     */
    KEY_L:76,

    /**
     * KEY_M keycode
     * @property KEY_M
     * @type {Number}
     * @static
     * @final
     */
    KEY_M:77,

    /**
     * KEY_N keycode
     * @property KEY_N
     * @type {Number}
     * @static
     * @final
     */
    KEY_N:78,

    /**
     * KEY_O keycode
     * @property KEY_O
     * @type {Number}
     * @static
     * @final
     */
    KEY_O:79,

    /**
     * KEY_P keycode
     * @property KEY_P
     * @type {Number}
     * @static
     * @final
     */
    KEY_P:80,

    /**
     * KEY_Q keycode
     * @property KEY_Q
     * @type {Number}
     * @static
     * @final
     */
    KEY_Q:81,

    /**
     * KEY_R keycode
     * @property KEY_R
     * @type {Number}
     * @static
     * @final
     */
    KEY_R:82,

    /**
     * KEY_S keycode
     * @property KEY_S
     * @type {Number}
     * @static
     * @final
     */
    KEY_S:83,

    /**
     * KEY_T keycode
     * @property KEY_T
     * @type {Number}
     * @static
     * @final
     */
    KEY_T:84,

    /**
     * KEY_U keycode
     * @property KEY_U
     * @type {Number}
     * @static
     * @final
     */
    KEY_U:85,

    /**
     * KEY_V keycode
     * @property KEY_V
     * @type {Number}
     * @static
     * @final
     */
    KEY_V:86,

    /**
     * KEY_W keycode
     * @property KEY_W
     * @type {Number}
     * @static
     * @final
     */
    KEY_W:87,

    /**
     * KEY_X keycode
     * @property KEY_X
     * @type {Number}
     * @static
     * @final
     */
    KEY_X:88,

    /**
     * KEY_Y keycode
     * @property KEY_Y
     * @type {Number}
     * @static
     * @final
     */
    KEY_Y:89,

    /**
     * KEY_Z keycode
     * @property KEY_Z
     * @type {Number}
     * @static
     * @final
     */
    KEY_Z:90,

    /**
     * SELECT keycode
     * @property SELECT
     * @type {Number}
     * @static
     * @final
     */
    SELECT:93,

    /**
     * NUMPAD0 keycode
     * @property NUMPAD0
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD0:96,

    /**
     * NUMPAD1 keycode
     * @property NUMPAD1
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD1:97,

    /**
     * NUMPAD2 keycode
     * @property NUMPAD2
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD2:98,

    /**
     * NUMPAD3 keycode
     * @property NUMPAD3
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD3:99,

    /**
     * NUMPAD4 keycode
     * @property NUMPAD4
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD4:100,

    /**
     * NUMPAD5 keycode
     * @property NUMPAD5
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD5:101,

    /**
     * NUMPAD6 keycode
     * @property NUMPAD6
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD6:102,

    /**
     * NUMPAD7 keycode
     * @property NUMPAD7
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD7:103,

    /**
     * NUMPAD8 keycode
     * @property NUMPAD8
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD8:104,

    /**
     * NUMPAD9 keycode
     * @property NUMPAD9
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD9:105,

    /**
     * MULTIPLY keycode
     * @property MULTIPLY
     * @type {Number}
     * @static
     * @final
     */
    MULTIPLY:106,

    /**
     * ADD keycode
     * @property ADD
     * @type {Number}
     * @static
     * @final
     */
    ADD:107,

    /**
     * SUBTRACT keycode
     * @property SUBTRACT
     * @type {Number}
     * @static
     * @final
     */
    SUBTRACT:109,

    /**
     * DECIMALPOINT keycode
     * @property DECIMALPOINT
     * @type {Number}
     * @static
     * @final
     */
    DECIMALPOINT:110,

    /**
     * DIVIDE keycode
     * @property DIVIDE
     * @type {Number}
     * @static
     * @final
     */
    DIVIDE:111,

    /**
     * F1 keycode
     * @property F1
     * @type {Number}
     * @static
     * @final
     */
    F1:112,

    /**
     * F2 keycode
     * @property F2
     * @type {Number}
     * @static
     * @final
     */
    F2:113,

    /**
     * F3 keycode
     * @property F3
     * @type {Number}
     * @static
     * @final
     */
    F3:114,

    /**
     * F4 keycode
     * @property F4
     * @type {Number}
     * @static
     * @final
     */
    F4:115,

    /**
     * F5 keycode
     * @property F5
     * @type {Number}
     * @static
     * @final
     */
    F5:116,

    /**
     * F6 keycode
     * @property F6
     * @type {Number}
     * @static
     * @final
     */
    F6:117,

    /**
     * F7 keycode
     * @property F7
     * @type {Number}
     * @static
     * @final
     */
    F7:118,

    /**
     * F8 keycode
     * @property F8
     * @type {Number}
     * @static
     * @final
     */
    F8:119,

    /**
     * F9 keycode
     * @property F9
     * @type {Number}
     * @static
     * @final
     */
    F9:120,

    /**
     * F10 keycode
     * @property F10
     * @type {Number}
     * @static
     * @final
     */
    F10:121,

    /**
     * F11 keycode
     * @property F11
     * @type {Number}
     * @static
     * @final
     */
    F11:122,

    /**
     * F12 keycode
     * @property F12
     * @type {Number}
     * @static
     * @final
     */
    F12:123,

    /**
     * NUMLOCK keycode
     * @property NUMLOCK
     * @type {Number}
     * @static
     * @final
     */
    NUMLOCK:144,

    /**
     * SCROLLLOCK keycode
     * @property SCROLLLOCK
     * @type {Number}
     * @static
     * @final
     */
    SCROLLLOCK:145,

    /**
     * SEMICOLON keycode
     * @property SEMICOLON
     * @type {Number}
     * @static
     * @final
     */
    SEMICOLON:186,

    /**
     * EQUALSIGN keycode
     * @property EQUALSIGN
     * @type {Number}
     * @static
     * @final
     */
    EQUALSIGN:187,

    /**
     * COMMA keycode
     * @property COMMA
     * @type {Number}
     * @static
     * @final
     */
    COMMA:188,

    /**
     * DASH keycode
     * @property DASH
     * @type {Number}
     * @static
     * @final
     */
    DASH:189,

    /**
     * PERIOD keycode
     * @property PERIOD
     * @type {Number}
     * @static
     * @final
     */
    PERIOD:190,

    /**
     * FORWARDSLASH keycode
     * @property FORWARDSLASH
     * @type {Number}
     * @static
     * @final
     */
    FORWARDSLASH:191,

    /**
     * GRAVEACCENT keycode
     * @property GRAVEACCENT
     * @type {Number}
     * @static
     * @final
     */
    GRAVEACCENT:192,

    /**
     * OPENBRACKET keycode
     * @property OPENBRACKET
     * @type {Number}
     * @static
     * @final
     */
    OPENBRACKET:219,

    /**
     * BACKSLASH keycode
     * @property BACKSLASH
     * @type {Number}
     * @static
     * @final
     */
    BACKSLASH:220,

    /**
     * CLOSEBRAKET keycode
     * @property CLOSEBRAKET
     * @type {Number}
     * @static
     * @final
     */
    CLOSEBRAKET:221,

    /**
     * SINGLEQUOTE keycode
     * @property SINGLEQUOTE
     * @type {Number}
     * @static
     * @final
     */
    SINGLEQUOTE:222
  };

  J.Events.KEY_DOWN = 'onkeydown';
  J.Events.KEY_UP = 'onkeyup';
  J.Events.KEY_PRESS = 'key';

  Keyboard.handlers = {};
  Keyboard.timers = {};

  function triggerKeyEvent(type, evt) {
    var i, length, handlers = Keyboard.handlers[type];

    for (i=0, length=handlers.length; i<length; ++i) {
      handlers[i].handler.apply(handlers[i].target, [evt]);
    }
  }

  [J.Events.KEY_DOWN, J.Events.KEY_UP, J.Events.KEY_PRESS].forEach(function(eventType) {
    Keyboard.handlers[eventType] = [];

    J.Triggerable.register(eventType, function(evt) {
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

  var repeat = 1;

  // Bind document key down
  document.onkeydown = function(e) {
   var key = (e || window.event).keyCode;
    if (!Keyboard.timers[key]) {
      triggerKeyEvent(J.Events.KEY_DOWN, e);
      triggerKeyEvent(J.Events.KEY_PRESS, e);

      if (repeat !== 0) {
        Keyboard.timers[key] = setInterval(function() {
          triggerKeyEvent(J.Events.KEY_PRESS, e);
        }, repeat);
      }
    }
    return false;
  };

  // Bind document key up
  document.onkeyup = function(e) {
    var key = (e || window.event).keyCode;
    if (key in Keyboard.timers) {
      triggerKeyEvent(J.Events.KEY_UP, e);
      if (Keyboard.timers[key]) {
        clearInterval(Keyboard.timers[key]);
      }
      delete Keyboard.timers[key];
    }
  };

  Joy.Keyboard = Keyboard;
})(Joy);

(function(J) {
  J.Events.CLICK = 'click';
  J.Events.DOUBLE_CLICK = 'dblclick';
  J.Events.MOUSE_MOVE = 'mousemove';
  J.Events.MOUSE_DOWN = 'mousedown';
  J.Events.MOUSE_UP = 'mouseup';

  var Mouse = {};

  J.Mouse = Mouse;
})(Joy);

(function(J) {
  var Parallax = J.DisplayObjectContainer.extend({
    /**
     * @class Parallax
     * @constructor
     * @param {Object} options
     */
    init: function(options) {
      if (!(options.pivot instanceof J.DisplayObject)) {
        throw new Error("'pivot' must be given on Parallax constructor, as a DisplayObject instance.");
      }

      this._super(options);
    },

    render: function() {
      this._super();
    }
  });

  J.Parallax = Parallax;
})(Joy);

(function(J) {
  var ParticleEmitter = J.DisplayObject.extend({
    /**
     * @class ParticleEmitter
     * @constructor
     * @param {Object} options
     */
    init: function (options) {

      // position         The position of the particle.
      // velocity         The velocity of the particle.
      // energy           The energy of the particle.
      // startEnergy      The starting energy of the particle.
      // size             The size of the particle.
      // rotation         The rotation of the particle.
      // angularVelocity  The angular velocity of the particle.
      // color            The color of the particle.

      this._super(options);
    }
  });

  J.ParticleEmitter = ParticleEmitter;
})(Joy);

(function(J) {
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

  J.Shader = Shader;
})(Joy);

(function(J) {
  var Tilemap = J.DisplayObjectContainer.extend({
    /**
     * @class TileMap
     * @constructor
     * @param {Object} options
     */
    init: function (options) {
      if (!(options.tileset instanceof J.Tileset)) {
        throw new Error("'tileset' must be given on Tilemap constructor, as Sprite instance.");
      }
      this._super(options);

      /**
       * @property tileset
       * @type {Tileset}
       */
      this.tileset = options.tileset;

      /**
       * @property lines
       * @type {Number}
       */
      this.lines = options.lines || 1;

      /**
       * @property columns
       * @type {Number}
       */
      this.columns = options.columns || 1;

      /**
       * @property data
       * @type {Array}
       */
      this.__defineSetter__('data', function(data) {
        this._data = data;

        if (this.collider == this || this.collider instanceof J.TilemapCollider) {
          this.collider = new J.TilemapCollider(this);
        }
      });
      this.__defineGetter__('data', function() {
        return this._data;
      });
      this.data = options.data;

      /**
       * @property height
       * @readonly
       * @type {Number}
       */
      this.__defineGetter__('height', function () {
        return this.lines * this.tileset.tileHeight;
      });

      /**
       * @property width
       * @readonly
       * @type {Number}
       */
      this.__defineGetter__('width', function () {
        return this.columns * this.tileset.tileWidth;
      });
    },

    render: function() {
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

  J.Tilemap = Tilemap;
})(Joy);

(function(J) {
  var TilemapCollider = function(tilemap) {
    this.blocks = [];

    for (var i=0, length=tilemap.data.length; i<length; ++i) {
      if (tilemap.data[i] === 0) { continue; }

      this.blocks.push(new Joy.RectCollider(new J.Vector2d(tilemap.tileset.tileWidth * (i % tilemap.columns), tilemap.tileset.tileHeight * ((i / tilemap.columns) >> 0)),
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

  J.TilemapCollider = TilemapCollider;
})(Joy);

(function(J) {
  var Tileset = J.Sprite.extend({
    /**
     * @class Tileset
     * @constructor
     * @param {Object} options
     *   @param {String} src
     *   @param {Number} width tile width
     *   @param {Number} height tile height
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

  J.Tileset = Tileset;
})(Joy);

/*
 * Normalizes browser support
 */

(function(J) {
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

  /**
   * Browser support configuration and constants.
   * @class Support
   */
  J.Support = {
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
      function( callback ) { window.setTimeout(callback, 1000 / 60); };		// TODO: use FPS rate from render module
  })();
})(Joy);

