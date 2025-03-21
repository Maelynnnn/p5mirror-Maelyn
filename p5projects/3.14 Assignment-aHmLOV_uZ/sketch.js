/*
Adapted from https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-webserial-input-to-p5-js/
Corresponding Arduino code can be found at the bottom of this sketch
*/

// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();
 
// HTML button object:
let portButton;
let inData;                   // for incoming serial data
let outByte = 0;              // for outgoing data

let player_posy = 0;             // for number value converted from inData

let enemies = [];
let enemy_speed = 1;
let enemy;

let bullets = [];
let bullet_speed = 3;
let bullet_img;
let avatar;

function preload(){
  enemy = loadImage("slime.gif");
  bullet_img = loadImage("attack.png");
  bg = loadImage("bg.png");
  avatar = loadImage('avatar.png');
}

function setup() {
  createCanvas(600, 400);          // make the canvas
  
  
  // check to see if serial is available:
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // if serial is available, add connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
}
 
function draw() {

  image(bg, 0, 0);
  let player_y = map(player_posy, 0, 255, 0, height);

  //fill(255);
  //text("raw incoming data: " + inData, 30, 50);
  
  //background(220);
  if (frameCount % 13 === 0) {
    enemies.push({ x: -10, y: random(50, height - 50) });
  }
  if (frameCount % 13 === 0) {
    bullets.push({ x: width - 100, y: player_y });
  }

  draw_enemies();
  check_collisions();
  
  image(avatar, width - 100, player_y);
  
  draw_bullets();
  console.log(player_posy)
}


function makePortButton() {
  
  portButton = createButton("choose port");
  portButton.position(10, 10);
  
  portButton.mousePressed(choosePort);
}
 

function choosePort() {
  if (portButton) portButton.show();
  serial.requestPort();
}
 

function openPort() {
  
  serial.open().then(initiateSerial);
 
  
  function initiateSerial() {
    console.log("port open");
  }
  
}
 

function portError(err) {
  alert("Serial port error: " + err);
}

function serialEvent() {
  
  inData = serial.read();

  player_posy = Number(inData);
  
}

function portConnect() {
  console.log("port connected");
  serial.getPorts();
}
 
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}
 
function closePort() {
  serial.close();
}

function draw_enemies() {
  for (let i = 0; i < enemies.length; i++) {
    let enemyObj = enemies[i];
    enemyObj.x += enemy_speed;
    push();
    scale(0.2);
    image(enemy, enemyObj.x / 0.2, enemyObj.y / 0.2);
    pop();
  }
  enemies = enemies.filter((e) => e.x < width + 50);
}

function draw_bullets() {
  for (let j = 0; j < bullets.length; j++) {
    let bulletObj = bullets[j];
    bulletObj.x -= bullet_speed;
    image(bullet_img, bulletObj.x, bulletObj.y);
  }
  bullets = bullets.filter((e) => e.x > -10);
}

function place_meeting() {}

function check_collisions() {
  let newEnemies = [];
  let newBullets = [];

  for (let i = 0; i < enemies.length; i++) {
    let enemyObj = enemies[i];
    let hit = false;

    for (let j = 0; j < bullets.length; j++) {
      let bulletObj = bullets[j];

      if (dist(enemyObj.x, enemyObj.y, bulletObj.x, bulletObj.y) < 20) {
        hit = true;
      } else {
        newBullets.push(bulletObj);
      }
    }

    if (!hit) {
      newEnemies.push(enemyObj);
    }
  }

  enemies = newEnemies;
}
