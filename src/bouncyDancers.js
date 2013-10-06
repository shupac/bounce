var moveInt = 5;

var BouncyDancer = function(top, left){
  Dancer.call(this, top, left);
  this.$node.addClass('yellow');
  this.$node.addClass('movers');
  this.distance = 2;

  this.randDir();

  var scheduleMove = this.move.bind(this);
  this.scheduleID = setInterval(function() {
    scheduleMove();
  }, moveInt);
  this.moving = true;
};

BouncyDancer.prototype = Object.create(Dancer.prototype);
BouncyDancer.prototype.constructor = BouncyDancer;

BouncyDancer.prototype.randDir = function() {
  // this.distance = 2;
  this.direction = Math.random()*2*Math.PI;
  this.horizontal = this.distance * Math.cos(this.direction);
  this.vertical = this.distance * Math.sin(this.direction);
};

BouncyDancer.prototype.move = function() {
  var newTop = this.top + this.vertical;
  var newLeft = this.left + this.horizontal;

  var newPosFree  = pegs.free(newLeft + 10, newTop + 10, 10);
  var currentPosFree  = pegs.free(this.left + 10, this.top + 10, 10);

  if(newPosFree !== true) {
    this.reflect(newPosFree, currentPosFree);
  }

  if(newTop + 20 > height || newTop < 32) {
    this.vertical *= -1;
    this.direction = Math.atan(this.vertical/this.horizontal);
  }
  if(newLeft + 20 > width || newLeft < 0) {
    this.horizontal *= -1;
    this.direction = Math.atan(this.vertical/this.horizontal);
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
  this.scheduleID = setInterval(function() {dancer.move();}, moveInt);
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

BouncyDancer.prototype.reflect = function(peg, currentFree) {
  var pegX = peg.x;
  var pegY = peg.y;
  var pegRadius = peg.radius;
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


  if(currentFree !== true) {
    if(nScalar > PegArr.prototype.distance(pegX, pegY, this.left+newDX, this.top+newDY)) {
      newDX *= -1;
      newDY *= -1;
    }
    this.left = pegX - (pegRadius+25)*nUnitX;
    this.top = pegY - (pegRadius+25)*nUnitY;
  }

  this.horizontal = newDX;
  this.vertical = newDY;
  this.direction = Math.atan(this.vertical/this.horizontal);
};