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
    var i, length, dataset;

    // Sprite
    var imgs = $('img', context.canvas);
    length = imgs.length;
    for (i=0; i<length; ++i) {
      dataset = this.evaluateDataset.call(imgs[i], imgs[i].dataset, context.context);
      context.addChild(new Joy.Sprite({
        x: imgs[i].dataset.x,
        y: imgs[i].dataset.y,
        asset: imgs[i]
      }));
    }

    // Text
    var labels = $('label', context.canvas);
    length = labels.length;
    for (i=0; i<length; ++i) {
      dataset = this.evaluateDataset(labels[i].dataset, context.context);
      dataset.text = labels[i].innerHTML;
      context.addChild(new Joy.Text(dataset));
    }
  };

  Markup.prototype.evaluateDataset = function(dataset, context) {
    var attr, matches,
        width = context.canvas.width,
        height = context.canvas.height;

    for (var key in dataset) {
      console.log(key, dataset, dataset[key]);
      attr = dataset[key];
      console.log("Match? ", attr);
      matches = attr.match(/\{\{([^\}]*)\}\}/);
      if (matches) {
        // Replace expression by the evaluation of it.
        console.log("Matched!", matches, "width: ", width, "height: ", height);
        console.log("Attr: ", attr, "Evaluate: ", matches[1]);
        console.log("Replace by: ", eval(matches[1]));
        dataset[key] = attr.replace(attr, eval(matches[1]));
      }
    }
    return dataset;
  };

  J.Markup = Markup;
})(Joy);
