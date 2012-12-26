(function(J) {
  /**
   * Singleton keyboard finals.
   * @static
   * @readonly
   * @class Keyboard
   */
  var Keyboard = {
    /**
     * Enter keycode
     * @property ENTER
     * @type {Number}
     * @static
     * @final
     */
    ENTER:13,

    /**
     * BACKSPACE keycode
     * @property BACKSPACE
     * @type {Number}
     * @static
     * @final
     */
    BACKSPACE:8,

    /**
     * TAB keycode
     * @property TAB
     * @type {Number}
     * @static
     * @final
     */
    TAB:9,

    /**
     * SHIFT keycode
     * @property SHIFT
     * @type {Number}
     * @static
     * @final
     */
    SHIFT:16,

    /**
     * CTRL keycode
     * @property CTRL
     * @type {Number}
     * @static
     * @final
     */
    CTRL:17,

    /**
     * ALT keycode
     * @property ALT
     * @type {Number}
     * @static
     * @final
     */
    ALT:18,

    /**
     * PAUSE keycode
     * @property PAUSE
     * @type {Number}
     * @static
     * @final
     */
    PAUSE:19,

    /**
     * CAPSLOCK keycode
     * @property CAPSLOCK
     * @type {Number}
     * @static
     * @final
     */
    CAPSLOCK:20,

    /**
     * ESCAPE keycode
     * @property ESCAPE
     * @type {Number}
     * @static
     * @final
     */
    ESCAPE:27,

    /**
     * PAGEUP keycode
     * @property PAGEUP
     * @type {Number}
     * @static
     * @final
     */
    PAGEUP:33,

    /**
     * PAGEDOWN keycode
     * @property PAGEDOWN
     * @type {Number}
     * @static
     * @final
     */
    PAGEDOWN:34,

    /**
     * END keycode
     * @property END
     * @type {Number}
     * @static
     * @final
     */
    END:35,

    /**
     * HOME keycode
     * @property HOME
     * @type {Number}
     * @static
     * @final
     */
    HOME:36,

    /**
     * LEFT keycode
     * @property LEFT
     * @type {Number}
     * @static
     * @final
     */
    LEFT:37,

    /**
     * UP keycode
     * @property UP
     * @type {Number}
     * @static
     * @final
     */
    UP:38,

    /**
     * RIGHT keycode
     * @property RIGHT
     * @type {Number}
     * @static
     * @final
     */
    RIGHT:39,

    /**
     * DOWN keycode
     * @property DOWN
     * @type {Number}
     * @static
     * @final
     */
    DOWN:40,

    /**
     * INSERT keycode
     * @property INSERT
     * @type {Number}
     * @static
     * @final
     */
    INSERT:45,

    /**
     * DELETE keycode
     * @property DELETE
     * @type {Number}
     * @static
     * @final
     */
    DELETE:46,

    /**
     * KEY_0 keycode
     * @property KEY_0
     * @type {Number}
     * @static
     * @final
     */
    KEY_0:48,

    /**
     * KEY_1 keycode
     * @property KEY_1
     * @type {Number}
     * @static
     * @final
     */
    KEY_1:49,

    /**
     * KEY_2 keycode
     * @property KEY_2
     * @type {Number}
     * @static
     * @final
     */
    KEY_2:50,

    /**
     * KEY_3 keycode
     * @property KEY_3
     * @type {Number}
     * @static
     * @final
     */
    KEY_3:51,

    /**
     * KEY_4 keycode
     * @property KEY_4
     * @type {Number}
     * @static
     * @final
     */
    KEY_4:52,

    /**
     * KEY_5 keycode
     * @property KEY_5
     * @type {Number}
     * @static
     * @final
     */
    KEY_5:53,

    /**
     * KEY_6 keycode
     * @property KEY_6
     * @type {Number}
     * @static
     * @final
     */
    KEY_6:54,

    /**
     * KEY_7 keycode
     * @property KEY_7
     * @type {Number}
     * @static
     * @final
     */
    KEY_7:55,

    /**
     * KEY_8 keycode
     * @property KEY_8
     * @type {Number}
     * @static
     * @final
     */
    KEY_8:56,

    /**
     * KEY_9 keycode
     * @property KEY_9
     * @type {Number}
     * @static
     * @final
     */
    KEY_9:57,

    /**
     * KEY_A keycode
     * @property KEY_A
     * @type {Number}
     * @static
     * @final
     */
    KEY_A:65,

    /**
     * KEY_B keycode
     * @property KEY_B
     * @type {Number}
     * @static
     * @final
     */
    KEY_B:66,

    /**
     * KEY_C keycode
     * @property KEY_C
     * @type {Number}
     * @static
     * @final
     */
    KEY_C:67,

    /**
     * KEY_D keycode
     * @property KEY_D
     * @type {Number}
     * @static
     * @final
     */
    KEY_D:68,

    /**
     * KEY_E keycode
     * @property KEY_E
     * @type {Number}
     * @static
     * @final
     */
    KEY_E:69,

    /**
     * KEY_F keycode
     * @property KEY_F
     * @type {Number}
     * @static
     * @final
     */
    KEY_F:70,

    /**
     * KEY_G keycode
     * @property KEY_G
     * @type {Number}
     * @static
     * @final
     */
    KEY_G:71,

    /**
     * KEY_H keycode
     * @property KEY_H
     * @type {Number}
     * @static
     * @final
     */
    KEY_H:72,

    /**
     * KEY_I keycode
     * @property KEY_I
     * @type {Number}
     * @static
     * @final
     */
    KEY_I:73,

    /**
     * KEY_J keycode
     * @property KEY_J
     * @type {Number}
     * @static
     * @final
     */
    KEY_J:74,

    /**
     * KEY_K keycode
     * @property KEY_K
     * @type {Number}
     * @static
     * @final
     */
    KEY_K:75,

    /**
     * KEY_L keycode
     * @property KEY_L
     * @type {Number}
     * @static
     * @final
     */
    KEY_L:76,

    /**
     * KEY_M keycode
     * @property KEY_M
     * @type {Number}
     * @static
     * @final
     */
    KEY_M:77,

    /**
     * KEY_N keycode
     * @property KEY_N
     * @type {Number}
     * @static
     * @final
     */
    KEY_N:78,

    /**
     * KEY_O keycode
     * @property KEY_O
     * @type {Number}
     * @static
     * @final
     */
    KEY_O:79,

    /**
     * KEY_P keycode
     * @property KEY_P
     * @type {Number}
     * @static
     * @final
     */
    KEY_P:80,

    /**
     * KEY_Q keycode
     * @property KEY_Q
     * @type {Number}
     * @static
     * @final
     */
    KEY_Q:81,

    /**
     * KEY_R keycode
     * @property KEY_R
     * @type {Number}
     * @static
     * @final
     */
    KEY_R:82,

    /**
     * KEY_S keycode
     * @property KEY_S
     * @type {Number}
     * @static
     * @final
     */
    KEY_S:83,

    /**
     * KEY_T keycode
     * @property KEY_T
     * @type {Number}
     * @static
     * @final
     */
    KEY_T:84,

    /**
     * KEY_U keycode
     * @property KEY_U
     * @type {Number}
     * @static
     * @final
     */
    KEY_U:85,

    /**
     * KEY_V keycode
     * @property KEY_V
     * @type {Number}
     * @static
     * @final
     */
    KEY_V:86,

    /**
     * KEY_W keycode
     * @property KEY_W
     * @type {Number}
     * @static
     * @final
     */
    KEY_W:87,

    /**
     * KEY_X keycode
     * @property KEY_X
     * @type {Number}
     * @static
     * @final
     */
    KEY_X:88,

    /**
     * KEY_Y keycode
     * @property KEY_Y
     * @type {Number}
     * @static
     * @final
     */
    KEY_Y:89,

    /**
     * KEY_Z keycode
     * @property KEY_Z
     * @type {Number}
     * @static
     * @final
     */
    KEY_Z:90,

    /**
     * SELECT keycode
     * @property SELECT
     * @type {Number}
     * @static
     * @final
     */
    SELECT:93,

    /**
     * NUMPAD0 keycode
     * @property NUMPAD0
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD0:96,

    /**
     * NUMPAD1 keycode
     * @property NUMPAD1
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD1:97,

    /**
     * NUMPAD2 keycode
     * @property NUMPAD2
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD2:98,

    /**
     * NUMPAD3 keycode
     * @property NUMPAD3
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD3:99,

    /**
     * NUMPAD4 keycode
     * @property NUMPAD4
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD4:100,

    /**
     * NUMPAD5 keycode
     * @property NUMPAD5
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD5:101,

    /**
     * NUMPAD6 keycode
     * @property NUMPAD6
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD6:102,

    /**
     * NUMPAD7 keycode
     * @property NUMPAD7
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD7:103,

    /**
     * NUMPAD8 keycode
     * @property NUMPAD8
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD8:104,

    /**
     * NUMPAD9 keycode
     * @property NUMPAD9
     * @type {Number}
     * @static
     * @final
     */
    NUMPAD9:105,

    /**
     * MULTIPLY keycode
     * @property MULTIPLY
     * @type {Number}
     * @static
     * @final
     */
    MULTIPLY:106,

    /**
     * ADD keycode
     * @property ADD
     * @type {Number}
     * @static
     * @final
     */
    ADD:107,

    /**
     * SUBTRACT keycode
     * @property SUBTRACT
     * @type {Number}
     * @static
     * @final
     */
    SUBTRACT:109,

    /**
     * DECIMALPOINT keycode
     * @property DECIMALPOINT
     * @type {Number}
     * @static
     * @final
     */
    DECIMALPOINT:110,

    /**
     * DIVIDE keycode
     * @property DIVIDE
     * @type {Number}
     * @static
     * @final
     */
    DIVIDE:111,

    /**
     * F1 keycode
     * @property F1
     * @type {Number}
     * @static
     * @final
     */
    F1:112,

    /**
     * F2 keycode
     * @property F2
     * @type {Number}
     * @static
     * @final
     */
    F2:113,

    /**
     * F3 keycode
     * @property F3
     * @type {Number}
     * @static
     * @final
     */
    F3:114,

    /**
     * F4 keycode
     * @property F4
     * @type {Number}
     * @static
     * @final
     */
    F4:115,

    /**
     * F5 keycode
     * @property F5
     * @type {Number}
     * @static
     * @final
     */
    F5:116,

    /**
     * F6 keycode
     * @property F6
     * @type {Number}
     * @static
     * @final
     */
    F6:117,

    /**
     * F7 keycode
     * @property F7
     * @type {Number}
     * @static
     * @final
     */
    F7:118,

    /**
     * F8 keycode
     * @property F8
     * @type {Number}
     * @static
     * @final
     */
    F8:119,

    /**
     * F9 keycode
     * @property F9
     * @type {Number}
     * @static
     * @final
     */
    F9:120,

    /**
     * F10 keycode
     * @property F10
     * @type {Number}
     * @static
     * @final
     */
    F10:121,

    /**
     * F11 keycode
     * @property F11
     * @type {Number}
     * @static
     * @final
     */
    F11:122,

    /**
     * F12 keycode
     * @property F12
     * @type {Number}
     * @static
     * @final
     */
    F12:123,

    /**
     * NUMLOCK keycode
     * @property NUMLOCK
     * @type {Number}
     * @static
     * @final
     */
    NUMLOCK:144,

    /**
     * SCROLLLOCK keycode
     * @property SCROLLLOCK
     * @type {Number}
     * @static
     * @final
     */
    SCROLLLOCK:145,

    /**
     * SEMICOLON keycode
     * @property SEMICOLON
     * @type {Number}
     * @static
     * @final
     */
    SEMICOLON:186,

    /**
     * EQUALSIGN keycode
     * @property EQUALSIGN
     * @type {Number}
     * @static
     * @final
     */
    EQUALSIGN:187,

    /**
     * COMMA keycode
     * @property COMMA
     * @type {Number}
     * @static
     * @final
     */
    COMMA:188,

    /**
     * DASH keycode
     * @property DASH
     * @type {Number}
     * @static
     * @final
     */
    DASH:189,

    /**
     * PERIOD keycode
     * @property PERIOD
     * @type {Number}
     * @static
     * @final
     */
    PERIOD:190,

    /**
     * FORWARDSLASH keycode
     * @property FORWARDSLASH
     * @type {Number}
     * @static
     * @final
     */
    FORWARDSLASH:191,

    /**
     * GRAVEACCENT keycode
     * @property GRAVEACCENT
     * @type {Number}
     * @static
     * @final
     */
    GRAVEACCENT:192,

    /**
     * OPENBRACKET keycode
     * @property OPENBRACKET
     * @type {Number}
     * @static
     * @final
     */
    OPENBRACKET:219,

    /**
     * BACKSLASH keycode
     * @property BACKSLASH
     * @type {Number}
     * @static
     * @final
     */
    BACKSLASH:220,

    /**
     * CLOSEBRAKET keycode
     * @property CLOSEBRAKET
     * @type {Number}
     * @static
     * @final
     */
    CLOSEBRAKET:221,

    /**
     * SINGLEQUOTE keycode
     * @property SINGLEQUOTE
     * @type {Number}
     * @static
     * @final
     */
    SINGLEQUOTE:222
  };

  J.Events.KEY_DOWN = 'onkeydown';
  J.Events.KEY_UP = 'onkeyup';
  J.Events.KEY_PRESS = 'key';

  Keyboard.handlers = {};
  Keyboard.timers = {};

  function triggerKeyEvent(type, evt) {
    var i, length, handlers = Keyboard.handlers[type];

    for (var i=0, length=handlers.length; i<length; ++i) {
      handlers[i].handler.apply(handlers[i].target, [evt]);
    }
  };

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

  var repeat = 50;

  // Bind document key down
  document.onkeydown = function(e) {
    var key = (e || window.event).keyCode;
    if (Keyboard.timers[key] == null) {
      triggerKeyEvent(J.Events.KEY_DOWN, e);
      triggerKeyEvent(J.Events.KEY_PRESS, e);

      if (repeat !== 0) {
        Keyboard.timers[key] = setInterval(function() {
          triggerKeyEvent(J.Events.KEY_PRESS, e);
        }, repeat);
      }
    }
    return false;
  };

  // Bind document key up
  document.onkeyup = function(e) {
    var key = (e || window.event).keyCode;
    if (key in Keyboard.timers) {
      triggerKeyEvent(J.Events.KEY_UP, e);
      if (Keyboard.timers[key] != null) {
        clearInterval(Keyboard.timers[key]);
      }
      delete Keyboard.timers[key];
    }
  };

  Joy.Keyboard = Keyboard;
})(Joy);
