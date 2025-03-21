/*
Adapted from https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-webserial-output-from-p5-js/
Corresponding Arduino code can be found at the bottom of this sketch
*/

// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();
 
// HTML button object:
let portButton;
let inData;                            // for incoming serial data
let outByte = 0;                       // for outgoing data

let Car_move = 0;                      // for number value converted from inData
 
function setup() {
  createCanvas(400, 300);          // make the canvas
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
  background(248, 150, 30);
  fill(0);
  // display the incoming serial data as a string:
  text("click and drag mouse up and down to move the car", 30, 80);

}

function mouseDragged() {
  // map the mouseY to a range from 0 to 255:
  outByte = byte(map(mouseY, 0, height, 0, 255));
  // send it out the serial port:
  serial.write(outByte);
}

function keyPressed() {
  if (key >= 0 && key <= 9) { // if the user presses 0 through 9
    outByte = (key * 25); // map the key to a range from 0 to 225
    serial.write(outByte); // send it out the serial port
  }
}

// if there's no port selected, 
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}
 
// make the port selector window appear:
function choosePort() {
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
  if (portButton) portButton.hide();
}
 
// read any incoming data as a byte:
function serialEvent() {
  // read a byte from the serial port:
  inData = serial.read();
  // convert raw data to a number
  Car_move = Number(inData);
}
 
// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
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

/* Program your Arduino to write the analog input as follows:

int ledpin = 2;
// int speakerpin = 2; // if you are using a speaker instead of an LED

void setup() {
  Serial.begin(9600);     // initialize serial communications
  pinMode(ledpin, OUTPUT);
}
 
void loop() {
  if (Serial.available() > 0) { // if there's serial data available
    int inByte = Serial.read();   // read one byte of data
    Serial.write(inByte);         // send it back out as raw binary data
    analogWrite(ledpin, inByte);       // use it to set the LED brightness
    // if you're using a speaker instead of an LED, uncomment line below  and comment out the previous line:
    //  tone(speakerpin, inByte*10);     // play tone on pin speakerpin
  }
}

*/