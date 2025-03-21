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

let redValue = 0;             // for number value converted from inData
 
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
  // use inValue as the red value for background
  background(redValue,0,0);
  fill(255);
  text("raw incoming data: " + inData, 30, 50);
  circle(100,inData,20);
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
  redValue = Number(inData);
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

/* Program your Arduino to read the analog input as follows:

int potPin = A0;

void setup() {
  Serial.begin(9600); // initialize serial communications
}
 
void loop() {
  // read the input pin:
  int potReading = analogRead(potPin);                  
  // remap the pot value to fit in 1 byte:
  int mappedPotReading = map(potReading, 0, 1023, 0, 255); 
  // write/send one byte to the serial port:
  Serial.write(mappedPotReading);                             
  // slight delay to stabilize the ADC:
  delay(1);                                            
}

*/