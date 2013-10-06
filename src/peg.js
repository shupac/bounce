var Peg = function(x1, y1, x2, y2) {
  this.x = x1;
  this.y = y1;
  this.radius = this.distance(x1, y1, x2, y2);
  this.pegNode = $('<span class="peg"></span>');
  this.setCSS();
  // return pegNode;
};

Peg.prototype.distance = function(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
};

Peg.prototype.node = function() {
  return this.pegNode;
};

Peg.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;
  this.setCSS();
}

Peg.prototype.setCSS = function() {
  var styleSettings = {
    'top': this.y-this.radius,
    'left': this.x-this.radius,
    'border-width':this.radius,
    'border-radius':this.radius,
    'position':'absolute'
  };
  this.pegNode.css(styleSettings);
}