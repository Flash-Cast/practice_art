// 要素の取得
const frame = document.querySelector('.picture-frame');
const foreground = document.querySelector('.foreground');


// マウスが枠内で動くたびに処理を実行
frame.addEventListener('mousemove', (event) => {
  // 額縁の中心座標（X, Y）を計算
  const rect = frame.getBoundingClientRect();
  const centerX = rect.left + (rect.width / 2);
  const centerY = rect.top + (rect.height / 2);

  // マウスの位置が、中心からどれくらい離れているかを計算
  const moveX = event.clientX - centerX;
  const moveY = event.clientY - centerY;

  // 計算した距離をCSSに渡して動かす
  foreground.style.transform = `translate(${moveX / 5}px, ${moveY / 5}px)`;
});

// マウスが枠から外れたら、元の位置（中心）に戻す
frame.addEventListener('mouseleave', () => {
  foreground.style.transform = `translate(0px, 0px)`;
});

