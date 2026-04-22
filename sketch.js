let stars = [];
let speed;

function setup() {
  // 画面いっぱいにキャンバスを作成
  createCanvas(windowWidth, windowHeight);
  
  // 800個の星を作成
  for (let i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  // 宇宙の奥行きを出すため、少しだけ透明な黒を重ねて軌跡を残す
  background(0, 0, 0, 50); 
  
  // マウスのX座標でスピードを変化させる
  speed = map(mouseY, 0, width, 0, 50);

  // キャンバスの中心を原点にする
  translate(width / 2, height / 2);

  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

// 星を管理するクラス
class Star {
  constructor() {
    // 画面内のランダムな位置（X, Y）と奥行き（Z）を設定
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z; // 前のフレームのZ座標を保存
  }

  update() {
    // Z座標（奥行き）を手前に移動させる
    this.z = this.z - speed;
    
    // 画面を通り過ぎたら奥に戻す
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  }

  show() {
    fill(random(100, 255), random(100, 255), random(100, 255));
    noStroke();

    // 3D的な投影計算：Zが小さくなるほど中心から離れ、大きく表示される
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    // 星の大きさも奥行きに応じて変化
    let r = map(this.z, 0, width, 8, 0);
    ellipse(sx, sy, r, r);

    // 前のフレームの位置と繋いで「光の筋」を作る
    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);
    this.pz = this.z;

    stroke(255, 150); // 少し透明な白
    line(px, py, sx, sy);
  }
}

// ウィンドウサイズが変わった時に調整
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}