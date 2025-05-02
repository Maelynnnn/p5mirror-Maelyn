// 全局变量定义
const serial = new p5.WebSerial();
let portButton;

let teacher_bg, teacher;
let boss_bg, boss;
let judge_bg, judge;
let draw_teacher = false, draw_boss = false, draw_judge = false;
let teacherStartTime = 0, bossStartTime = 0, judgeStartTime = 0;

let s4i3_teacher, s4i3_boss, s4i3_judge;
let bgm;

const time      = 2000;
const wait_time =  500;

let last_s4_1 = 0,
    last_s4_2 = 0,
    last_s4_3 = 0;

function preload() {
  teacher_bg = loadImage("teacher_bg.png");
  teacher    = loadImage("teacher.png");
  boss_bg    = loadImage("boss_bg.png");
  boss       = loadImage("boss.png");
  judge_bg   = loadImage("judge_bg.png");
  judge      = loadImage("judge.png");

  s4i3_teacher = loadSound("s4i3_teacher.mp3");
  s4i3_boss    = loadSound("s4i3_boss.mp3");
  s4i3_judge   = loadSound("s4i3_judge.mp3");
  bgm          = loadSound("bgm.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CORNER);

  // 播放背景音乐
  if (!bgm.isPlaying()) {
    bgm.setVolume(0.5);
    bgm.loop();
  }

  if (!navigator.serial) {
    noLoop();
    return;
  }

  navigator.serial.addEventListener("connect",    () => serial.getPorts());
  navigator.serial.addEventListener("disconnect", () => serial.close());
  serial.getPorts();

  serial.on("noport",        makePortButton);
  serial.on("portavailable", openPort);
  serial.on("requesterror",  err => alert("串口错误: " + err));
  serial.on("data",          serialEvent);
}

function draw() {
  background(0);

  if (draw_teacher) {
    image(teacher_bg, 0, 0, width, height);
    let elapsed = millis() - teacherStartTime;
    if (elapsed > wait_time) {
      let alpha = constrain(map(elapsed, wait_time, time, 0, 255), 0, 255);
      push();
        tint(255, alpha);
        image(
          teacher,
          width / 1.5 - teacher.width / 2,
          height / 4.1,
          teacher.width,
          teacher.height
        );
      pop();
    }
  }

  if (draw_boss) {
    image(boss_bg, 0, 0, width, height);
    let elapsed = millis() - bossStartTime;
    if (elapsed > wait_time) {
      let alpha = constrain(map(elapsed, wait_time, time, 0, 255), 0, 255);
      push();
        tint(255, alpha);
        image(
          boss,
          width * 0.8 - boss.width / 2,
          height / 2.3,
          boss.width,
          boss.height
        );
      pop();
    }
  }

  if (draw_judge) {
    image(judge_bg, 0, 0, width, height);
    let elapsed = millis() - judgeStartTime;
    if (elapsed > wait_time) {
      let alpha = constrain(map(elapsed, wait_time, time, 0, 255), 0, 255);
      push();
        tint(255, alpha);
        image(
          judge,
          width / 2 - judge.width / 2,
          height / 2.1,
          judge.width,
          judge.height
        );
      pop();
    }
  }
}

function makePortButton() {
  portButton = createButton("choose port");
  portButton.position(10, 10);
  portButton.mousePressed(() => serial.requestPort());
}

function openPort() {
  serial.open().then(() => {
    console.log("port open");
    if (portButton) portButton.hide();
  });
}

function serialEvent() {
  let inString = serial.readLine().trim();
  if (!inString) return;

  if (inString.startsWith("s4_1:")) {
    let v = int(inString.split(":"[1]));
    if (v === 1 && last_s4_1 === 0) {
      draw_teacher     = true;
      teacherStartTime = millis();
      if (!s4i3_teacher.isPlaying()) {
        s4i3_teacher.play();
        s4i3_teacher.onended(() => {
          window.location.href = "../vd8/vd8.html";
        });
      }
    }
    last_s4_1 = v;
  }
  else if (inString.startsWith("s4_2:")) {
    let v = int(inString.split(":")[1]);
    if (v === 1 && last_s4_2 === 0) {
      draw_boss     = true;
      bossStartTime = millis();
      if (!s4i3_boss.isPlaying()) {
        s4i3_boss.play();
        s4i3_boss.onended(() => {
          window.location.href = "../vd8/vd8.html";
        });
      }
    }
    last_s4_2 = v;
  }
  else if (inString.startsWith("s4_3:")) {
    let v = int(inString.split(":"[1]));
    if (v === 1 && last_s4_3 === 0) {
      draw_judge     = true;
      judgeStartTime = millis();
      if (!s4i3_judge.isPlaying()) {
        s4i3_judge.play();
        s4i3_judge.onended(() => {
          window.location.href = "../vd8/vd8.html";
        });
      }
    }
    last_s4_3 = v;
  }
}
