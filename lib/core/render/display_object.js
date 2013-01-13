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
      this.position = options.position || new J.Vector2d(options.x || 0, options.y || 0);
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
      this.ctx = options.ctx || null;
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
