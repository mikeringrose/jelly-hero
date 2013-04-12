define(['app/world'], function(World) {
  describe("World", function() {
    var world = new World();

    it("should have an array of levels", function() {
      expect(world.levels).toEqual(jasmine.any(Array));
    });
  });
});
