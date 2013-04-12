define(['app/dude', 'app/level'], function(Dude, Level) {
  describe("Dude", function() {
    var dude, level, tileMap, tileWidth, tileHeight;;

    beforeEach(function() {
      dude = new Dude();
      tileMap = [ [0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0],
                  [1, 1, 1, 1, 1, 1] ];
      tileWidth = 64;
      tileHeight = 64;
      level = new Level({ 
        tileMap: tileMap, 
        tileWidth: tileWidth, 
        tileHeight: tileHeight
      });
      dude.level = level;      
    });

    it("constructor", function() { 
      expect(dude.x).toBe(0); 
      expect(dude.y).toBe(0);
      expect(dude.xVelocity).toBe(0);
      expect(dude.yVelocity).toBe(0);
    });

    describe(".update", function() {
      it("should be affected by gravity", function() {
        var yVelocity = 0;
        dude.yVelocity = yVelocity;
        dude.update();
        expect(dude.y).toBeGreaterThan(yVelocity)
      });
    });

    describe(".jump", function() {
      beforeEach(function() {
        dude.y = (tileMap.length - 1) * tileHeight;        
      });

      it("should set jumping to true", function() {
        dude.jump();
        expect(dude.jumping).toBe(true);
      });
    });

    describe(".forward", function() {
      beforeEach(function() {
        dude.forward();
      });

      it("should be facing forward", function() {
        expect(dude.facing).toBe("forward");
      });

      it("should move the dude forward", function() {
        dude.update();
        expect(dude.x).toBeGreaterThan(0);
        expect(dude.xVelocity).toBeGreaterThan(0);
      });
    });

    describe(".backward", function() {
      beforeEach(function() {
        dude.backward();
      });

      it("should be facing backward", function() {
        expect(dude.facing).toBe("backward");
      });

      it("should move the dude backward", function() {
        dude.update();
        expect(dude.x).toBeLessThan(0);
        expect(dude.xVelocity).toBeLessThan(0);
      });
    });
  });
});