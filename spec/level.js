define(['app/level'], function(Level) {
  describe("Level", function() {
    var level;

    describe(".tileIsBlocking", function() {
      level = new Level({tileMap: [[0, 0, 0]], tileWidth: 0, tileHeight: 0});

      it("should not be blocking", function() {
        expect(level.tileIsBlocking(0)).toBe(false);
      });

      it("should not be blocking when null", function() {
        expect(level.tileIsBlocking(null)).toBe(false);
      });      

      it("should be blocking", function() {
        expect(level.tileIsBlocking(1)).toBe(true);
      });      
    });

    describe(".tileForPoint", function() {
      var tileMap = [ [7, 6, 5, 4], 
                      [3, 2, 1, 0] ],
        tileWidth = 64,
        tileHeight = 64;

      level = new Level({
        tileMap: tileMap,
        tileWidth: tileWidth,
        tileHeight: tileHeight
      });

      it("should return the first row, first tile when point at origin", function() {
        expect(level.tileForPoint(0, 0)).toBe(7);
      });

      it("should return the last row, first tile when at the x = 0 and y = height of level", function() {
        expect(level.tileForPoint(0, tileHeight)).toBe(3);
      }); 

      it("should return the last row, last tile when at max x and y minus 1", function() {
        expect(level.tileForPoint(tileWidth * tileMap[0].length - 1, tileHeight * tileMap.length - 1)).toBe(0);
      });

      it("should return 0 when before the edge of the level", function() {
        expect(level.tileForPoint(-1, 0)).toBe(0);
      });

      it("should return 0 when past the edge of the level", function() {
        expect(level.tileForPoint(tileWidth * tileMap[0].length, tileHeight * tileMap.length)).toBe(0);
      });
    });

    describe(".tileAdj", function() {
      var tileMap, tileWidth, tileHeight, dude;

      beforeEach(function() {
        tileMap = [ [7, 6, 5, 4], 
                    [3, 2, 1, 0] ];
        tileWidth = 64;
        tileHeight = 64;

        level = new Level({
          tileMap: tileMap,
          tileWidth: tileWidth,
          tileHeight: tileHeight
        });

        dude = {
          x: 0,
          y: 0,
          width: 64,
          height: 64
        };
      });

      it("should be the first tile of the ground floor below left", function() {
        expect(level.tileAdj(dude, "below left")).toBe(3);
      });

      it("should be the second tile of the ground floor below left", function() {
        dude.x = tileWidth;
        expect(level.tileAdj(dude, "below left")).toBe(2);
      });

      it("should be the first tile of the top row", function() {
        dude.y = tileHeight;
        expect(level.tileAdj(dude, "above left")).toBe(7);
      });

      it("should be the second tile of the top row", function() {
        dude.x = tileWidth;
        dude.y = tileHeight;
        expect(level.tileAdj(dude, "above left")).toBe(6);
      }); 

      it("should have no tile to the left", function() {
        expect(level.tileAdj(dude, "left")).toBe(0);
      }); 

      it("should be the first tile of the top row to the left", function() {
        dude.y = tileHeight;
        expect(level.tileAdj(dude, "left")).toBe(7);
      });

      it("should have no tile to the right", function() {
        dude.x = (tileMap[0].length - 1) * tileWidth;
        dude.y = tileHeight;
        expect(level.tileAdj(dude, "right")).toBe(0);
      }); 

      it("should be the first tile of the top row to the left", function() {
        dude.y = tileHeight;
        expect(level.tileAdj(dude, "right")).toBe(2);
      });      
    });

    describe(".tileAdjIsBlocking", function() {
      var tileMap, tileWidth, tileHeight, dude;

      beforeEach(function() {
        tileMap = [ [7, 6, 5, 4], 
                    [3, 2, 1, 0] ];
        tileWidth = 64;
        tileHeight = 64;

        level = new Level({
          tileMap: tileMap,
          tileWidth: tileWidth,
          tileHeight: tileHeight
        });

        dude = {
          x: 0,
          y: 0,
          width: 64,
          height: 64
        };
      });

      it("should be blocking", function() {
        spyOn(level, "tileAdj").andReturn(1);
        expect(level.tileAdjIsBlocking(dude, "left")).toBe(true);
      });

      it("should not be blocking", function() {
        spyOn(level, "tileAdj").andReturn(0);
        expect(level.tileAdjIsBlocking(dude, "left")).toBe(false);
      });
    });
  });
});