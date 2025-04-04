let video;
let faceMesh;
let faces = [];
let triangles;
let spreading = false;
let spreadRadius = 200;
let faceCenter;
let smile = 70;
let speed = 1.5;

var inc = 0.1;
var scl = 20;
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
  mirrorLayer = createGraphics(width, height);
  mirrorLayer.image(mirror, 0, 0);
  bgLayer = createGraphics(width, height);
  flameLayer = createGraphics(width, height);
  
  
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  faceMesh.detectStart(video, gotFaces);
  triangles = faceMesh.getTriangles();
  
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 600; i++) {
    particles[i] = new Particle();
  }
  
}

function draw() {
  video.loadPixels();
  
  bgLayer.background(0);
  image(bgLayer, 0, 0);

  // flame(flameLayer);
  // image(flameLayer, 0, 0);
  
  if (faces.length > 0) {
    let face = faces[0];
    
    let sumX = 0, sumY = 0;
    for (let kp of face.keypoints) {
      sumX += kp.x;
      sumY += kp.y;
    }
    faceCenter = createVector(sumX / face.keypoints.length, sumY / face.keypoints.length);
    
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
      spreading = true;
      spreadRadius = maxD;
    }
    if (d < smile && spreading) {
      spreading = false;
    }
    
    
    // 根据蔓延状态更新 spreadRadius：
    if (spreading) {
      // 开启效果时，逐帧减少 spreadRadius，使得绿色区域逐渐扩展向内
      spreadRadius = max(spreadRadius - speed, 0);
    } else {
      // 关闭效果时，逐帧增加 spreadRadius，最多不超过 maxD，从而逐渐恢复原色
      spreadRadius = min(spreadRadius + speed, maxD);
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
    
    if(spreading){
    flame(flameLayer);
    image(flameLayer, 0, 0);
  }
    endShape();
  }
  
  //image(mirrorLayer,0,0);
}

function flame(pg) {
  pg.fill(0, 10);  // 10 为 alpha 值，根据需要调整
  pg.noStroke();
  pg.rect(0, 0, pg.width, pg.height);
  
  pg.push();
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * -PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      pg.stroke(0, 50);

    }
    yoff += inc;
    zoff += 0.0003;
  }
  
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show(pg);  // 注意：Particle 类的 show() 方法要支持传入绘图对象
  }
  pg.pop();
}

