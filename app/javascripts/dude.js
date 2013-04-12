define(function() {
  var MAX_YVELOCITY = 50;

  function Dude(options) {
    this.x = 0;
    this.y = 0;

    this.xVelocity = 0;
    this.yVelocity = 0;

    this.width = 64;
    this.height = 64;

    this.xOffset = 0;
    this.yOffset = 0;

    this.jumping = false;
  }

  Dude.prototype = {
    level: null,

    update: function(ellapsedMs) {
      this._updateYVelocity();

      this.yVelocity += this.level.gravity;

      this.x += this.xVelocity;
      this.y += this.yVelocity;

      this._checkXCollision();
      this._checkYCollision();
    },

    jump: function() {
      this.jumping = true;
    },

    forward: function() {
      if (this.xVelocity < 0) {
        this.xVelocity = 0;
      }

      this.facing = "forward";
      this.xVelocity += 1;
    },

    backward: function() {
      if (this.facing > 0) {
        this.xVelocity = 0;
      }

      this.facing = "backward";
      this.xVelocity -= 1;
    },

    _checkXCollision: function() {
      var level = this.level;

      if (level.tileAdjIsBlocking(this, "right")) {
        this.xVelocity = 0;

        do {
          this.x -= 1;
        } while (level.tileAdjIsBlocking(this, "right"));
      }
    },

    _checkYCollision: function() {
      var level = this.level;

      if (level.tileAdjIsBlocking(this, "below")) {
        this.yVelocity = 0;

        do {
          this.y -= 1;
        } while (level.tileAdjIsBlocking(this, "below"));        
      }
    },

    _updateXVelocity: function() {
      if (this.moving) {
        this.xVelocity += 1;
      }
      else {
        this.xVelocity -= 1;
      }
    },

    _updateYVelocity: function() {
      if (this.jumping) {
        this._doJump();
      }      
    },

    _doJump: function() {
      var level = this.level;

      if (this.yVelocity === 0 && level.tileAdjIsBlocking(this, "below")) {
        this.yVelocity -= 1;
      }
      else if (this.yVelocity < 0 && this.yVelocity > MAX_YVELOCITY) {
        this.yVelocity -= 1;
      }
    }
  };

  return Dude;
});