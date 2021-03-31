//create the different draw layers
const canvas = document.getElementById("canvas1");
const ctx1 = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = 600;
canvas2.height = 600;

const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");
canvas3.width = 600;
canvas3.height = 600;

const canvas4 = document.getElementById("canvas4");
const ctx4 = canvas4.getContext("2d");
canvas4.width = 600;
canvas4.height = 600;

const canvas5 = document.getElementById("canvas5");
const ctx5 = canvas5.getContext("2d");
canvas5.width = 600;
canvas5.height = 600;

//global variables
//grid based game, each cell is 80px
const grid = 80;
//will hold whatever keys were pressed on keyboard
let keys = [];
//score
let score = 0;
//collisions
let collisionsCount = 0;
//frames, if you want to do something every x frames ect
let frame = 0;
//gamespeed, changes over time
let gameSpeed = 1;

//hold all dust particle objects
let particlesArray = [];
//maxParticles is the max for performance issues
let maxParticles = 300;
//hold all water ripple objects
let ripplesArray = [];
//hold randomized cars
let carsArray = [];
//turtles, logs, crocodiles ect
let logsArray = [];

let safe = false;

//images
const background_lvl2 = new Image();
background_lvl2.src = "background_lvl2.png";

const grass = new Image();
grass.src = "grass.png";

const collisions = new Image();
collisions.src = "collisions.png";

const turtle = new Image();
turtle.src = "turtles.png";

const log = new Image();
log.src = "log.png";

const car = new Image();
car.src = "cars.png";
let numberOfCars = 3;

const froggerSprite = new Image();
froggerSprite.src = "frog_spritesheet.png";
