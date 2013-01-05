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
       * @property x
       * @type {Number}
       * @default 0
       */
      this.x = options.x || 0;

      /**
       * @property y
       * @type {Number}
       * @default 0
       */
      this.y = options.y || 0;

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
       * @property pivotX
       * @type {Number}
       * @default 0
       */
      this.pivotX = options.pivotX || 0;

      /**
       * @property pivotY
       * @type {Number}
       * @default 0
       */
      this.pivotY = options.pivotY || 0;

      /**
       * @property skewX
       * @type {Number}
       * @default 0
       */
      this.skewX = options.skewX || 0;

      /**
       * @property skewY
       * @type {Number}
       * @default 0
       */
      this.skewY = options.skewY || 0;

      /**
       * @property scaleX
       * @type {Number}
       * @default 1
       */
      this.scaleX = options.scaleX || 1;

      /**
       * @property scaleY
       * @type {Number}
       * @default 1
       */
      this.scaleY = options.scaleY || 1;

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
       * Collider object. Can be a DisplayObject, or a geometry.
       * @property collider
       * @type {DisplayObject, Rect, Circle}
       * @default this
       */
      this.collider = this; // new J.Rect(this.x, this.y, this.width, this.height);

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
        return this._visible && this.alpha > 0 && this.scaleX !== 0 && this.scaleY !== 0;
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

      this.__defineGetter__('width', function() {
        return this._width * this.scaleX;
      });

      this.__defineGetter__('height', function() {
        return this._height * this.scaleY;
      });


      this._super();
    },

    setContext: function(ctx) {
      this.ctx = ctx;
    },

    onCollide: function(displayObject, callback) {
      if (this._collisionTargets.indexOf(displayObject) === -1) {
        this._collisionTargets.push(displayObject);
        this.bind('collide', callback);
      }
    },

    /**
     * Register scale context operations
     * @method scale
     * @param {Number} scaleX
     * @param {Number} scaleY
     */
    scale: function(scaleX, scaleY) {
      this.scaleX = scaleX;
      this.scaleY = scaleY;
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
      var mtx = this._matrix.identity().appendTransform(this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.skewX, this.skewY, this.pivotX, this.pivotY);

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
        this.x      >= collider.x + collider.width  ||
        collider.x  >= this.x + this.width          ||
        this.y      >= collider.y + collider.height ||
        collider.y  >= this.y + this.height
      );
    },

    /**
     * Apply all custom context operations.
     * @method render
     */
    render: function() {
      // Check collisions
      var i = 0, collisionTargetsLength = this._collisionTargets.length;
      for (; i < collisionTargetsLength; ++i) {
        if (this._collisionTargets[i].collider.collide(this.collider)) {
          this.trigger('collide', [ this._collisionTargets[i] ]);
        }
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

    /**
     * Get a clone of the current transformation
     * @method getMatrix
     * @return {Matrix2D}
     */
    getMatrix: function() {
      return this._matrix.clone();
    }
  });

  J.DisplayObject = DisplayObject;
})(Joy);
