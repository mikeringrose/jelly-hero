define(['libs/underscore', 'app/dude'], function(_, Dude) {
  function Hero(processing, options) {
    this.processing = processing;
    _.extend(this, new Dude(options));    
  }

  Hero.prototype = {
    draw: function() {
      this.processing.stroke(128);
      this.processing.rect(this.x, this.y, this.width, this.height);
    }
  };

  return Hero;
});