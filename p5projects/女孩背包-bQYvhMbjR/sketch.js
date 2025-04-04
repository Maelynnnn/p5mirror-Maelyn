const serial = new p5.WebSerial();

let drop_speed = 2;
let up_speed = 35;
let ball_h;
let girl;
let bag;
let limit;
let pressing = false;

 
// HTML button object:
let portButton;
let inData;                   // for incoming serial data
let outByte = 0;              // for outgoing data

function preload(){
  girl = loadImage("女孩背影.png");
  bag = loadImage("书包.png");
  
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  ball_h = windowHeight;
  limit = windowHeight / 7;
  
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
  background(220);
  image(girl, windowWidth / 400, -200);
  image(bag, width/ 3.5, ball_h);
  if(ball_h >= height || ball_h <= limit){
    drop_speed = 0;
  }else{
    drop_speed = 2;
    ball_h += drop_speed;
  }

  if(ball_h <= limit){
    up_speed = 0;
  }
  
  if(inData == 1 && pressing == false){
    ball_h -= up_speed;
    pressing = true;
  }
  if (inData == 0) {
    pressing = false;
  }
 // line(0, limit, windowWidth, limit);
}
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}
 
// make the port selector window appear:
function choosePort() {
  if (portButton) portButton.show();
  serial.requestPort();
}
 
// open the selected port, and make the port 
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);
 
  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
  }
  // hide the port button once a port is chosen:
  // if (portButton) portButton.hide();
}
 
// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}
// read any incoming data as a byte
function serialEvent() {
  // read one byte of data and store the raw data in inData
  inData = serial.read();
  // convert raw data to a number
  //redValue = Number(inData);
  // only use console.log for debugging
  // remove it after testing, otherwise console.log will
  // slow down or even crash the sketch
  // console.log(inData);
}
 
// try to connect if a new serial port 
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}
 
// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}
 
function closePort() {
  serial.close();
}