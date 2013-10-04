$(document).on(ready, function() {
  $('.addDancers').on('click', function(){
    var refresh = Math.random() * 1000;
    var numDancers = $('.numDancers').val();
    var dancerClassName = 'BouncyDancer'
    if(dancerClassName === 'MovingDancer') refresh = 10;
    var dancerClass = window[dancerClassName];
    if(dancerClass)
    for(var i = 0; i < numDancers; i++) {
      var dancer = new dancerClass(
        ($("body").height()-52) * Math.random()+32,
        ($("body").width()-20) * Math.random()
      );
      window.dancers.push(dancer);
    }
    showDancers();
  });


  $('.lineup').on('click', function() {
    var space = 5;
    var size = 20;
    for(var i = 0; i < window.dancers.length; i++) {
      var column = Math.floor(i/space);
      window.dancers[i].setPosition(32+ i % space * size, column * size);
      window.dancers[i].stopMoving();
    }
  });

  $(document).keydown(function(e){
    if(e.shiftKey) explode();
  });


  $('body').on('mouseup', function(){
    if(event.pageY > 32 && event.which === 1) {
      endX = event.pageX;
      endY = event.pageY;
      if(Math.abs(startX - endX) > 5 || Math.abs(startY - endY) > 5) {
        var newPeg = pegs.add(startX, startY, endX, endY);
      } else {
        explode(endX, endY);
      }
      $('body').append(newPeg);
    }
  });

  var explode = function(x, y) {
    x = x || width/2;
    y = y || height/2;
    for(var i = 0; i < window.dancers.length; i++) {
      window.dancers[i].randDir();
      window.dancers[i].setPosition(y, x);
      if(!window.dancers[i].moving) {
        window.dancers[i].startMoving();
      }
    }
  };

  var dragEvent = function() {
    var startX, startY, endX, endY;
    $('body').on('mousedown', function(event){
    if(event.pageY > 32 && event.which === 1) {
        startX = event.pageX;
        startY = event.pageY;
    }});
  };
});


