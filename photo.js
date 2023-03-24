const { createCanvas } = require('canvas');
const fs = require('fs');

const canvas = createCanvas(256, 256);
const ctx = canvas.getContext('2d');

// 随机生成像素颜色
function randomColor() {
  return Math.floor(Math.random() * 256);
}

// 生成像素头像
function generatePixelAvatar() {
  // 绘制背景色
  ctx.fillStyle = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 绘制像素点
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);
    ctx.fillRect(x, y, 1, 1);
  }

  // 将生成的头像保存为文件
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('pixel-avatar.png', buffer);
}

generatePixelAvatar();
