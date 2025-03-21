//Download serialcontrol app to act as an intermediary to allow p5 to access hardware via serial port: https://github.com/p5-serial/p5.serialcontrol/releases

//This example is modified from the cdn example from the p5.serial github: https://github.com/p5-serial/p5.serialport

// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

let study_string = [];
let string_size = [];
let string_pos_x = [];
let random_num = [];
let string_pos_y = [];
let kong;
let kong_x;
let kong_y;
let kong_speed = 1.3;
let font;
let play = false;


function preload(){
  study_string.push("学而时习之不亦说乎");
  study_string.push("有朋自远方来不亦说乎");
  study_string.push("人不知而不愠不亦君子乎");
  study_string.push("德不孤，必有邻");
  study_string.push("不义而富且贵，于我如浮云");
  study_string.push("三人行，必有我师焉");
  study_string.push("成事不说，遂事不谏，既往不咎");
  study_string.push("朝闻道，夕死可矣");
  study_string.push("不患贫而患不均，不患寡而患不安");
  study_string.push("择其善者而从之，其不善者而改之");
  kong = loadImage("lovekong.png");
  when_close_image = loadImage("close.png");
  font = loadFont("111AoyagiSosekiFont.ttf");
  songjing = loadSound("songjing.MP3");
}

function setup() {
  createCanvas(800,500);
  kong_x = 0;
  kong_y = height;

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("COM3");

  // Here are the callbacks that you can register
  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  serial.on('close', gotClose);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);
}

// We are connected and ready to go
function serverConnected() {
  print("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  print("List of Serial Ports:");
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is Open");
}

function gotClose(){
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

//print error to console
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  let currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // print the string
  latestData = currentString;            // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
  print("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device

function draw() {
  textFont("Jersey 25");
  background(255,255,255);
  fill(0,0,0);
  // text(latestData, 10, 10);
  if(latestData == 1){
    open();
  }
  if(latestData == 0){
    close();
  }
  if(play && !songjing.isPlaying()){
    songjing.play();
  }else if(!play && songjing.isPlaying()){
    songjing.stop();
  }
}

function open(){
  //if(latestData == 1){
  
  background(0,0,0);
  play = true;
  random_num.push(floor(random(0,10)));
  string_size.push(random(8,20));
  string_pos_x.push(random(0, width));
  string_pos_y.push(random(-500,-300));
  //}
    image(kong, kong_x, kong_y);
  kong_y -= kong_speed;
    
  textFont(font);
  for(let i = 0; i < string_size.length; i ++){
    
    push();
    translate(string_pos_x[i], string_pos_y[i]);
    rotate(PI/2);
    
    if(i % 7 == 0){
      fill(249, 65, 68);
    } else {
      fill(255);
    }
    textSize(string_size[i]);
    text(study_string[random_num[i]], 0, random(-2,2));
    pop();
    
    string_pos_y[i] += map(string_size[i],8,20,8,1);
  }
}

function close(){
  play = false;
  background(249, 132, 74);
  image(when_close_image,0,0);
  random_num = [];
  string_size = [];
  string_pos_x = [];
  string_speed = [];
  string_pos_y = [];
  kong_y = height;
}