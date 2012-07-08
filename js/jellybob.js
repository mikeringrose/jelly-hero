jellyhero.JellyBob = (function() {

    function JellyBob(options) {
        var self = this;

        this.context = options.context;
        this.level = options.level;

        this.pos = $V([0, 0]);
        this.vel = $V([0, 0]);
        this.state = ready;
        this.image = new Image();
        this.image.src = '/img/jellybob.png';

        _.bindAll(this);

        $(window).keyup(this.handleKeyUp);
        $(window).keydown(this.handleKeyDown);

        $(document).on('touchstart', function() { self.state = walking; });
        $(document).on('touchend', function() { self.state = ready; });
    };

    JellyBob.prototype = {

        /**
         * Update method.
         * @param {Number} ellapsedMs amount of time in millisconds since last update.
         * @return {void} 
         */
        update: function(ellapsedMs) {
            this.pos = this.state(this).pos.add(this.vel);
        },

        /**
         * Draws our hero on the screen.
         * @return {void} 
         */
        render: function() {
            var level = this.level,
                context = this.context,
                screenCoords = level.toScreenCoords(this.pos);

            context.save();
            
            /*
            context.beginPath();
            context.rect(screenCoords.e(1), screenCoords.e(2) - 48, 48, 48);
            context.closePath();
            
            context.clip();
             */
            context.drawImage(this.image, screenCoords.e(1), screenCoords.e(2) - 64);  
            
            context.restore();
        },

        /**
         * Handles key up events. Looks at the key and toggles it off.
         * @param  {Object} evt jQuery event object
         * @return {void}     
         */
        handleKeyUp: function(evt) {
            var which = evt.which;

            switch (which) {
                case 65:
                case 70:
                    this.state = ready;
                    break;
            }
        },

        /**
         * Toggles on the current state based on the current key.
         * @param  {Object} evt jQuery event object
         * @return {void}     
         */
        handleKeyDown: function(evt) {
            var which = evt.which;

            switch (which) {
                case 65:
                    this.state = walking;
                    break;
                case 70:
                    this.state = walking;
                    break;
            }
        }

    };

    /**
     * JellyBob's ready state, he's just hanging around.
     * @param   {JellyBob}  jellyBob        our hero
     * @param   {Number}    ellapsedTimeMs  milliseconds that have ellapsed since last update
     * @return  {JellyBob}                  returns our hero
     */
    function ready(jellyBob) {
        jellyBob.vel = $V([0, 0]);
        return jellyBob;
    }

    function walking(jellyBob) {
        jellyBob.vel = $V([1, 0]);
        return jellyBob;
    }

    function running(jellyBob) {

    }

    return JellyBob;

}());