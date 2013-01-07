(function(J) {
  var TilemapCollider = function(tilemap) {
    this.blocks = [];

    for (var i=0, length=tilemap.data.length; i<length; ++i) {
      if (tilemap.data[i] === 0) { continue; }

      this.blocks.push(new Joy.Rect(tilemap.tileset.tileWidth * (i % tilemap.columns),
                                    tilemap.tileset.tileHeight * ((i / tilemap.columns) >> 0),
                                    tilemap.tileset.tileWidth,
                                    tilemap.tileset.tileHeight));
    }

    this.length = this.blocks.length;
  };

  TilemapCollider.prototype.collide = function(collider) {
    for (var i=0; i<this.length; ++i) {
      if (!( this.blocks[i].x >= collider.x + collider.width  ||
             collider.x       >= this.blocks[i].x + this.blocks[i].width          ||
             this.blocks[i].y >= collider.y + collider.height ||
             collider.y       >= this.blocks[i].y + this.blocks[i].height)) {
        return true;
      }
    }
    return false;
  };

  TilemapCollider.prototype.render = function(ctx) {
    for (var i=0; i<this.length; ++i) {
      ctx.strokeRect(this.blocks[i].x, this.blocks[i].y, this.blocks[i].width, this.blocks[i].height);
    }
  };

  J.TilemapCollider = TilemapCollider;
})(Joy);
