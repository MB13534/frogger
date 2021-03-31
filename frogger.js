class Frogger {
  //constructor runs once when object is initizlied
  //it creates a new blank object with properties declared
  constructor() {
    //width of one frame of our character sprite sheet, two columns at 500px
    this.spriteWidth = 250;
    //width of one frame of our character sprite sheet, 4 rows at 1000px
    this.spriteHeight = 250;

    //we want this 5 times smaller than the actual dimisnions on the sprite sheet
    this.width = this.spriteWidth / 5;
    this.height = this.spriteHeight / 5;

    //xy coords where frog first logs
    //center of the page at the bottom
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 40;

    //prevent frog from moving too fast user holds down the arrow key
    //each press triggers one jump to the next grid cell
    this.moving = false;

    //hold coordinates for current frame within the sprite sheet
    this.frameX = 0;
    this.frameY = 0;
  }
  update() {
    //move up
    if (keys["ArrowUp"]) {
      if (this.moving === false) {
        //moves up one grid unit
        this.y -= grid;
        //this only updates if moving is false, since moving becomes true, and only turns back to false after a KEY UP, it can only move one space
        this.moving = true;
        //which image on the frog sprite sheet to choose
        this.frameX = 1;
        this.frameY = 0;
      }
    }
    //move down
    if (keys["ArrowDown"]) {
      //checks to make sure moving is false and the frog wouldnt leave the boundries
      if (this.moving === false && this.y < canvas.height - this.height * 2) {
        //moves down one grid unit
        this.y += grid;
        //this only updates if moving is false, since moving becomes true, and only turns back to false after a KEY UP, it can only move one space
        this.moving = true;
        this.frameY = 3;
      }
    }
    //move left
    if (keys["ArrowLeft"]) {
      //checks to make sure moving is false and the frog wouldnt leave the boundries
      if (this.moving === false && this.x > this.width) {
        //moves left one grid unit
        this.x -= grid;
        //this only updates if moving is false, since moving becomes true, and only turns back to false after a KEY UP, it can only move one space
        this.moving = true;
        this.frameY = 2;
      }
    }
    //move right
    if (keys["ArrowRight"]) {
      //checks to make sure moving is false and the frog wouldnt leave the boundries
      if (this.moving === false && this.x < canvas.width - this.width * 2) {
        //moves right one grid unit
        this.x += grid;
        //this only updates if moving is false, since moving becomes true, and only turns back to false after a KEY UP, it can only move one space
        this.moving = true;
        this.frameY = 1;
      }
    }

    //checks to see if player makes it to the top
    if (this.y < 0) scored();
  }

  draw() {
    //ctx3 is the frog
    ctx3.drawImage(
      froggerSprite,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 25,
      this.y - 25,
      this.width * 2,
      this.height * 2
    );
  }

  jump() {
    if (this.moving === false) this.frameX = 1;
    else if (this.frameX === 1) this.frameX = 0;
  }

  reset() {
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 40;
  }
}

//create a blank Frogger called frogger, all attributes come from constructor
const frogger = new Frogger();
