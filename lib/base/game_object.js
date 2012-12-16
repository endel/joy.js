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

