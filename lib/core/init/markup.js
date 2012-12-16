/**
 * Analyses HTML tags inside <canvas> tag, and add those childs
 * to Joy contexting pipeline.
 *
 * Dependency: Sizzle
 * @class Markup
 */
(function(J){
  // Use Sizzle as CSS Selector Engine.
  var $ = (typeof(Sizzle) !== "undefined") ? Sizzle : null;

  var Markup = function() {};

  Markup.prototype.analyse = function(context) {
    that = this;

    // Sprite
    $('img', context.canvas).forEach(function(img) {
      var dataset = that.evaluateDataset(img.dataset, context.context);
      context.addChild(new Joy.Sprite({
        x: img.dataset.x,
        y: img.dataset.y,
        asset: img
      }));
    });

    // Text
    $('label', context.canvas).forEach(function(label) {
      var dataset = that.evaluateDataset(label.dataset, context.context);
      dataset.text = label.innerHTML;
      context.addChild(new Joy.Text(dataset));
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
