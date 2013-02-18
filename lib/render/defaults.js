(function(J) {
  J.Engine.defaultSceneLoader = function (scene) {
    // Joy.js logo, used on default loader
    var joyLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABkCAMAAADjVt21AAADAFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJBwYjGxnlTCblTCblTCblTSflTSblTijlTijlTyjlTynlUSrlUSvmUy7lUy3lVS/mVzHmWDLnWjbmXDbnYD3oYT3oYTrrYjTvYyzqYzrtYzCCZF3oZELoZUPoZELqbUzqdFXreFrre13sfF/sgGXsg2fthmztiW+zjILtjHPujnXuknrvln/vmYLwnIfxoIvxo47xpZHyqJXYqZ3yqpfyrZvzr57zs6L0tqb0uqvuvK7yv7L2w7b0w7b2xbn2xrr2x7vs7/Dt8PHw8vL19vb7+/v+/v7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/fz//v7+/v7s8vTs8/Xs8/Xs8vTs8fP47uvs7e3s7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozz497y3NTx187w0cfxy77xwK/xtJ/vq5Xuo4rsnobsl33sk3ftj3DsiWnuhF/sfFbsc0vrbUTyaC3yaC7yaC3yaC7pZ0DyZyvyZirxZizzZSjxZCjxZCjxZCjxZCjyZSnyZSjxZCryZSjxZCjxZCjxZCjxZCjzZSjzZSjzZSjxZSnwYinwYSfwYSjxYCPwYCTwYCbxXyDxXyLxXR3xXR7xXh/vXCDxXB3uWyLsWibrWSbrWCfqVyfpViboUyToUCLlTiflTiblTiblTiblTiblTSblTSblTSblTSblTSblTSblTSblTSblTSblTSblTSblTSblTCbkTCblTCblTCblTCXlTCXlTCTlSyTlSyPmSx/lSiPlSiLlSSLkSSHlSR7kSCDkSCDkRx/kRh7kRh3lRh3kRh7kRRzlRRzkRBzlRBvlRBtkxwbdAAAAeXRSTlMAAAAAAAAAAAAAAAECX19fX2Bk/mL+/Px3+vtx+pD9qoT97Pnh8ga/ydKYpaShnpaQiIAHeHNpYVpTS0Q+NgcyLCYiHRoHBxQHDwgM/vrR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";

    var percentageTween, logo, text,
        data = {percentage: 0},
        engine = this;

    scene.background("#000");

    text = new Joy.Text({
      x: engine.width / 2,
      y: engine.height / 2,
      text: "0%",
      align: "center",
      font: "30pt Courier New, monospace",
      color: "#fff",
      alpha: 0,
      baseline: Joy.Text.BASELINE.MIDDLE

    }).bind(Joy.Events.UPDATE, function() {
      var that = this;

      if (data.percentage !== scene.loader.percentage) {
        if (percentageTween) {percentageTween.stop();}
        data.percentage = scene.loader.percentage;

        percentageTween = Joy.Tween({
          percentage: parseInt(that.text, 10)
        }, 1000).easing(Joy.TweenManager.Easing.Quadratic.Out).to({
          percentage: scene.loader.percentage
        }).onUpdate(function() {
          that.text = parseInt(this.percentage, 10) + "%";
        }).start();
      }
    });

    logo = new Joy.Sprite(joyLogo).bind('load', function () {
      this.alpha = 0;
      this.position.x = engine.width / 2;
      this.position.y = engine.height / 2;
      this.pivot.x += this.width / 2;
      this.pivot.y += this.height / 2;

      Joy.Tween(this.position).
        to({x: this.position.x - 50}).
        easing(Joy.TweenManager.Easing.Quadratic.Out).
        start();

      Joy.Tween(this, 1000).
        to({alpha: 1}).
        easing(Joy.TweenManager.Easing.Quadratic.Out).
        start();

      Joy.Tween(text, 1000).
        to({alpha: 1}).
        easing(Joy.TweenManager.Easing.Quadratic.Out).
        start();

      Joy.Tween(text.position, 3000).
        to({x: text.position.x + 50}).
        easing(Joy.TweenManager.Easing.Quadratic.Out).
        start();
    });

    scene.addChild(logo);
    scene.addChild(text);
  };
})(Joy);
