// 全局变量定义
const serial = new p5.WebSerial();
let portButton;
let inData;                   // 用于存储串口接收数据
let outByte = 0;

let player;         // 玩家对象，用圆表示
let obstacles = []; // 障碍物数组，每个元素为 { x, y, w, h }，y 为世界坐标
let house;          // 终点处的小房子对象 { x, y, w, h }
let offset;         // 全局偏移量，表示场景向下移动的距离
let gameSpeed;      // 每帧增加的 offset，决定前进速度
let endpoint;       // 当 offset 达到该值时，终点（小房子）有效 y 坐标与玩家重合
let gameState;      // 游戏状态："playing"、"countdown" 或 "win"
let countdownTime;  // 倒计时时长（秒）
let countdownStart; // 记录进入倒计时的时间
let book;
let hand;
let home;
let road;
let book_control_pos = 0;  // 从 Arduino 接收的 pot 值（0～1023）
let s4i2_potValue;        // 此变量说明 Arduino 数据中的 pot 部分
let prev_book_control_pos = 0;  // 用于检测变化幅度

function preload(){
  book = loadImage("book.png");
  hand = loadImage("hand.png");
  home = loadImage("home.png");
  road = loadImage("road.png"); // 加载背景图
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 使图片以中心或左上角为锚点按需绘制
  imageMode(CENTER);
  textFont("Schoolbell");
  
  // 玩家固定在屏幕下方（例如 y = height - 100）
  player = {
    x: width / 2,
    y: height - 100,
    r: 20  // 半径 20（直径 40）
  };
  
  offset = 0;
  gameSpeed = 5;
  // 设定前进 endpoint 像素后视为到达终点
  endpoint = 3000;
  
  // 游戏初始状态
  gameState = "playing";
  countdownTime = 3;
  
  // 终点小房子：设置在世界坐标中，使得当 offset = endpoint 时，
  // 小房子的有效 y 坐标 (house.y + offset) 正好与玩家 y 重合
  house = {
    x: width / 2 - 40, 
    y: player.y - endpoint,   // 例如 500 - 3000 = -2500
    w: 80,
    h: 80
  };
  
  // 初始化障碍物：要求所有障碍物在初始时都位于玩家上方，
  // 这里将障碍物的 y 值随机设置在 [house.y, player.y - windowHeight] 范围内，
  // 保证它们从上方向下“落入”画面
  obstacles = [];
  let numObs = 20;
  for (let i = 0; i < numObs; i++) {
    let obs = {
      x: random(0, width - 50),
      y: random(house.y, player.y - windowHeight),
      w: 50,
      h: 50
    };
    obstacles.push(obs);
  }
  
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // 如果串口可用，添加连接/断开监听
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
  // 检查已有可用端口
  serial.getPorts();
  // 如果没有选中端口，显示选择按钮
  serial.on("noport", makePortButton);
  // 有端口时自动打开
  serial.on("portavailable", openPort);
  // 处理串口错误：
  serial.on("requesterror", portError);
  // 处理串口输入数据：
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
}

