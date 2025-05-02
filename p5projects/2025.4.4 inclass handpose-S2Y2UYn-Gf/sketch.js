let video;
let handPose;
let hands = [];


function preload(){
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  handPose.detectStart(video,gotHands);
}

function gotHands(results){
  //console.log(results);
  hands = results;
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);
  if(hands.length >= 2){
    for(let i = 0; i < hands.length; i ++){
      const index_x = hands[i].index_finger_tip.x;
      const index_y = hands[i].index_finger_tip.y;
      
      const thumb_x = hands[i].thumb_tip.x;
      const thumb_y = hands[i].thumb_tip.y;
      
      const middle_x = hands[i].middle_finger_tip.x;
      const middle_y = hands[i].middle_finger_tip.y;
      //circle(index_x, index_y, 20);
      //circle(thumb_x, thumb_y, 20);

      d = dist(index_x, index_y, thumb_x, thumb_y);
      d2 = dist(middle_x, middle_y,index_x, index_y);
      
      if(d < 30){
        textSize(20);
        fill(0);
        if(i == 0){
          text("Don't pinch me!",(index_x + thumb_x)/2 - 50, (index_y+ thumb_y)/2);
        }else{
          text("Not this side either！",(index_x + thumb_x)/2 - 50, (index_y+ thumb_y)/2);
        }
      }
      
      if(d2 < 30){
        textSize(20);
        fill(0);
        if(i == 0){
          text("比划比划？",(index_x + middle_x)/2 - 50, (index_y+ thumb_y)/2);
        }else{
          text("这边也来？",(index_x + middle_x)/2 - 50, (index_y+ thumb_y)/2);
        }
      }
      
      const idx_x0 = hands[0].index_finger_tip.x;
      const idx_y0 = hands[0].index_finger_tip.y;
      const idx_x1 = hands[1].index_finger_tip.x;
      const idx_y1 = hands[1].index_finger_tip.y;
      strokeWeight(1);
      line(idx_x0, idx_y0, idx_x1, idx_y1);
      
      const w = idx_x1 - idx_x0;
      const h = idx_y1 - idx_y0;
      const num = 50;
      for(let i = 0; i < num; i ++){
        const percentage = i/num;
        const x = map(percentage, 0, 1, idx_x0, idx_x1);
        const y = map(percentage, 0, 1, idx_y0, idx_y1)+50 * sin(percentage * TWO_PI + frameCount / 10);
        const d_here = 50;
        
        circle(x, y, d);
      }
      
    }
    console.log(d2);
  }
}