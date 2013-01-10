test("Joy.Text", function() {
  var text = new Joy.Text({text: "Hello!"});
  ok(text.position.x == 0 && text.position.y == 0, "Initialize with default values.");

  withScene(function(scene) {
    scene.addChild(text);
    scene.render();
  });
});
