define(['libs/jquery', 'libs/processing', 'app/hero', 'app/world'], function($, Processing, Hero, World) {
  function App(canvas) {
    var self = this;

    new Processing(canvas, function(processing) {
      self.processing = processing;
      processing.setup = self.setup.bind(self);
      processing.draw = self.loop.bind(self);
    });
  }

  App.prototype = {
    setup: function() {
      this.processing.size(800, 600);
      this.processing.frameRate(30);
    },

    loop: function() {
      this.update();
      this.clear();
      this.draw();
    },

    clear: function() {
      this.processing.background(255, 255, 255);
    },

    update: function() {
    },

    draw: function() {
    }
  };

  return App;
});