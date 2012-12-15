test(Joy.Text, function() {
  var text = new Joy.Text({text: "Hello!"});
  ok(text.x == 0);
  ok(text.y == 0);

  var r = getRenderer();
  r.addChild(text);
  r.render();
});
