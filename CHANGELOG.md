0.2.1
===
  - Fixed issue with sprite loaders. (issue #5)

0.2.0
===

  - Use 'canvas' instead of 'canvas2d' when instantiating Joy.Engine with a dom canvas
    element.
  - Integrated particle system
  - Define behaviour identification as string instead of class references.
  - Accept options when attaching behaviours to objects.
  - Added `Joy.SpriteAnimation` class, allowing to define `framesPerSecond`
    attribute for each `SpriteSheet`'s animation set.

0.1.1
===

  - Added Joy.Loader class, which triggers `loadStart` / `loadProgress` / `loadEnd` events.
  - Refactor on Engine#currentScene getter/setter to handle with
    Engine#sceneLoader
  - Fixed Scene#background(color) method, when scene has no child.
  - Omit 'new' when creating Tween instances.
  - Use Object.defineProperty instead of __defineGetter__ / __defineSetter__ for
    IE9+ support.


0.1.0
===

First public release.
