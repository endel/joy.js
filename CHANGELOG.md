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
