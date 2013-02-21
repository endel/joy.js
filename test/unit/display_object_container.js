test("Joy.DisplayObjectContainer", function() {
  var scene, o1, o2, o3,
      container = new Joy.DisplayObjectContainer();;

  o1 = new Joy.DisplayObject({id: "o1"});
  o2 = new Joy.DisplayObject({id: "o2"});
  o3 = new Joy.DisplayObject({id: "o3"});

  container.addChild(o1);
  deepEqual(container.numChildren, 1, "increase numChildren adding child");
  deepEqual(container.getChildAt(0).id, "o1");

  container.addChild(o2);
  deepEqual(container.numChildren, 2, "increase numChildren adding child");
  deepEqual(container.getChildAt(1).id, "o2");

  container.addChild(o3);
  deepEqual(container.numChildren, 3, "increase numChildren adding child");
  deepEqual(container.getChildAt(2).id, "o3");

  container.removeChildAt(1);
  deepEqual(container.numChildren, 2, "reduce numChildren after removing child");
  deepEqual(container.getChildAt(1).id, "o3");
});

