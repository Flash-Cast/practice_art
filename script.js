const frame = document.querySelector('.picture-frame');
const foreground = document.querySelector('.foreground');
const eyes = document.querySelectorAll('.eye');

frame.addEventListener('mousemove', (event) => {
  // 1. 空間全体のパララックス（揺れ）効果
  const rect = frame.getBoundingClientRect();
  const centerX = rect.left + (rect.width / 2);
  const centerY = rect.top + (rect.height / 2);
  const moveX = event.clientX - centerX;
  const moveY = event.clientY - centerY;
  foreground.style.transform = `translate(${moveX / 15}px, ${moveY / 15}px)`;

  // 2. それぞれの「黒目」をマウスの方向に向かせる
  eyes.forEach(eye => {
    const pupil = eye.querySelector('.pupil');
    const eyeRect = eye.getBoundingClientRect();
    
    // 眼の中心座標を計算
    const eyeCenterX = eyeRect.left + (eyeRect.width / 2);
    const eyeCenterY = eyeRect.top + (eyeRect.height / 2);

    // 眼から見たマウスの距離（XとY）
    const deltaX = event.clientX - eyeCenterX;
    const deltaY = event.clientY - eyeCenterY;

    // 数学の「アークタンジェント」を使って、マウスのある方向（角度）を計算
    const angle = Math.atan2(deltaY, deltaX);

    // 黒目が動ける最大距離（白目からはみ出さないように 12px に制限）
    const maxDistance = 12;
    
    // マウスが遠いほど黒目も大きく動くように計算
    const distance = Math.min(maxDistance, Math.hypot(deltaX, deltaY) / 10);

    // 角度と距離から、黒目の最終的な移動位置（XとY）を算出
    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;

    // 黒目を動かす
    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
  });
});

// マウスが外れたら、全部元の位置（中心）に戻す
frame.addEventListener('mouseleave', () => {
  foreground.style.transform = `translate(0px, 0px)`;
  eyes.forEach(eye => {
    const pupil = eye.querySelector('.pupil');
    pupil.style.transform = `translate(0px, 0px)`;
  });
});