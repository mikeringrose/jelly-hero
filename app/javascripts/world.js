define(["libs/jquery", "app/level"], function($, Level) {
  function World(name, processing, hero) {
    var self = this;
    this.processing = processing;
    $.getJSON("/app/worlds/" + name + ".json")
    .success(function(data) {
      self._initialize(data); 
    });
  };

  World.prototype = {
    ready: false,

    update: function() {
    },

    draw: function() {
      this.levels[0].draw();
    },

    _initialize: function(data) {
      var levels = [];

      for (var i = 0; i < data.length; i++) {
        data[i].processing = this.processing;

        for (var j = 1; j < data[i].tileImages.length; j++) {
          data[i].tileImages[j] = this.processing.loadImage(data[i].tileImages[j]);
        }

        levels.push(new Level(data[i]));    
      } 

      this.levels = levels;
      this.ready = true;
    }
  };

  return World;
});