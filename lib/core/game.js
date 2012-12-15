(function(J) {
  var Game = function(options) {
    this.render = new J.Render();

    if (options.canvas) {
      this.setCanvas(options.canvas);
    }

    if (options.markup) {
    }

    return this;
  };

  Game.prototype.setCanvas = function(canvas) {
    this.render.setCanvas(canvas);
  };

  Game.prototype.useMarkup = function() {
    var markup = new J.Markup();
    markup.setup(this);
  };

  J.Game = Game;
})(Joy);
