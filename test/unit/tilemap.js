test("Joy.Tilemap", function() {
  var tileset = new Joy.Tileset({
    src: "../examples/games/rufus/assets/tilesets/bright.png",
    width: 64,
    height: 64
  });
  deepEqual(tileset.tileWidth, 64, "tileset should have valid #tileWidth attribute");
  deepEqual(tileset.tileHeight, 64, "tileset should have valid #tileHeight attribute");

  var tilemap = new Joy.Tilemap({
    tileset: tileset,
    lines: 10,
    columns: 12,
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25,
      0, 0, 0, 0, 0, 0, 28, 0, 0, 13, 35, 31,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 9,
      0, 0, 0, 0, 1, 3, 3, 2, 4, 4, 20, 11,
      0, 0, 0, 0, 29, 26, 24, 24, 23, 24, 21, 11,
      0, 0, 28, 0, 0, 32, 0, 0, 0, 0, 29, 23,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 3, 5, 2, 3, 3, 4, 3, 3, 4, 6, 0,
      7, 8, 8, 9, 10, 11, 8, 8, 8, 10, 19, 5
    ]
  });
  ok(tilemap.collider instanceof Joy.TilemapCollider, "collider should be 'Joy.TilemapCollider' instance.");

  deepEqual(tilemap.width, tileset.tileWidth * tilemap.columns, "valid width");
  deepEqual(tilemap.height, tileset.tileHeight * tilemap.lines, "valid height");

  withScene(function(scene) {
    scene.addChild(tilemap);
    scene.render();
  });
});

