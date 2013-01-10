test("Joy.SpriteSheet", function() {
  var sprite = new Joy.SpriteSheet({
    src: "../examples/games/rufus/assets/spritesheets/rufus.png",
    width: 120,
    height: 120,
    animations: {
      "walking": [0, 30],
      "idle": [31, 39],
      "jumping": [40, 59],
      "falling": [60, 67],
    }
  });

  ok(sprite.position.x == 0 && sprite.position.y == 0, "Initialize with default values.");
});


