test("Joy.DisplayObject", function() {
  var scene, o, container;

  o = new Joy.DisplayObject;
  deepEqual(o.parent, null, "has null parent");
  deepEqual(o.scene, null, "has null scene");

  container = new Joy.DisplayObjectContainer();
  container.addChild(o);
  deepEqual(o.parent, container, "has valid parent");
  deepEqual(o.scene, null, "has null scene when in a container");

  withScene(function(_scene) {
    scene = _scene;
    scene.addChild(container);
  });
  deepEqual(o.scene, scene, "have valid scene added into one");
});
