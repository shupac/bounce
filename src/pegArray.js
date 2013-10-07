var PegArr = function() {
  this.pegArr = [];
};

PegArr.prototype.free = function(objX, objY, objR) {
  for(var i = 0; i < this.pegArr.length; i++) {
    var pegX = this.pegArr[i].x;
    var pegY = this.pegArr[i].y;
    var pegR = this.pegArr[i].radius;

    if(distance(pegX, pegY, objX, objY) < pegR + objR) {
      return this.pegArr[i];
    }
  }
  return true;
};

PegArr.prototype.add = function(x1, y1, x2, y2) {
  var peg = new Peg(x1, y1, x2, y2);
  peg.$node.data("index", this.pegArr.length);
  this.pegArr.push(peg);
  return peg.$node;
};

PegArr.prototype.lastNode = function() {
  if(this.pegArr.length) return this.pegArr.pop().$node;
};

PegArr.prototype.get = function(i) {
  return this.pegArr[i];
};