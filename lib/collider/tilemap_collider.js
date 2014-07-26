/**
 * @module Joy
 */

var RectCollider = require('./rect_collider');
var Vector2d = require('../math/vector2d');

/**
 * @class TilemapCollider
 * @param {Tilemap} tilemap
 * @constructor
 */
var TilemapCollider = function(tilemap) {
  this.blocks = [];

  for (var i=0, length=tilemap.data.length; i<length; ++i) {
    if (tilemap.data[i] === 0) { continue; }

    this.blocks.push(new RectCollider(new Vector2d(tilemap.tileset.tileWidth * (i % tilemap.columns), tilemap.tileset.tileHeight * ((i / tilemap.columns) >> 0)),
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

module.exports = TilemapCollider;
