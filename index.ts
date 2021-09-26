import './style.css';
import * as Phaser from 'phaser';
import { DUDE, PLATFORM } from './assets/assets';
var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var platforms;

var player;

var game = new Phaser.Game(config);

function preload() {
  var shardsImg = new Image();
  shardsImg.onload = () => {
    this.textures.addSpriteSheet('dude', shardsImg, {
      frameWidth: 32,
      frameHeight: 48,
    });
  };
  shardsImg.src = DUDE;
  this.textures.addBase64('ground', PLATFORM);

  this.load.image('sky', 'assets/sky.png');
  //this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
}

const onClick = () => {
  player.setVelocityX(160);

  player.anims.play('right', true);
};

function create() {
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
  player = this.physics.add.sprite(100, 450, 'dude');
  player.body.setGravityY(300);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  this.add.image(400, 300, 'sky');
  this.add.image(400, 300, 'star');
  this.add.image(40, 30, 'logo');
  this.add.image(60, 60, 'ground');

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
  this.physics.add.collider(player, platforms);
  this.input.on('pointerdown', onClick);
}

function update() {}
