var moveInterval = 7;

var BouncyBall = function(x, y){
  Circle.call(this, x, y, 10);
  this.$node.addClass('ball');
  this.speed = 3;

  this.randDir();

  var scheduleMove = this.move.bind(this);
  this.scheduleID = setInterval(function() {
    scheduleMove();
  }, moveInterval);
  this.moving = true;
};

BouncyBall.prototype = Object.create(Circle.prototype);
BouncyBall.prototype.constructor = BouncyBall;

BouncyBall.prototype.randDir = function() {
  this.direction = Math.random()*2*Math.PI;
  this.horizontal = this.speed * Math.cos(this.direction);
  this.vertical = this.speed * Math.sin(this.direction);
};

BouncyBall.prototype.move = function() {
  var newX = this.x + this.horizontal;
  var newY = this.y + this.vertical;

  var newPosFree  = pegs.free(newX, newY, this.radius); 

  if(newPosFree !== true) {
    this.reflect(newPosFree);
  }

  if(newX + 2 * this.radius > width || newX < 0) {
    this.horizontal *= -1;
    this.direction = Math.atan(this.vertical/this.horizontal);
  }
  if(newY + 2*this.radius > height || newY < 32) {
    this.vertical *= -1;
    this.direction = Math.atan(this.vertical/this.horizontal);
  }

  this.y += this.vertical;
  this.x += this.horizontal;
  this.setPosition(this.x, this.y);
};

BouncyBall.prototype.stopMoving = function() {
  clearInterval(this.scheduleID);
  this.moving = false;
};

BouncyBall.prototype.startMoving = function() {
  var ball = this;
  this.scheduleID = setInterval(function() {ball.move();}, moveInterval);
  this.moving = true;
};

BouncyBall.prototype.reflect = function(peg) {
  var nScalar = distance(peg.x, peg.y, this.x, this.y);
  var nUnitX = (peg.x - this.x)/nScalar;
  var nUnitY = (peg.y - this.y)/nScalar;
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