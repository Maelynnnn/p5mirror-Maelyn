let video;

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
  background(220);
  image(video, 0, 0, width, height, 0, 0,video.width, video.height, COVER);
}