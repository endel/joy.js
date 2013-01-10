(function(J) {
  var TilemapCollider = function(tilemap) {
    this.blocks = [];

    for (var i=0, length=tilemap.data.length; i<length; ++i) {
      if (tilemap.data[i] === 0) { continue; }

      this.blocks.push(new Joy.Rect(new J.Vector2d(tilemap.tileset.tileWidth * (i % tilemap.columns), tilemap.tileset.tileHeight * ((i / tilemap.columns) >> 0)),
                                    tilemap.tileset.tileWidth,
                                    tilemap.tileset.tileHeight));
    }

    this.length = this.blocks.length;
  };

  TilemapCollider.prototype.collide = function(collider) {
    for (var i=0; i<this.length; ++i) {
      if (!( this.blocks[i].position.x  >= collider.position.x + collider.width     ||
             collider.position.x        >= this.blocks[i].position.x + this.blocks[i].width  ||
             this.blocks[i].position.y  >= collider.position.y + collider.height    ||
             collider.position.y        >= this.blocks[i].position.y + this.blocks[i].height)) {
        return true;
      }
    }
    return false;
  };

  TilemapCollider.prototype.render = function(ctx) {
    for (var i=0; i<this.length; ++i) {
      ctx.strokeRect(this.blocks[i].position.x, this.blocks[i].position.y, this.blocks[i].width, this.blocks[i].height);
    }
  };

  J.TilemapCollider = TilemapCollider;
})(Joy);
