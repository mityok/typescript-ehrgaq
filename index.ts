import './style.css';
import * as Phaser from 'phaser';
import { DUDE, PLATFORM } from './assets/assets';

//https://phaser.io/tutorials/making-your-first-phaser-3-game/part10
//https://github.com/alexzimakov/phaser-hello-world/blob/master/src/master.js

//https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
//https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
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

var score = 0;
var scoreText;

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

}

const onClick = () => {
  if (player.body.touching.down) {
    player.setVelocityY(-530);
  }
  //player.setVelocityX(160);

  //player.anims.play('right', true);
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

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(50, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
  this.physics.add.collider(player, platforms);
  this.input.on('pointerdown', onClick);
  player.anims.play('right', true);
  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#555',
  });
  player.setVelocityX(30);
  this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
        this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);
  this.cameras.main.startFollow(player, true, 0.05, 0.05);
  this.cameras.main.followOffset.set(-100, 0);

}

function update() {}
