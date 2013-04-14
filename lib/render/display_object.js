/**
 * @module Joy
 */
(function(J) {
  var DisplayObject = J.Triggerable.extend({

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
      this.id = options.id || Joy.generateUniqueId();

      /**
       * @attribute position
       * @type {Vector2d}
       * @default 0,0
       */
      this.position = options.position || new J.Vector2d(options.x || 0, options.y || 0);
      Object.defineProperty(this, 'collidePosition', {
        get: function () {
          var origin = (this._parent !== null) ? this._parent.collidePosition : new J.Vector2d();
          return origin.sum(this.position).subtract(this.pivot);
        },
        configurable: true
      });

      /**
       * @attribute pivot
       * @type {Vector2d}
       * @default 0,0
       */
      this.pivot = options.pivot || new J.Vector2d(options.pivotX || 0, options.pivotY || 0);

      /**
       * @attribute skewX
       * @type {Number}
       * @default 0
       */
      this.skew = options.skew || new J.Vector2d(options.skewX || 0, options.skewY || 0);

      /**
       * @attribute scale
       * @type {Vector2d}
       * @default 1,1
       */
      this.scale = options.scale || new J.Vector2d(options.scaleX || 1, options.scaleY || 1);

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
      this._matrix = J.Matrix2D.identity.clone();
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
          var parent = this._parent;
          while (!(parent instanceof J.Scene) && parent !== null) {
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
        this.bind(J.Events.UPDATE, this.checkCollisions);
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
      if (displayObjects instanceof J.DisplayObject) {
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
      if (J.debug) {
        this.collider.renderStroke(this.ctx);
      }

      // Check collisions
      for (var i = 0; i < totalTargets; ++i) {
        collider = this._collisionTargets[i].collider;

        if (collider.collide(this.collider)) {
          // Trigger COLLISION_START when it's colliding for the first time.
          if (!this._collisionActive[collider.id]) {
            this.trigger(J.Events.COLLISION_ENTER, [ this._collisionTargets[i] ]);
            this._collisionActive[collider.id] = true;
          }

          this.trigger(J.Events.COLLISION, [ this._collisionTargets[i] ]);

        } else if (this._collisionActive[collider.id]) {
          delete this._collisionActive[collider.id];
          this.trigger(J.Events.COLLISION_EXIT, [ this._collisionTargets[i] ]);
        }
      }
    },

    /**
     * @method willCollideAt
     * @param {Vector2d} projection
     * @return {DisplayObject, null}
     */
    willCollideAt: function (projection) {
      var tmpCollider = new J.RectCollider(this.collider.position.clone().sum(projection), 1, 1),
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
      return new J.Rect(this.position.x, this.position.y, this.width, this.height);
    }
  });

  J.DisplayObject = DisplayObject;
})(Joy);
