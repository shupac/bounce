var Peg = function(x1, y1, x2, y2) {
  Circle.call(this, x1, y1, distance(x1, y1, x2, y2));
  this.$node.addClass('peg');
};

Peg.prototype = Object.create(Circle.prototype);

Peg.prototype.constructor = Peg;

Peg.prototype.setPosition = function(x, y) {
  Circle.prototype.setPosition.call(this, x, y);
  for(var i = 0; i < balls.length; i++) {
    var ball = balls[i];
    if(distance(x, y, ball.x, ball.y) < ball.radius + this.radius) {
      var nScalar = distance(x, y, ball.x, ball.y);
      var nUnitX = (x - ball.x)/nScalar;
      var nUnitY = (y - ball.y)/nScalar;
      ball.setPosition(x - (this.radius+ball.radius)*nUnitX, y - (this.radius+ball.radius)*nUnitY);
    }
  }
};