var MovingDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('color');

  this.step();
  this.$node.addClass('movers');
};

MovingDancer.prototype = Object.create(Dancer.prototype);
MovingDancer.prototype.constructor = MovingDancer;
MovingDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);
  this.move();
};

MovingDancer.prototype.move = function() {
  var height = $('body').height();
  var width = $('body').width();
  var distance = 100;
  var horizontal = Math.floor((Math.random()-0.5) * distance);
  var vertical = Math.sqrt(Math.pow(distance, 2) - Math.pow(horizontal, 2));
  if(Math.random()-0.5 < 0) vertical *= -1;

  if(this.top + vertical + 20 > height || this.top + vertical < 0 ||
    this.left + horizontal + 20 > width || this.left + horizontal < 0) {
    this.move();
  } else {
    this.top = this.top + vertical;
    this.left = this.left + horizontal;
  }
  this.setPosition(this.top, this.left);
};

MovingDancer.prototype.setPosition = function(top, left){
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.animate(styleSettings);
};