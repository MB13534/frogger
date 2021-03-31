class Particle {
  constructor(x, y) {
    //the 25px centers to the frog
    this.x = x + 25;
    this.y = y + 25;
    //random size 1-20
    this.radius = Math.random() * 20 + 1;
    //particles will slowly fade
    this.opacity = 1;
    //particles slowly spread from under the frog, -.5 and +.5
    //speed, positive go to the right, negative to the left
    this.directionX = Math.random() * 1 - 0.5;
    //speed, negative go up, positive go down
    this.directionY = Math.random() * 1 - 0.5;
  }

  draw() {
    //make it so we can change the opacity dynamicly
    ctx3.fillStyle = "rgba(150, 150, 150, " + this.opacity + ")";
    //when you want to draw a circle, start with beginPath (pencil down)
    ctx3.beginPath();
    //arc draws circle based on starting coords, radius, start angle and end angle
    ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    //fill the path with color
    ctx3.fill();
    //close the path
    ctx3.closePath();
  }

  //update runs every frame and moves particles
  update() {
    this.x += this.directionX;
    this.y += this.directionY;
    //slowely lower the opacity
    if (this.opacity > 0.1) {
      this.opacity -= 0.9;
    }
    if (this.radius > 0.15) {
      this.radius -= 0.14;
    }
  }

  drawRipple() {
    //make it so we can change the opacity dynamicly
    ctx1.strokeStyle = "rgba(255, 255, 255, " + this.opacity + ")";
    //when you want to draw a circle, start with beginPath (pencil down)
    ctx1.beginPath();
    //arc draws circle based on starting coords, radius, start angle and end angle
    ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    //just draws the outline of the circle instead of filling it
    ctx1.stroke();
    //close the path
    ctx1.closePath();
  }
  ripple() {
    if (this.radius < 50) {
      this.radius += 0.7;
      this.x -= 0.03;
      this.y -= 0.03;
    }
    if (this.opacity > 0) {
      this.opacity -= 0.009;
    }
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    //cycles out the old particles when it gets to the max
    if (particlesArray.length > maxParticles) {
      for (let i = 0; i < 30; i++) {
        particlesArray.pop();
      }
    }
  }

  //dust particles
  //only run if the frog moves, and it is not on the water, and that there are less than maxParticles (performance)
  if (
    (keys["ArrowUp"] ||
      keys["ArrowDown"] ||
      keys["ArrowLeft"] ||
      keys["ArrowRight"]) &&
    frogger.y > 250 &&
    particlesArray.length < maxParticles + 10
  ) {
    //if conditions are met, enter the loop and run 10 times
    for (let i = 0; i < 10; i++) {
      //unshift places in the beginning of the array instead of the end
      //the new dust particles should start where the frogger is standing
      particlesArray.unshift(new Particle(frogger.x, frogger.y));
    }
  }
}
//water ripples
function handleRipples() {
  for (let i = 0; i < ripplesArray.length; i++) {
    ripplesArray[i].ripple();
    ripplesArray[i].drawRipple();
    //cycles out the old ripples when it gets to the max, which is 20
    if (ripplesArray.length > 20) {
      for (let i = 0; i < 5; i++) {
        ripplesArray.pop();
      }
    }
  }

  //only run if the frog moves, and it is not on the water, and that there are less than maxParticles (performance)
  if (
    (keys["ArrowUp"] ||
      keys["ArrowDown"] ||
      keys["ArrowLeft"] ||
      keys["ArrowRight"]) &&
    frogger.y < 250 &&
    frogger.y > 100 &&
    ripplesArray.length < 20 + 10
  ) {
    //if conditions are met, enter the loop and run 10 times
    for (let i = 0; i < 20; i++) {
      //unshift places in the beginning of the array instead of the end
      //the new dust particles should start where the frogger is standing
      ripplesArray.unshift(new Particle(frogger.x, frogger.y));
    }
  }
}
