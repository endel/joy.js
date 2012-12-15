(function(J){
  var Markup = function() {};

  Markup.prototype.analyse = function(game) {
    console.log(game.render.canvas);
  };

  J.Markup = Markup;
})(Joy);
