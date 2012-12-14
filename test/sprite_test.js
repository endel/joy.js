var window = {}, Joy = require('../dist/joy.js');

this.sprite = {

  'initialize with default values' : function() {
    var sprite = new Joy.Sprite();
    eq(sprite.asset.url, null);
  }

}
