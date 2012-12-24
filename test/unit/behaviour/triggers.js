test("Joy.Triggerable", function() {
  var check = null;
  var this_context = null;
  var handler1 = function() { this_context = this; check = "handler1"; }
  var handler2 = function() { check = "handler2"; }
  var handler3 = function() { check = "handler3"; }
  var multiple = function() { check += "multi"; }

  var t = new Joy.Triggerable();
  t.bind('handler1', handler1);
  t.bind('handler2', handler2);
  t.bind('handler3', handler3);
  t.bind('handler3', multiple);

  deepEqual(check, null, "nothing should be called");

  t.trigger('handler1');
  deepEqual(check, "handler1", "handler1 should be called");
  deepEqual(this_context, t, "'this' should be the triggerable instance");

  t.trigger('handler2');
  deepEqual(check, "handler2", "handler2 should be called");

  t.trigger('handler3');
  deepEqual(check, "handler3multi", "handler3 should be called");

  t.bind('handler3', multiple);
  t.trigger('handler3');
  deepEqual(check, "handler3multi", "same event/handler should'nt be binded twice");
});

