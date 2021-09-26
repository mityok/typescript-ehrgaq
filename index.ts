// Import stylesheets
import './style.css';

import NoSleep from 'nosleep.js';
import { PRINCESS, TILE_BASE } from './assets/assets';

var noSleep = new NoSleep();

// Write TypeScript code!
const app: HTMLCanvasElement = document.querySelector('canvas');
const dpx = window.devicePixelRatio;
app.width = window.innerWidth * dpx;
app.height = window.innerHeight * dpx;
const ctx = app.getContext('2d');
ctx.imageSmoothingEnabled = false;
ctx.fillStyle = 'rgba(255,0,0,1)';
ctx.fillRect(0, 0, app.width, app.height);
ctx.fillStyle = 'rgba(135,206,250,1)';
const BORDER = 2;
ctx.fillRect(BORDER, BORDER, app.width - BORDER * 2, app.height - BORDER * 2);
ctx.fillStyle = 'rgba(250,250,250,1)';
ctx.font = '22px Arial';
ctx.fillText(
  'Hello world ' + app.width + 'X' + app.height + ' ' + window.devicePixelRatio,
  10,
  25
);

const image2 = new Image();

image2.onload = () => {
  const w = image2.width * 3;
  for (let i = 0; i < 12; i++) {
    ctx.drawImage(image2, w * i, 160, w, image2.height * 3);
  }
};
image2.src = TILE_BASE;

const image = new Image();

image.onload = () => {
  ctx.drawImage(image, 0, 50, image.width * 4, image.height * 4);
};
image.src = PRINCESS;

const init = () => {
  // ctx.fillRect(Math.random() * 500, 0, 10, 10);
  //ctx.fillStyle = 'rgba(0,250,0,1)';
  requestAnimationFrame(init);
};
init();
document.addEventListener(
  'click',
  function enableNoSleep() {
    document.removeEventListener('click', enableNoSleep, false);
    noSleep.enable();
    ctx.fillText('act', 10, 45);
  },
  false
);
