test("Math", function() {
  deepEqual(Math.clamp(5, -3, 3), 3, "clamp");
  deepEqual(Math.clamp(-5, -3, 3), -3, "clamp");
});

