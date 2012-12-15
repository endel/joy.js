test("Joy.Text", function() {
  var text = new Joy.Text({text: "Hello!"});
  ok(text.x == 0 && text.y == 0, "Initialize with default values.");

  withEngine(function(r) {
    r.addChild(text);
    r.render();
  });
});
