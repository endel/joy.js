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
      IMG: function (element) {
        console.log("IMG dataset: ", this.evaluateDataset(element));
        return new J.Sprite(this.evaluateDataset(element));
      },
      LABEL: function (element) {
        var dataset = this.evaluateDataset(element);
        dataset.text = element.innerHTML;
        return new J.Text(dataset);
      },
      AUDIO: function (element) {
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
        var element = this.parsers[elements[i].tagName].apply(this, [elements[i]]);
        console.log(element);
        children.push(element);
      }
    }

    // Create scene on engine and append all children parsed
    this.engine.createScene(function(scene) {
      for (i=0,length=children.length; i<length; ++i) {
        scene.addChild(children[i]);
      }
    });
  };

  Markup.prototype.evaluateDataset = function(element) {
    var value, matches, attr, attributeName,
        attributes = element.attributes,
        width = this.canvas.width,
        height = this.canvas.height,
        obj = {};

    for (var key in attributes) {
      attr = attributes[key];

      // Skip "length" attribute
      if (typeof(attr)!=="object") {
        continue;
      }

      value = attr.value;
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
