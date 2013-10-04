var ColorDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.removeClass('dancer');
  this.$node.addClass('color');
  this.setSize();
};

ColorDancer.prototype = Object.create(Dancer.prototype);
ColorDancer.prototype.constructor = ColorDancer;
// BlinkyDancer.prototype.step = function(){
//   Dancer.prototype.step.call(this);
//   this.$node.addClass('color');
// };

ColorDancer.prototype.setSize = function() {
  // var styleSettings = {
  //   height: Math.floor(Math.random()*100),
  //   width: Math.floor(Math.random()*100)
  // };
  // this.$node.css(styleSettings);
};