let d = 12;
function setup() {
  createCanvas(640,480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
}

function draw() {
  video.loadPixels();
  background(120, 10);
  //image(video, 0, 0);
  for(let i = 0; i <= width; i += d){
    for(let j = 0; j <= height; j += d){
      let indexPixel = ( (i + d/2) + (j + d/2) * video.width) * 4;
      let rr = video.pixels[indexPixel];
      let gg = video.pixels[indexPixel + 1];
      let bb = video.pixels[indexPixel + 2];
      noStroke();
      fill(rr,gg,bb);
      //rect(i, j, i+d, j+d);
      circle(i+ 50 * sin(frameCount / 10), j+d/2 + 50 * cos(frameCount / 10), d);
      
      // push();
      // if (rr >= gg && rr >= bb) {
      //   fill(255, 0, 0);
      // } else if (gg >= rr && gg >= bb) {
      //   fill(0, 255, 0);
      // } else {
      //   fill(0, 0, 255);
      // }
      // rect(i, j, d, d);
      // pop();

      
      
    }
  }
}