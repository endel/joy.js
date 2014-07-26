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
