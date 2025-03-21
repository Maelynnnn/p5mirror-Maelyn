let startX = 300; // 起点 x 坐标
let startY = 100; // 起点 y 坐标
let radius = 50; // 半圆半径
let angle = 0; // 初始角度
let speed = 0.05; // 半圆运动速度

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);

  endX = 300 + cos(angle) * radius;
  endY = 100 + 100 + sin(angle) * radius;
  line(startX, startY, endX, endY);
  angle += speed;
  if (angle >= PI || angle <= 0) {
    speed *= -1;
  }
}