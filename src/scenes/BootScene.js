import Phaser from 'phaser';
import { TILE } from '../constants.js';

// Loads the data files and the map, and draws the placeholder shapes.
export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    for (const key of ['weapons', 'debuffs', 'enemies', 'player', 'waves']) {
      this.load.json(key, `data/${key}.json`);
    }
    this.load.tilemapTiledJSON('arena', 'maps/arena.tmj');
  }

  create() {
    // Shapes are drawn white so they can be tinted per element/enemy.
    const g = this.make.graphics({}, false);

    g.fillStyle(0xffffff).fillCircle(16, 16, 14).fillRect(26, 13, 14, 6);
    g.generateTexture('player', 40, 32);
    g.clear();

    g.fillStyle(0xffffff).fillRect(0, 0, 26, 26);
    g.generateTexture('enemy', 26, 26);
    g.clear();

    g.fillStyle(0xffffff).fillCircle(5, 5, 5);
    g.generateTexture('projectile', 10, 10);
    g.clear();

    g.fillStyle(0x1b1b22).fillRect(0, 0, TILE, TILE);
    g.fillStyle(0x24242e).fillRect(0, 0, TILE, 1).fillRect(0, 0, 1, TILE);
    g.generateTexture('floor', TILE, TILE);
    g.destroy();

    this.scene.start('game');
  }
}
