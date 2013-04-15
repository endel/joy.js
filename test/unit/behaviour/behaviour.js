test("Joy.Behaviour", function() {
  var o = new Joy.DisplayObject();
  o.behave('Movimentation');
  deepEqual(o.hasBehaviour('Movimentation'), true, "#hasBehaviour('Movimentation')");

  var o = new Joy.DisplayObject();
  o.behave('Particle', {whatever: true});
  deepEqual(o.particleOptions.whatever, true, "should initialize behaviour with options");
});
