define(function() {
  function Level(options) {
    this.tileMap = options.tileMap;
    this.tileWidth = options.tileWidth;
    this.tileHeight = options.tileHeight;
    this.tileImages = options.tileImages;
    this.gravity = options.gravity || 1;
    this.tileRows = this.tileMap.length;
    this.tileCols = this.tileMap[0].length;
    this.processing = options.processing;
  }

  Level.prototype = {
    tileIsBlocking: function(tile) {
      return !!tile;
    },   

    tileForPoint: function(x, y) {
      var tileCoords = this._tileCoordForPoint(x, y);
      return this._tileFor(tileCoords[0], tileCoords[1]);
    },

    tileAdj: function(dude, dir) {
      var x = dude.x, 
        y = dude.y;

      if (dir == "below left") {
        y += dude.height;
      }
      else if (dir == "above left") {
        y -= 1;  
      }
      else if (dir == "left") {
        y -= 1;
      }
      else if (dir == "right") {
        x += dude.width + 1;
      }

      return this.tileForPoint(x, y);
    },

    tileAdjIsBlocking: function(dude, dir) {
      var blocking;

      if (dir == "below" || dir == "above") {
        blocking = (this.tileIsBlocking(this.tileAdj(dude, dir + " left")) || this.tileIsBlocking(this.tileAdj(dude, dir + " right")));
      }
      else {
        blocking = this.tileIsBlocking(this.tileAdj(dude, dir));
      }

      return blocking;
    },

    draw: function() {
      this._drawMap();
    },

    _tileFor: function(tX, tY) {
      var row = this.tileMap[tY];
      return (row && tX >= 0 && tX < row.length) ? row[tX] : 0;
    },     

    _tileCoordForPoint: function(x, y) {
      return [Math.floor(x/this.tileWidth), Math.floor(y/this.tileHeight)];
    },

    _drawTile: function(tX, tY) {
      var tileImage = this.tileImages[this._tileFor(tX, tY)];
      
      if (tileImage) {
        this.processing.image(tileImage, this.tileWidth * tX, this.tileHeight * tY);
      }      
    },

    _drawMap: function() {
      var tX, tY;

      for (tY = this.tileRows - 1; tY >= 0; tY--) {
        for (tX = 0; tX < this.tileCols; tX++) {
          this._drawTile(tX, tY);
        }
      }      
    }
  };

  return Level;
});
