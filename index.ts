import {
  BackgroundColor,
  GlobalVar,
  Parent,
  Scenes,
  WebGL,
} from '@phaserjs/phaser/config';

import { AddChild } from '@phaserjs/phaser/display/';

import { Between } from '@phaserjs/phaser/math';

import { CreateGame } from '@phaserjs/phaser/CreateGame';

import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';

import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { Sprite } from '@phaserjs/phaser/gameobjects/';
import { StaticWorld } from '@phaserjs/phaser/world/StaticWorld';

class Demo extends Scene {
  constructor() {
    super();

    this.preload();
  }

  async preload() {
    await ImageFile('logo', 'assets/logo.png');

    const world = new StaticWorld(this);

    const x = Between(200, 600);
    const y = Between(100, 300);

    const logo = new Sprite(x, y, 'logo');

    AddChild(world, logo);
  }
}
console.log(CreateGame);
/*
CreateGame(
  WebGL(),
  Parent('gameParent'),
  GlobalVar('Phaser4'),
  BackgroundColor(0x2d2d2d),
  Scenes(Demo)
);

*/
