test("Joy.Color", function() {
  var red = new Joy.Color("red");
  deepEqual(red.toString(), "red", "Should be 'red'");

  var rgb = new Joy.Color(255, 0, 100);
  deepEqual(rgb.toString(), "rgb(255,0,100)", "Should result in rgb()");

  var rgba = new Joy.Color(255, 0, 100, 10);
  deepEqual(rgba.toString(), "rgba(255,0,100,10)", "Should result in rgba()");
});