function draw() {
  // 绘制循环背景（纵向滚动）
  imageMode(CORNER); // 以左上角为锚点绘制背景
  let bgY = offset % height;
  image(road, 0, bgY - height, width, height);
  image(road, 0, bgY, width, height);
  
  // 如果游戏处于进行中，更新全局 offset
  if (gameState === "playing") {
    offset += gameSpeed;
  }
  
  // 绘制“世界”：障碍物和小房子随场景一起向下移动
  push();
    translate(0, offset); 
    noStroke();
    imageMode(CENTER);
  
  // 绘制终点小房子（这里适当横向偏移）
    image(home, house.x - 100, house.y);
  // 绘制障碍物（用手的图片表示）
    for (let obs of obstacles) {
      image(hand, obs.x, obs.y);
    }
  pop();
  
  // 绘制玩家：固定在屏幕下方，用书的图片表示；
  // 玩家横向位置由 book_control_pos 控制，通过滑动变阻器获得（0～1023）→映射到屏幕宽度
  player.x = map(book_control_pos, 0, 1023, windowWidth, 0);
  push();
    imageMode(CENTER);
    image(book, player.x, player.y);
  pop();
  
  // 如果处于"playing"状态，进行碰撞检测
  if (gameState === "playing") {
    // 1. 检测与障碍物碰撞
    for (let obs of obstacles) {
      let ox = obs.x;
      let oy = obs.y + offset;
      if (player.x + player.r > ox &&
          player.x - player.r < ox + obs.w &&
          player.y + player.r > oy &&
          player.y - player.r < oy + obs.h) {
        gameState = "countdown";
        countdownStart = millis();
        break;
      }
    }
    
    // 2. 检测与小房子碰撞（扩展判定区域）
    let margin = 200; // 扩充判定区域的边界
    let hx = house.x - margin;
    let hy = house.y + offset - margin;
    let hw = house.w + margin * 2;
    let hh = house.h + margin;
    if (player.x + player.r > hx &&
        player.x - player.r < hx + hw &&
        player.y + player.r > hy &&
        player.y - player.r < hy + hh) {
      gameState = "win";
    }
    
    // 3. 如果超过了终点线但没有碰到小房子，则也算失败
    if ((house.y + offset) > player.y) {
      gameState = "win";
      countdownStart = millis();
    }
  }
  
  // 倒计时状态：显示倒计时文本，倒计时结束后重置游戏
  if (gameState === "countdown") {
    let elapsed = (millis() - countdownStart) / 1000;
    let timeLeft = max(0, countdownTime - floor(elapsed));
    push();
      textSize(50);
      fill(0);
      textAlign(CENTER, CENTER);
      text("Oops！Restart in " + timeLeft + "s", width / 2, height / 2);
    pop();
    if (elapsed >= countdownTime) {
      resetGame();
    }
  }
  
  // 胜利状态：显示“Got Home!”提示
  if (gameState === "win") {
    push();
      textSize(50);
      fill(0);
      textAlign(CENTER, CENTER);
      text("Got Home!", width / 2, height / 2);
    pop();
  }
}

function resetGame() {
  gameState = "playing";
  offset = 0;
  let numObs = 15;
  obstacles = [];
  for (let i = 0; i < numObs; i++) {
    let obs = {
      x: random(0, width - 50),
      y: random(house.y, player.y - 100),
      w: 50,
      h: 50
    };
    obstacles.push(obs);
  }
  house = {
    x: width / 2 - 40,
    y: player.y - endpoint,
    w: 80,
    h: 80
  };
}

function makePortButton() {
  portButton = createButton("choose port");
  portButton.position(10, 10);
  portButton.mousePressed(choosePort);
}
 
function choosePort() {
  if (portButton) portButton.show();
  serial.requestPort();
}
 
function openPort() {
  serial.open().then(initiateSerial);
  function initiateSerial() {
    console.log("port open");
  }
}
 
function portError(err) {
  alert("Serial port error: " + err);
}
 
// 串口数据事件处理：读取一行数据后，先剔除所有非数字字符，再尝试转换为数字；只有当变化超过 5 时更新
function serialEvent() {
  let inString = serial.readLine();
  if (inString) {
    inString = inString.trim(); // 去掉前后空格或换行

    if (inString.startsWith("POT:")) {
      // 提取 POT: 后面的数字
      let valueStr = inString.substring(4).replace(/[^\d]/g, "");
      if (valueStr.length > 0) {
        let newVal = Number(valueStr);
        if (newVal >= 0 && newVal <= 1023) {
          if (abs(newVal - prev_book_control_pos) > 20) {
            book_control_pos = newVal;
            prev_book_control_pos = newVal;
            // console.log("POT value: " + newVal);
          }
        }
      }
    }
  }
}

 
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}
 
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}
 
function closePort() {
  serial.close();
}
