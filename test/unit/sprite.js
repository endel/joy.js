test("Joy.Sprite", function() {
  var sprite = new Joy.Sprite({url: "../examples/shared-assets/mario.png"});
  ok(sprite.x == 0 && sprite.y == 0, "Initialize with default values.");

  withScene(function(scene) {
    scene.addChild(sprite);
    scene.render();
  });
});

