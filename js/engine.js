jellyhero.Engine = (function() {

    function Engine(items) {
        this.items = items || [];

        _.bindAll(this);
    }

    Engine.prototype = {

        run: function() {
            this.lastTimeMs = new Date().getTime();
            this.loop();
        },

        loop: function() {
            var currentTimeMs = new Date().getTime(),
                ellapsedTimeMs = currentTimeMs - this.lastTimeMs,
                idx;

            //- run our updates
            for (idx = 0; idx < this.items.length; idx++) {
                this.items[idx].update(ellapsedTimeMs);
            }

            //- tell'em to render
            for (idx = 0; idx < this.items.length; idx++) {
                this.items[idx].render();
            }

            this.timeoutId = setTimeout(this.loop, 1/30);
        }

    };

    return Engine;
    
})();