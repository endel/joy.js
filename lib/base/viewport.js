(function(J) {
  var Viewport = J.Triggerable.extend({
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

      this.id = options.id || Joy.generateUniqueId();

      /**
       * @property position
       * @type {Vector2d}
       */
      this.position = new J.Vector2d();
      this._lastPosition = new J.Vector2d();

      /**
       * Current viewport translation offset
       * @property translation
       * @type {Vector2d}
       */
      this.translation = new J.Vector2d();

      /**
       * Container DisplayObject
       * @property scene
       * @type {DisplayObjectContainer}
       */
      if (options.scene) {
        this.scene = options.scene;
        this.ctx = this.scene.ctx;
      }

      /**
       * @property hud
       * @type {DisplayObjectContainer}
       */
      this.hud = new J.DisplayObjectContainer({id: this.id + "_HUD", ctx: this.ctx});
      this.hud.position = this.position;

      /**
       * @property active
       * @type {Boolean}
       * @readonly
       */
      this.active = false;

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
       * @property width
       * @type {Number}
       */
      this.width = options.width;

      /**
       * @property height
       * @type {Number}
       */
      this.height = options.height;

      /**
       * DisplayObject that will be followed.
       * @property follow
       * @type {DisplayObject}
       */
      if (options.follow) {
        this.follow = options.follow;
      }

      this.scale = new J.Vector2d(1, 1);

      if (this.width && this.height) {
        this.setSize(this.width, this.height);
      }
    },

    /**
     * @method setSize
     * @param {Number} width
     * @param {Number} height
     * @return {Viewport}
     */
    setSize: function (width, height) {
      this.width = width;
      this.height = height;

      this.ctx.scale((this.ctx.canvas.width / this.width) * this.scale.x, (this.ctx.canvas.height / this.height) * this.scale.y);

      this.scale.x = this.width / this.ctx.canvas.width;
      this.scale.y = this.height / this.ctx.canvas.height;

      return this;
    },

    /**
     * TODO: not supported yet
     * @method setDeadzone
     * @param {Number} width
     * @param {Number} height
     * @return {Viewport} this
     */
    setDeadzone: function(width, height) {
      this.deadzone = new J.Vector2d(width, height);
      return this;
    },

    updateContext: function() {
      var widthLimit = this.width / 2,
          heightLimit = this.height / 2;

      this.position.x = ~~ (this.follow.position.x + (this.follow.width / 2) - (this.width / 2));
      this.position.y = ~~ (this.follow.position.y + (this.follow.height / 2) - (this.height / 2));

      this.translation.x = -this.position.x + this._lastPosition.x;
      this.translation.y = -this.position.y + this._lastPosition.y;

      this.active = true;

      if (this.active) {
        this.trigger('translate', [this.translation.x,  this.translation.y]);
        this.ctx.translate(this.translation.x,  this.translation.y);
      }

      this._lastPosition.x = this.position.x;
      this._lastPosition.y = this.position.y;
    },

    render: function () {
      //console.log("Render hud!", this.hud.position.toString(), this.hud.children);
      this.hud.render();
    }

  });

  J.Viewport = Viewport;
})(Joy);
