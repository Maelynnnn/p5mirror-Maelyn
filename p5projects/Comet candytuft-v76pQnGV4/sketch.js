// 从 CDN 导入 YOHA 的 ES 模块版本
import YOHA from 'https://unpkg.com/@handtracking.io/yoha/dist/yoha.esm.js';

let yoha;       // YOHA 实例
let video;      // p5.js 视频捕捉对象
let hands = []; // 存储检测到的手部数据

function setup() {
  createCanvas(640, 480);
  
  // 创建视频捕捉（使用 p5.js）
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  
  // 初始化 YOHA，将 video.elt（底层 HTMLVideoElement）作为输入
  yoha = new YOHA({
    video: video.elt,
    maxHands: 2, // 可选参数，设置最多检测的手数
    // 你还可以根据需要传入其他配置选项
  });
  
  // 注册检测结果回调
  yoha.onResults(results => {
    hands = results.hands || [];
    console.log("检测到手部数据：", hands);
  });
  
  // 启动 YOHA 检测
  yoha.start().then(() => {
    console.log("YOHA 检测启动成功");
  }).catch(e => {
    console.error("YOHA 检测启动失败：", e);
  });
}

function draw() {
  background(220);
  // 绘制视频画面
  image(video, 0, 0, width, height);
  
  console.log("hh");
  
  // 绘制检测到的手部关键点
  for (let hand of hands) {
    // 假设每只手有一个 keypoints 数组，包含每个关键点的 x, y 坐标
    for (let point of hand.keypoints) {
      fill(255, 0, 0);
      noStroke();
      ellipse(point.x, point.y, 10, 10);
    }
  }
}
