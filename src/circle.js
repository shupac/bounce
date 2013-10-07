var Circle = function(x, y, radius) {
  this.radius = radius || 10;
  this.$node = $('<div></div>');
  this.setPosition(x, y);
};

Circle.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;
  this.drawCircle();
}

Circle.prototype.drawCircle = function() {
  var styleSettings = {
    'top': this.y-this.radius,
    'left': this.x-this.radius,
    'border-width': this.radius,
    'border-radius': this.radius
  };
  this.$node.css(styleSettings);
};