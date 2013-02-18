0.1.1
===

  - Added Joy.Loader class, which triggers `loadStart` / `loadProgress` / `loadEnd` events.
  - Refactor on Engine#currentScene getter/setter to handle with
    Engine#sceneLoader
  - Fixed Scene#background(color) method, when scene has no child.
  - Omit 'new' when creating Tween instances.


0.1.0
===

First public release.
