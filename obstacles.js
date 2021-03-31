class Obstacle {
  //6 attributes expected when creating an obstacle
  constructor(x, y, width, height, speed, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
    this.frameX = 0;
    this.frameY = 0;
    this.randomise = Math.floor(Math.random() * 30 + 30);
    this.carType = Math.floor(Math.random() * numberOfCars);
  }

  draw() {
    if (this.type === "turtle") {
      if (frame % this.randomise === 0) {
        if (this.frameX >= 1) this.frameX = 0;
        else this.frameX++;
      }

      //first is image to draw, next 4 are coords and scale of the sprite iamge, next is where to put it and scale
      ctx1.drawImage(
        turtle,
        this.frameX * 70,
        this.frameY * 70,
        70,
        70,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (this.type === "log") {
      ctx1.drawImage(log, this.x, this.y, this.width, this.height);
    } else {
      ctx2.drawImage(
        car,
        this.frameX * this.width,
        this.carType * this.height,
        grid * 2,
        grid,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    // ctx3.fillStyle = "blue";
    // ctx3.fillRect(this.x, this.y, this.width, this.height);
  }

  //move obstacles horizontally
  update() {
    //use muiltiply because this.speed can be + or -, because of direction
    this.x += this.speed * gameSpeed;

    //if cars are moving to the right (speed is positive)
    if (this.speed > 0) {
      //checks to see if the car is off the screen + one car length
      if (this.x > canvas.width + this.width) {
        //checks to see which direction to render the car
        this.x = 0 - this.width;
        //one the car leaves the screen, make it a new random car
        this.carType = Math.floor(Math.random() * numberOfCars);
      }
    } else {
      //cars moving to the right
      this.frameX = 1;
      if (this.x < 0 - this.width * 2) {
        //checks to see which direction to render the car
        this.x = canvas.width;
        //one the car leaves the screen, make it a new random car
        this.carType = Math.floor(Math.random() * numberOfCars);
      }
    }
  }
}

function initObstacles() {
  //lane 1 (cars)
  //run this twice
  for (let i = 0; i < 2; i++) {
    //handle horizontal spacing between cars we make temporary variable
    let x = i * 350;
    //x is the temporary variable
    //y is coords of the height of the first lane, 20 is padding
    //width is size of the grid, 80
    //height is size of the grid, 80
    //speed is the direction, +1 is right, -1 is left
    //type is car
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, "car")
    );
  }

  //lane 2 (cars)
  //run this twice
  for (let i = 0; i < 2; i++) {
    let x = i * 300;
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2, "car")
    );
  }

  //lane 3 (Cars)
  //run this twice
  for (let i = 0; i < 2; i++) {
    let x = i * 400;
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, "car")
    );
  }

  //lane 4 (logs)
  //run this twice
  for (let i = 0; i < 2; i++) {
    let x = i * 400;
    logsArray.push(
      new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, "log")
    );
  }

  //lane 5 (turtles)
  //run this three times
  for (let i = 0; i < 3; i++) {
    let x = i * 200;
    logsArray.push(
      new Obstacle(x, canvas.height - grid * 6 - 20, grid, grid, 1, "turtle")
    );
  }
}
initObstacles();

function handleObstacles() {
  for (let i = 0; i < carsArray.length; i++) {
    carsArray[i].update();
    carsArray[i].draw();
  }
  for (let i = 0; i < logsArray.length; i++) {
    logsArray[i].update();
    logsArray[i].draw();
  }
  //need to run this collision check on every frame on every obstacle
  //collisions with cars
  for (let i = 0; i < carsArray.length; i++) {
    if (collision(frogger, carsArray[i])) {
      //first argument is the image you want to draw, and the source properties x, y, width, height, last 4 are where on canvas you want to draw the image coords and scale
      ctx4.drawImage(
        collisions,
        0,
        100,
        100,
        100,
        frogger.x,
        frogger.y,
        50,
        50
      );
      resetGame();
    }
  }
  //collisions with logs and turtles
  if (frogger.y < 250 && frogger.y > 100) {
    safe = false;

    for (let i = 0; i < logsArray.length; i++) {
      if (collision(frogger, logsArray[i])) {
        frogger.x += logsArray[i].speed;
        safe = true;
      }
    }
    if (!safe) {
      for (let i = 0; i < 30; i++) {
        ripplesArray.unshift(new Particle(frogger.x, frogger.y));
      }
      resetGame();
    }
  }
}
