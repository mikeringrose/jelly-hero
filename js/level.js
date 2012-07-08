jellyhero.Level = (function() {
    
    /**
     * Level contructor.
     * @param {Object} options 
     */
    function Level(options) {
        this.floorTile = new Image();
        this.context = options.context;

        this.width = 960;
        this.height = 640;
        this.bgPosX = 0;

        this.floorHeight = 32;

        //- initialize our background image
        this.floorTile.src = '/img/purple_tile.png';
    };

    Level.prototype = {

        /**
         * Update function.
         * @param  {Number} ellapsedMs amount of time in milliseconds since last call of update
         * @return {void}            
         */
        update: function(ellapsedMs) {
            var hero = this.hero,
                centerX = this.width / 2,
                heroPosX;

            if (this.hero) {
                heroPosX = hero.pos.e(1);

                if (heroPosX >= centerX) {
                    this.bgPosX = centerX - heroPosX;
                }
            }
        },

        /**
         * Draws our level.
         * @return {void} 
         */
        render: function() {
            var context = this.context,
                idx;

            //- clear out our old drawings
            context.clearRect(0, 0, this.width, this.height);

            //- draw our background
            for (idx = this.bgPosX; idx < this.width; idx += 32) {
                context.drawImage(this.floorTile, idx, this.height - 32);
            }
        },

        /**
         * Trasnlate world coordinates to screen coordinates.
         * @param {Vector} worldCoords vectors representing a point in world space
         * @return {Vector} in screen coordinates
         */
        toScreenCoords: function(worldCoords) {
            var x = worldCoords.e(1),
                y = worldCoords.e(2),
                centerX = this.width / 2;

            if (x >= centerX)
                x = centerX;

            return $V([ x, this.height - this.floorHeight - y ]);
        }

    };

    return Level;

}());