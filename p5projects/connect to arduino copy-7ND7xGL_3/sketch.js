var serial;
var bg = 0;

function setup() {
  createCanvas(400, 400);

  serial = new p5.SerialPort();
  serial.open('/dev/cu.usbmodem1421');
  serial.on('data', parseData);

}

function draw() {
  background(bg);


}

function parseData() {
  var data = serial.readLine();
  console.log(data);

  if (data.length > 0) {
    // console.log(data);
    // } else {
    //  console.log('no data');


    bg = int(map(data, 0, 1023, 0, 255));
  }
}