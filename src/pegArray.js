var PegArr = function() {
  this.pegArr = [];
};

PegArr.prototype.free = function(objX, objY, objR) {
  for(var i = 0; i < this.pegArr.length; i++) {
    var pegX = this.pegArr[i][0];
    var pegY = this.pegArr[i][1];
    var pegR = this.pegArr[i][2];

    if(this.distance(pegX, pegY, objX, objY) < pegR + objR) {
      return this.pegArr[i];
    }
  }
  return true;
};

PegArr.prototype.add = function(x1, y1, x2, y2) {
  var radius = this.distance(x1, y1, x2, y2);
  this.pegArr.push([x1, y1, radius]);

  var pegNode = $('<span class="peg"></span>');
  var styleSettings = {
    'top': y1-radius,
    'left': x1-radius,
    'border-width':radius,
    'border-radius':radius,
    'position':'absolute'
  }
  pegNode.css(styleSettings);
  return pegNode;
};

PegArr.prototype.distance = function(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
};

PegArr.prototype.undo = function() {
  return this.pegArr.pop();
}