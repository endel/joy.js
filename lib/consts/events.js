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
