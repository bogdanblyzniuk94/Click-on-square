  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var score = document.getElementById('score');
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var stoping;
  var points = 0;

  function getPositionX() {
    var squarePosition_x = Math.ceil(Math.random() * 750);
    return squarePosition_x;
  }
  var squarePosition_x = getPositionX();
  var squarePosition_y = 0;

  function getSpeed() {
    var speed = Math.ceil(Math.random() * 4);
    return speed;
  }
  var speed = getSpeed();

  function getRandomColor() {
     var letters = '0123456789ABCDEF'.split('');
     var color = '#';
     for (var i = 0; i < 6; i++) {
       color += letters[Math.round(Math.random() * 15)];
     }
     return color;
  }
  var color = getRandomColor();

  function startGame() {
  	context.clearRect(0, 0, canvas.width, canvas.height);
  	context.beginPath();
  	context.fillStyle = color;
    context.fillRect(squarePosition_x, squarePosition_y, 50, 50);
  	squarePosition_y += speed;
  	stoping = requestAnimationFrame(startGame);
  }

  start.addEventListener('click', startGame);

  canvas.onmousedown = function canvasClick (e){
  		var clickX = e.pageX - canvas.offsetLeft;
    	var clickY = e.pageY - canvas.offsetTop;
      	if ((clickX > (squarePosition_x)) && (clickX < (squarePosition_x + 50)))
      		{
        		if ((clickY > (squarePosition_y)) && (clickY < (squarePosition_y + 50)))
        			{
        				cancelAnimationFrame(stoping);
        				context.clearRect(0, 0, canvas.width, canvas.height);
        				context.beginPath();
        				color = getRandomColor();
        				context.fillStyle = color;
        				points++;
        				score.innerHTML = points;
        				squarePosition_x = getPositionX();
      					squarePosition_y = 0;
      					speed = getSpeed();
        				setTimeout("startGame()", (Math.random() * 1500));
        				return;
        			}
      	}
  }

  function stopGame() {
  	cancelAnimationFrame(stoping);
  	context.clearRect(0, 0, canvas.width, canvas.height);
  	context.beginPath();
  	squarePosition_x = getPositionX();  
    squarePosition_y = 0;   
    points = 0;
    score.innerHTML = points;
    return;
  }

  stop.addEventListener('click', stopGame);