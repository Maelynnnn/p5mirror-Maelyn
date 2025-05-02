//https://maelynnnn.github.io/ims-2025-Maelyn/2025_4_12_ims_assignment_url/index.html?c=red
let video;
let handPose;
let hands = [];
let params = {};

let fsButton;

function preload(){
  handPose = ml5.handPose();
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  fsButton = createButton('Fullscreen');
  fsButton.position(10, height - 40);
  fsButton.mousePressed(toggleFullscreen);
  
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
  
  handPose.detectStart(video, gotHands);
  
  // URL
  params = get_url_params();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  fsButton.position(10, height - 40);
  video.size(windowWidth, windowHeight);
}

function toggleFullscreen(){
  let fs = fullscreen();
  fullscreen(!fs);
  fsButton.html('Fullscreen');
}

function gotHands(results){
  hands = results;
}

function draw(){
  background(220);
  image(video, 0, 0, width, height);
  
  // 根change color based on url，default black
  let ballColor = (params && params.c) ? params.c : "black";
  
  if(hands.length >= 2){
    let leftHand = hands[0];
    let rightHand = hands[1];
    
    let dLeft = dist(
      leftHand.index_finger_tip.x, leftHand.index_finger_tip.y,
      leftHand.thumb_tip.x, leftHand.thumb_tip.y
    );
    let dRight = dist(
      rightHand.index_finger_tip.x, rightHand.index_finger_tip.y,
      rightHand.thumb_tip.x, rightHand.thumb_tip.y
    );
    
    let idx_x0 = leftHand.index_finger_tip.x;
    let idx_y0 = leftHand.index_finger_tip.y;
    let idx_x1 = rightHand.index_finger_tip.x;
    let idx_y1 = rightHand.index_finger_tip.y;
    
    let num = 50;
    for(let i = 0; i < num; i++){
      let percentage = i / num;
      let x = lerp(idx_x0, idx_x1, percentage);
      let y = lerp(idx_y0, idx_y1, percentage) + 50 * sin(percentage * TWO_PI + frameCount / 10);
      // lerp d
      let d_here = lerp(dLeft, dRight, percentage);
      noStroke();
      fill(ballColor);
      circle(x, y, d_here);
    }
  }
}

// URLSearchParams
function get_url_params(){
  let query = window.location.search;
  if(query.length < 1) return {};
  return params_query(query);
}

function params_query(query){
  const urlParams = new URLSearchParams(query);
  return Object.fromEntries(urlParams);
}
