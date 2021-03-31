//animation loop
function animate() {
  //clear the levels
  ctx1.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx3.clearRect(0, 0, canvas.width, canvas.height);
  ctx4.clearRect(0, 0, canvas.width, canvas.height);
  ctx5.clearRect(0, 0, canvas.width, canvas.height);
  //draw the backgrounds
  //draw the particles when the frog jumps
  handleRipples();
  //takes in the image you want to draw, x and y coords, width and height
  ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);
  handleParticles();
  //draw the frogger based on current dimensions
  frogger.draw();
  //update the frogger
  frogger.update();

  //generate the obstacles
  handleObstacles();
  //strokes the current score
  handleScoreBoard();
  //draws the grass
  ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);
  //increase frame to track the animations
  frame++;
  //recursively continue to call this function
  requestAnimationFrame(animate);
}
animate();

//event listeners
//event listener for arrow keys being pressed
window.addEventListener("keydown", function (e) {
  keys = [];
  // adds whatever key was pressed to the global keys array
  keys[e.key] = true;

  //these are keycodes for arrow keys, call custom move method
  if (
    keys["ArrowUp"] ||
    keys["ArrowDown"] ||
    keys["ArrowLeft"] ||
    keys["ArrowRight"]
  ) {
    frogger.jump();
  }
});

//event listener for key up, it resets moving back to false
window.addEventListener("keyup", function (e) {
  delete keys[e.key];
  frogger.moving = false;
  frogger.frameX = 0;
});

//scored gets run through update()
function scored() {
  //increase the global variables
  score++;
  gameSpeed += 0.05;
  frogger.reset();
}

function handleScoreBoard() {
  ctx4.fillStyle = "black";
  ctx4.strokeStyle = "black";
  ctx4.font = "15px Verdana";
  //what to stroke and the coords
  ctx4.strokeText("Score", 265, 15);
  ctx4.font = "60px Verdana";
  //score is the global variable for current score
  ctx4.fillText(score, 270, 65);
  ctx4.font = "15px Verdana";
  ctx4.strokeText("Collisions: " + collisionsCount, 10, 175);
  //if we dont run toFixed on gamespeed, it will be a long float
  ctx4.strokeText("Game Speed: " + gameSpeed.toFixed(2), 10, 195);
}

// collision detection between two rectangles
//if any of these are true then there is no collision, therefore with the ! it will return false
function collision(first, second) {
  return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  );
}

//when frog gets hit or falls, reset its coords to start position
function resetGame() {
  frogger.reset();
  score = 0;
  collisionsCount++;
  gameSpeed = 1;
}
