test("Joy.Sprite", function() {
  var sprite = new Joy.Sprite({src: "../examples/shared-assets/mario.png"});
  ok(sprite.position.x == 0 && sprite.position.y == 0, "Initialize with default values.");

  withScene(function(scene) {
    scene.addChild(sprite);
    scene.render();
  });
});

