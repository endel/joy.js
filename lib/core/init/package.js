/**
 * Reads a stand-alone package.
 * @class Package
 */
(function(J){
  // Use Sizzle as CSS Selector Engine.
  var $ = Sizzle;

  var Markup = function() {};

  Markup.prototype.analyse = function(render) {
    that = this;

    // Sprite
    $('img', render.canvas).forEach(function(img) {
      var dataset = that.evaluateDataset(img.dataset, render.context);
      render.addChild(new Joy.Sprite({
        x: img.dataset.x,
        y: img.dataset.y,
        asset: img
      }));
    });

    // Text
    $('label', render.canvas).forEach(function(label) {
      var dataset = that.evaluateDataset(label.dataset, render.context);
      dataset.text = label.innerHTML;
      render.addChild(new Joy.Text(dataset));
    });
  };

  Markup.prototype.evaluateDataset = function(dataset, context) {
    var attr, matches,
        width = context.width,
        height = context.height;

    for (var key in dataset) {
      attr = dataset[key];
      matches = attr.match(/\{\{([^\}]*)\}\}/)[1];

      // Replace expression by the evaluation of it.
      attr.replace(attr, eval(matches[1]));
    }
  };

  J.Markup = Markup;
})(Joy);

