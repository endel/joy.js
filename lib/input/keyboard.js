/**
 * @module Joy
 */
(function(J) {
  /**
   * @class Keyboard
   * @static
   * @readonly
   */
  var Keyboard = {
    /**
     * Enter keycode
     * @attribute ENTER
     * @type {Number}
     * @static
     * @final
     */
    ENTER:13,

    /**
     * SPACE keycode
     * @attribute SPACE
     * @type {Number}
     * @static
     * @final
     */
    SPACE:32,

    /**
     * BACKSPACE keycode
     * @attribute BACKSPACE
     * @type {Number}
     * @static
     * @final
     */
    BACKSPACE:8,

    /**
     * TAB keycode
     * @attribute TAB
     * @type {Number}
     * @static
     * @final
     */
    TAB:9,

    /**
     * SHIFT keycode
     * @attribute SHIFT
     * @type {Number}
     * @static
     * @final
     */
    SHIFT:16,

    /**
     * CTRL keycode
     * @attribute CTRL
     * @type {Number}
     * @static
     * @final
     */
    CTRL:17,

    /**
     * ALT keycode
     * @attribute ALT
     * @type {Number}
     * @static
     * @final
     */
    ALT:18,

    /**
     * PAUSE keycode
     * @attribute PAUSE
     * @type {Number}
     * @static
     * @final
     */
    PAUSE:19,

    /**
     * CAPSLOCK keycode
     * @attribute CAPSLOCK
     * @type {Number}
     * @static
     * @final
     */
    CAPSLOCK:20,

    /**
     * ESCAPE keycode
     * @attribute ESCAPE
     * @type {Number}
     * @static
     * @final
     */
    ESCAPE:27,

    /**
     * PAGEUP keycode
     * @attribute PAGEUP
     * @type {Number}
     * @static
     * @final
     */
    PAGEUP:33,

    /**
     * PAGEDOWN keycode
     * @attribute PAGEDOWN
     * @type {Number}
     * @static
     * @final
     */
    PAGEDOWN:34,

    /**
     * END keycode
     * @attribute END
     * @type {Number}
     * @static
     * @final
     */
    END:35,

    /**
     * HOME keycode
     * @attribute HOME
     * @type {Number}
     * @static
     * @final
     */
    HOME:36,

    /**
     * LEFT keycode
     * @attribute LEFT
     * @type {Number}
     * @static
     * @final
     */
    LEFT:37,

    /**
     * UP keycode
     * @attribute UP
     * @type {Number}
     * @static
     * @final
     */
    UP:38,

    /**
     * RIGHT keycode
     * @attribute RIGHT
     * @type {Number}
     * @static
     * @final
     */
    RIGHT:39,

    /**
     * DOWN keycode
     * @attribute DOWN
     * @type {Number}
     * @static
     * @final
     */
    DOWN:40,

    /**
     * INSERT keycode
     * @attribute INSERT
     * @type {Number}
     * @static
     * @final
     */
    INSERT:45,

    /**
     * DELETE keycode
     * @attribute DELETE
     * @type {Number}
     * @static
     * @final
     */
    DELETE:46,

    /**
     * KEY_0 keycode
     * @attribute KEY_0
     * @type {Number}
     * @static
     * @final
     */
    KEY_0:48,

    /**
     * KEY_1 keycode
     * @attribute KEY_1
     * @type {Number}
     * @static
     * @final
     */
    KEY_1:49,

    /**
     * KEY_2 keycode
     * @attribute KEY_2
     * @type {Number}
     * @static
     * @final
     */
    KEY_2:50,

    /**
     * KEY_3 keycode
     * @attribute KEY_3
     * @type {Number}
     * @static
     * @final
     */
    KEY_3:51,

    /**
     * KEY_4 keycode
     * @attribute KEY_4
     * @type {Number}
     * @static
     * @final
     */
    KEY_4:52,

    /**
     * KEY_5 keycode
     * @attribute KEY_5
     * @type {Number}
     * @static
     * @final
     */
    KEY_5:53,

    /**
     * KEY_6 keycode
     * @attribute KEY_6
     * @type {Number}
     * @static
     * @final
     */
    KEY_6:54,

    /**
     * KEY_7 keycode
     * @attribute KEY_7
     * @type {Number}
     * @static
     * @final
     */
    KEY_7:55,

    /**
     * KEY_8 keycode
     * @attribute KEY_8
     * @type {Number}
     * @static
     * @final
     */
    KEY_8:56,

    /**
     * KEY_9 keycode
     * @attribute KEY_9
     * @type {Number}
     * @static
     * @final
     */
    KEY_9:57,

    /**
     * KEY_A keycode
     * @attribute KEY_A
     * @type {Number}
     * @static
     * @final
     */
    KEY_A:65,

    /**
     * KEY_B keycode
     * @attribute KEY_B
     * @type {Number}
     * @static
     * @final
     */
    KEY_B:66,

    /**
     * KEY_C keycode
     * @attribute KEY_C
     * @type {Number}
     * @static
     * @final
     */
    KEY_C:67,

    /**
     * KEY_D keycode
     * @attribute KEY_D
     * @type {Number}
     * @static
     * @final
     */
    KEY_D:68,

    /**
     * KEY_E keycode
     * @attribute KEY_E
     * @type {Number}
     * @static
     * @final
     */
    KEY_E:69,

    /**
     * KEY_F keycode
     * @attribute KEY_F
     * @type {Number}
     * @static
     * @final
     */
    KEY_F:70,

    /**
     * KEY_G keycode
     * @attribute KEY_G
     * @type {Number}
     * @static
     * @final
     */
    KEY_G:71,

    /**
     * KEY_H keycode
     * @attribute KEY_H
     * @type {Number}
     * @static
     * @final
     */
    KEY_H:72,

    /**
     * KEY_I keycode
     * @attribute KEY_I
     * @type {Number}
     * @static
     * @final
     */
    KEY_I:73,

    /**
     * KEY_J keycode
     * @attribute KEY_J
     * @type {Number}
     * @static
     * @final
     */
    KEY_J:74,

    /**
     * KEY_K keycode
     * @attribute KEY_K
     * @type {Number}
     * @static
     * @final
     */
    KEY_K:75,

    /**
     * KEY_L keycode
     * @attribute KEY_L
     * @type {Number}
     * @static
     * @final
     */
    KEY_L:76,

    /**
     * KEY_M keycode
     * @attribute KEY_M
     * @type {Number}
     * @static
     * @final
     */
    KEY_M:77,

    /**
     * KEY_N keycode
     * @attribute KEY_N
     * @type {Number}
     * @static
     * @final
     */
    KEY_N:78,

    /**
     * KEY_O keycode
     * @attribute KEY_O
     * @type {Number}
     * @static
     * @final
     */
    KEY_O:79,

    /**
     * KEY_P keycode
     * @attribute KEY_P
     * @type {Number}
     * @static
     * @final
     */
    KEY_P:80,

    /**
     * KEY_Q keycode
     * @attribute KEY_Q
     * @type {Number}
     * @static
     * @final
     */
    KEY_Q:81,

    /**
     * KEY_R keycode
     * @attribute KEY_R
     * @type {Number}
     * @static
     * @final
     */
    KEY_R:82,

    /**
     * KEY_S keycode
     * @attribute KEY_S
     * @type {Number}
     * @static
     * @final
     */
    KEY_S:83,

    /**
     * KEY_T keycode
     * @attribute KEY_T
     * @type {Number}
     * @static
     * @final
     */
    KEY_T:84,

    /**
     * KEY_U keycode
     * @attribute KEY_U
     * @type {Number}
     * @static
     * @final
     */
    KEY_U:85,

    /**
     * KEY_V keycode
     * @attribute KEY_V
     * @type {Number}
     * @static
     * @final
     */
    KEY_V:86,

    /**
     * KEY_W keycode
     * @attribute KEY_W
     * @type {Number}
     * @static
     * @final
     */
    KEY_W:87,

    /**
     * KEY_X keycode
     * @attribute KEY_X
     * @type {Number}
     * @static
     * @final
     */
    KEY_X:88,

    /**
     * KEY_Y keycode
     * @attribute KEY_Y
     * @type {Number}
     * @static
     * @final
     */
    KEY_Y:89,

    /**
     * KEY_Z keycode
     * @attribute KEY_Z
     * @type {Number}
     * @static
     * @final
     */
    KEY_Z:90,

    /**
     * SELECT keycode
     * @attribute SELECT
     * @type {Number}
     * @static
     * @final
     */
    SELECT:93,

    /**
     * NUMPAD0 keycode
     * @attribute NUMPAD0
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD0:96,

    /**
     * NUMPAD1 keycode
     * @attribute NUMPAD1
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD1:97,

    /**
     * NUMPAD2 keycode
     * @attribute NUMPAD2
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD2:98,

    /**
     * NUMPAD3 keycode
     * @attribute NUMPAD3
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD3:99,

    /**
     * NUMPAD4 keycode
     * @attribute NUMPAD4
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD4:100,

    /**
     * NUMPAD5 keycode
     * @attribute NUMPAD5
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD5:101,

    /**
     * NUMPAD6 keycode
     * @attribute NUMPAD6
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD6:102,

    /**
     * NUMPAD7 keycode
     * @attribute NUMPAD7
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD7:103,

    /**
     * NUMPAD8 keycode
     * @attribute NUMPAD8
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD8:104,

    /**
     * NUMPAD9 keycode
     * @attribute NUMPAD9
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD9:105,

    /**
     * MULTIPLY keycode
     * @attribute MULTIPLY
     * @type {Number}
     * @static
     * @final
     */
    MULTIPLY:106,

    /**
     * ADD keycode
     * @attribute ADD
     * @type {Number}
     * @static
     * @final
     */
    ADD:107,

    /**
     * SUBTRACT keycode
     * @attribute SUBTRACT
     * @type {Number}
     * @static
     * @final
     */
    SUBTRACT:109,

    /**
     * DECIMALPOINT keycode
     * @attribute DECIMALPOINT
     * @type {Number}
     * @static
     * @final
     */
    DECIMALPOINT:110,

    /**
     * DIVIDE keycode
     * @attribute DIVIDE
     * @type {Number}
     * @static
     * @final
     */
    DIVIDE:111,

    /**
     * F1 keycode
     * @attribute F1
     * @type {Number}
     * @static
     * @final
     */
    F1:112,

    /**
     * F2 keycode
     * @attribute F2
     * @type {Number}
     * @static
     * @final
     */
    F2:113,

    /**
     * F3 keycode
     * @attribute F3
     * @type {Number}
     * @static
     * @final
     */
    F3:114,

    /**
     * F4 keycode
     * @attribute F4
     * @type {Number}
     * @static
     * @final
     */
    F4:115,

    /**
     * F5 keycode
     * @attribute F5
     * @type {Number}
     * @static
     * @final
     */
    F5:116,

    /**
     * F6 keycode
     * @attribute F6
     * @type {Number}
     * @static
     * @final
     */
    F6:117,

    /**
     * F7 keycode
     * @attribute F7
     * @type {Number}
     * @static
     * @final
     */
    F7:118,

    /**
     * F8 keycode
     * @attribute F8
     * @type {Number}
     * @static
     * @final
     */
    F8:119,

    /**
     * F9 keycode
     * @attribute F9
     * @type {Number}
     * @static
     * @final
     */
    F9:120,

    /**
     * F10 keycode
     * @attribute F10
     * @type {Number}
     * @static
     * @final
     */
    F10:121,

    /**
     * F11 keycode
     * @attribute F11
     * @type {Number}
     * @static
     * @final
     */
    F11:122,

    /**
     * F12 keycode
     * @attribute F12
     * @type {Number}
     * @static
     * @final
     */
    F12:123,

    /**
     * NUMLOCK keycode
     * @attribute NUMLOCK
     * @type {Number}
     * @static
     * @final
     */
    NUMLOCK:144,

    /**
     * SCROLLLOCK keycode
     * @attribute SCROLLLOCK
     * @type {Number}
     * @static
     * @final
     */
    SCROLLLOCK:145,

    /**
     * SEMICOLON keycode
     * @attribute SEMICOLON
     * @type {Number}
     * @static
     * @final
     */
    SEMICOLON:186,

    /**
     * EQUALSIGN keycode
     * @attribute EQUALSIGN
     * @type {Number}
     * @static
     * @final
     */
    EQUALSIGN:187,

    /**
     * COMMA keycode
     * @attribute COMMA
     * @type {Number}
     * @static
     * @final
     */
    COMMA:188,

    /**
     * DASH keycode
     * @attribute DASH
     * @type {Number}
     * @static
     * @final
     */
    DASH:189,

    /**
     * PERIOD keycode
     * @attribute PERIOD
     * @type {Number}
     * @static
     * @final
     */
    PERIOD:190,

    /**
     * FORWARDSLASH keycode
     * @attribute FORWARDSLASH
     * @type {Number}
     * @static
     * @final
     */
    FORWARDSLASH:191,

    /**
     * GRAVEACCENT keycode
     * @attribute GRAVEACCENT
     * @type {Number}
     * @static
     * @final
     */
    GRAVEACCENT:192,

    /**
     * OPENBRACKET keycode
     * @attribute OPENBRACKET
     * @type {Number}
     * @static
     * @final
     */
    OPENBRACKET:219,

    /**
     * BACKSLASH keycode
     * @attribute BACKSLASH
     * @type {Number}
     * @static
     * @final
     */
    BACKSLASH:220,

    /**
     * CLOSEBRAKET keycode
     * @attribute CLOSEBRAKET
     * @type {Number}
     * @static
     * @final
     */
    CLOSEBRAKET:221,

    /**
     * SINGLEQUOTE keycode
     * @attribute SINGLEQUOTE
     * @type {Number}
     * @static
     * @final
     */
    SINGLEQUOTE:222
  };

  /**
   * Events.KEY_DOWN
   * @type {String}
   * @static
   * @final
   */
  J.Events.KEY_DOWN = 'onkeydown';

  /**
   * Events.KEY_UP
   * @type {String}
   * @static
   * @final
   */
  J.Events.KEY_UP = 'onkeyup';

  /**
   * Events.KEY_PRESS
   * @type {String}
   * @static
   * @final
   */
  J.Events.KEY_PRESS = 'key';

  /**
   * @property repeatRate
   * @type {Number}
   * @default 1
   */
  Keyboard.repeatRate = 1;
  Keyboard.handlers = {};
  Keyboard.timers = {};

  function triggerKeyEvent(type, evt) {
    var i, length, handlers = Keyboard.handlers[type];

    for (i=0, length=handlers.length; i<length; ++i) {
      handlers[i].handler.apply(handlers[i].target, [evt]);
    }
  }

  [J.Events.KEY_DOWN, J.Events.KEY_UP, J.Events.KEY_PRESS].forEach(function(eventType) {
    Keyboard.handlers[eventType] = [];

    J.Triggerable.register(eventType, function(evt) {
      if (Keyboard.handlers[eventType].indexOf(evt) === -1) {
        Keyboard.handlers[eventType].push(evt);
      }
    }, function(evt) {
      var index = Keyboard.handlers[eventType].indexOf(evt);
      if (index !== -1) {
        Keyboard.handlers[eventType].splice(index, 1);
      }
    });
  });

  // Bind document key down
  document.onkeydown = function(e) {
   var key = (e || window.event).keyCode;
    if (!Keyboard.timers[key]) {
      triggerKeyEvent(J.Events.KEY_DOWN, e);
      triggerKeyEvent(J.Events.KEY_PRESS, e);

      if (Keyboard.repeatRate !== 0) {
        Keyboard.timers[key] = setInterval(function() {
          triggerKeyEvent(J.Events.KEY_PRESS, e);
        }, Keyboard.repeatRate);
      }
    }
    return false;
  };

  // Bind document key up
  document.onkeyup = function(e) {
    var key = (e || window.event).keyCode;
    if (key in Keyboard.timers) {
      triggerKeyEvent(J.Events.KEY_UP, e);
      if (Keyboard.timers[key]) {
        clearInterval(Keyboard.timers[key]);
      }
      delete Keyboard.timers[key];
    }
  };

  Joy.Keyboard = Keyboard;
})(Joy);
