var BouncyDancer = function(top, left){
  Dancer.call(this, top, left);
  this.$node.addClass('yellow');
  this.$node.addClass('movers');
  this.direction = Math.random()*2*Math.PI;

  this.distance = 6;
  this.horizontal = this.distance * Math.cos(this.direction);
  this.vertical = this.distance * Math.sin(this.direction);

  var scheduleMove = this.move.bind(this);
  this.scheduleID = setInterval(function() {
    scheduleMove();
  }, 15);
  this.moving = true;
};

BouncyDancer.prototype = Object.create(Dancer.prototype);
BouncyDancer.prototype.constructor = BouncyDancer;

BouncyDancer.prototype.randDir = function() {
  this.direction = Math.random()*2*Math.PI;
  this.horizontal = this.distance * Math.cos(this.direction);
  this.vertical = this.distance * Math.sin(this.direction);
};

BouncyDancer.prototype.move = function() {
  var newTop = this.top + this.vertical;
  var newLeft = this.left + this.horizontal;
  if(newTop + 20 > height || newTop < 32) {
    this.vertical *= -1;
    this.direction = Math.atan(this.vertical/this.horizontal);
  }
  if(newLeft + 20 > width || newLeft < 0) {
    this.horizontal *= -1;
    this.direction = Math.atan(this.vertical/this.horizontal);
  }

  var peg  = pegs.free(this.left + this.horizontal + 10, this.top + this.vertical + 10, 10);
  if(peg !== true) {
    this.reflect(peg);
  }
  this.top += this.vertical;
  this.left += this.horizontal;
  this.setPosition(this.top, this.left);
};

BouncyDancer.prototype.stopMoving = function() {
  clearInterval(this.scheduleID);
  this.moving = false;
};

BouncyDancer.prototype.startMoving = function() {
  var dancer = this;
  this.scheduleID = setInterval(function() {dancer.move();}, 10);
  this.moving = true;
};

BouncyDancer.prototype.setPosition = function(top, left){
  this.top = top;
  this.left = left;
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

BouncyDancer.prototype.reflect = function(peg) {
  var pegX = peg.x;
  var pegY = peg.y;
  var nScalar = PegArr.prototype.distance(pegX, pegY, this.left, this.top);
  var nUnitX = (pegX - this.left)/nScalar;
  var nUnitY = (pegY - this.top)/nScalar;
  var a = -this.horizontal*nUnitX - this.vertical*nUnitY;
  var aVecX = a*nUnitX;
  var aVecY = a*nUnitY;
  var bVecX = -this.horizontal - aVecX;
  var bVecY = -this.vertical - aVecY;
  var newDX = aVecX - bVecX;
  var newDY = aVecY - bVecY;
  this.horizontal = newDX;
  this.vertical = newDY;
  this.direction = Math.atan(this.vertical/this.horizontal);
};