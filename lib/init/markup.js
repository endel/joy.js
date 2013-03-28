/**
 * TODO:
 *
 * module Joy
 */

(function(J){
  /**
   * Analyses HTML `canvas` tag contents, and add those childs
   * to Joy contexting pipeline.
   *
   * TODO: This feature is extremely experimental.
   *
   * class Markup
   * constructor
   */
  var Markup = function(engine) {
    this.engine = engine;
    this.canvas = engine.context.canvas;

    /**
     * Hold element parsers by tag name.
     * By default, it handles IMG, LABEL, AUDIO
     *
     * @property parsers
     * @type {Object}
     */
    this.parsers = {
      IMG: function (el, dataset) {
        return new J.Sprite(dataset);
      },

      LABEL: function (el, dataset) {
        dataset.text = el.innerHTML;
        return new J.Text(dataset);
      },

      DIV: function (el, dataset) {
        var displayObject = new J.DisplayObjectContainer(dataset);
        var children = el.querySelector('*');
        for (var i = 0, l = children.length; i < l; i ++) {
          displayObject.addChild( this.parsers[ children[i].tagName ].apply(this, [children[i], Markup.evaluateDataset(children[i])]) );
        }
        return displayObject;
      },

      AUDIO: function (el, dataset) {
        var audio = new J.Sound({});
      }
    };

  };

  Markup.prototype.parse = function(section) {
    var sections = this.canvas.querySelectorAll('section');

    if (sections.length === 0) {
      sections = [this.canvas];
    }

    for (var i=0;i<sections.length;i++) {
      this.createScene(sections[i]);
    }
  };

  Markup.prototype.createScene = function(section) {
    var i, length,
        children = [];

    var elements = section.querySelectorAll('*');
    for (i=0, length=elements.length;i<length; ++i) {
      if (this.parsers[elements[i].tagName]) {
        var el = this.parsers[elements[i].tagName].apply(this, [elements[i], Markup.evaluateDataset(elements[i])]);
        children.push(el);
      }
    }

    // Create scene on engine and append all children parsed
    var dataset = Markup.evaluateDataset(section);
    this.engine.createScene(function(scene) {
      // Expand dataset to call methods / assign properties
      for (var attr in dataset) {
        console.log(attr, dataset[attr]);
        if (typeof(scene[attr])==="function") {
          scene[attr](dataset[attr]);
        } else {
          scene[attr] = dataset[attr];
        }
      }

      for (i=0,length=children.length; i<length; ++i) {
        scene.addChild(children[i]);
      }
    });
  };

  Markup.evaluateDataset = function(el) {
    var value, matches, attr, attributeName,
        attributes = el.attributes,
        //width = this.canvas.width,
        //height = this.canvas.height,
        obj = {};

    for (var key in attributes) {
      attr = attributes[key];

      // Skip "length" attribute
      if (typeof(attr)!=="object") {
        continue;
      }

      value = (attr.value === '') ? true : attr.value;
      attributeName = attr.name;

      if (attributeName.indexOf('data-') === 0) {
        attributeName = attributeName.substr(5, attributeName.length);
      }

      matches = attr.value.match(/\{\{([^\}]*)\}\}/);
      if (matches) {
        // Replace expression by the evaluation of it.
        value = value.replace(value, eval(matches[1]));
      }

      obj[attributeName] = value;
    }

    return obj;
  };

  J.Markup = Markup;
})(Joy);
