/*
 * joy.js v0.3.0
 * http://joyjs.org
 *
 * @copyright 2012-2014 Endel Dreyer
 * @license MIT
 */

var Joy = require('./joy.js');

// Core
Joy.Engine = require('./core/engine.js');
Joy.Support = require('./core/support.js');
Joy.Triggerable = require('./core/triggerable.js');

// Math
require('./math/math');
Joy.Vector2d = require('./math/vector2d');
Joy.Matrix2d = require('./math/matrix2d');
Joy.Range = require('./math/range');

// Collider
Joy.RectCollider = require('./collider/rect_collider.js');
Joy.TilemapCollider = require('./collider/tilemap_collider.js');

// Render
Joy.DisplayObject = require('./render/display_object.js');
Joy.DisplayObjectContainer = require('./render/display_object_container.js');
Joy.Font = require('./render/font.js');
Joy.Parallax = require('./render/parallax.js');
Joy.ParticleEmitter = require('./render/particle_emitter.js');
Joy.Scene = require('./render/scene.js');
Joy.Sprite = require('./render/sprite.js');
Joy.SpriteAnimation = require('./render/sprite_animation.js');
Joy.SpriteSheet = require('./render/sprite_sheet.js');
Joy.Text = require('./render/text.js');
Joy.Tilemap = require('./render/tilemap.js');
Joy.Tileset = require('./render/tileset.js');
Joy.Viewport = require('./render/viewport.js');

// Geom
Joy.Rect = require('./geom/rect');
Joy.Circle = require('./geom/circle');

// Consts
Joy.CompositeOperation = require('./consts/composite_operation.js');
Joy.Events = require('./consts/events.js');

// Util
Joy.Color = require('./util/color.js');
Joy.Loader = require('./util/loader.js');
Joy.Shader = require('./util/shader.js');
Joy.Utils = require('./util/utils.js');

// Input
Joy.Keyboard = require('./input/keyboard');
Joy.Mouse = require('./input/mouse');
Joy.Touch = require('./input/touch');

// Behaviours / built-in
Joy.Behaviour = require('./behaviour/behaviour');
require('./behaviour/movimentation');
require('./behaviour/button');
require('./behaviour/particle');

// Misc
Joy.Markup = require('./init/markup');

// Third-party modules
Joy.Sound = require('./modules/sound.js');
Joy.Tween = require('./modules/tween.js');

if (module && module.exports) { module.exports = Joy; }
if (typeof(window) !== "undefined") { window.Joy = Joy; }
