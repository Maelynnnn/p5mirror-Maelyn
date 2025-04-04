let video;
let faceMesh;
let faces = [];
let triangles;
let spreading = false;
let spreadRadius = 200; // 初始扩散范围（建议值，可根据实际脸部尺寸调整）
let faceCenter;
let smile = 70;

var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;

function preload() {
  // 加载 FaceMesh 模型，最多检测1张脸，翻转视频输入
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
  mirror= loadImage("mirror.png");
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(600,800);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // 开始检测脸部
  faceMesh.detectStart(video, gotFaces);
  // 获取预定义的三角连接数据
  triangles = faceMesh.getTriangles();
  
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(0);
  image(mirror, 0, 0);
  video.loadPixels();

  if (faces.length > 0) {
    let face = faces[0];
    
    // 计算脸部中心（所有关键点的平均值）
    let sumX = 0, sumY = 0;
    for (let kp of face.keypoints) {
      sumX += kp.x;
      sumY += kp.y;
    }
    faceCenter = createVector(sumX / face.keypoints.length, sumY / face.keypoints.length);
    
    // 获取嘴角数据，用于切换蔓延状态
    let leftMouth = face.keypoints[76];
    let rightMouth = face.keypoints[409];
    let d = dist(leftMouth.x, leftMouth.y, rightMouth.x, rightMouth.y);
    console.log(d)
    
    
    let maxD = 0;
    for (let kp of face.keypoints) {
      let curD = dist(kp.x, kp.y, faceCenter.x, faceCenter.y);
      if (curD > maxD) {
        maxD = curD + 80;
        //spreadRadius = maxD;
      }
    }
    
    // 使用逻辑与 && 来判断
    if (d >= smile && !spreading) {
      // 如果嘴角距离较大且未开启蔓延，则开启蔓延，重置 spreadRadius
      spreading = true;
      spreadRadius = maxD;
      flame();
    }
    if (d < smile && spreading) {
      // 如果嘴角距离较小且正在蔓延，则关闭效果
      spreading = false;
    }
    
    
    // 根据蔓延状态更新 spreadRadius：
    if (spreading) {
      // 开启效果时，逐帧减少 spreadRadius，使得绿色区域逐渐扩展向内
      spreadRadius = max(spreadRadius - 2, 0);
    } else {
      // 关闭效果时，逐帧增加 spreadRadius，最多不超过 maxD，从而逐渐恢复原色
      spreadRadius = min(spreadRadius + 2, maxD);
    }
    
    randomSeed(5);
    beginShape(TRIANGLES);
    for (let i = 0; i < triangles.length; i++) {
      let tri = triangles[i];
      let [a, b, c] = tri;
      let pointA = face.keypoints[a];
      let pointB = face.keypoints[b];
      let pointC = face.keypoints[c];

      // 计算三角形的中心
      let cx = (pointA.x + pointB.x + pointC.x) / 3;
      let cy = (pointA.y + pointB.y + pointC.y) / 3;
      
      // 从视频像素中采样颜色
      let indexPixel = (floor(cx) + floor(cy) * video.width) * 4;
      let rr = video.pixels[indexPixel];
      let gg = video.pixels[indexPixel + 1];
      let bb = video.pixels[indexPixel + 2];
      let baseColor = color(rr, gg, bb);
      
      // 计算三角形中心到脸部中心的距离
      let everyD = dist(faceCenter.x, faceCenter.y, cx, cy) + 50;
      let factor = map(everyD, spreadRadius, maxD, 0, 2, true);

      let finalColor = lerpColor(baseColor, color(0, 200, 0), factor);
      fill(finalColor); 
     
      
      
      noStroke();
      vertex(pointA.x, pointA.y);
      vertex(pointB.x, pointB.y);
      vertex(pointC.x, pointC.y);
    }
    endShape();
  }
}

function flame(){
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;

    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}
