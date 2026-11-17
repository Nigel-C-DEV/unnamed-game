import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants.js';

// Win / game over overlay. Click or press R to play again.
export class EndScene extends Phaser.Scene {
  constructor() {
    super('end');
  }

  create({ won, wave, total }) {
    this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.6).setOrigin(0);
    const style = { fontFamily: 'monospace', color: '#e8e8f0', align: 'center' };
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, won ? 'You survived!' : 'Game over', { ...style, fontSize: '48px' })
      .setOrigin(0.5);
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20, won ? `All ${total} waves cleared` : `Fell on wave ${wave}/${total}`, { ...style, fontSize: '18px' })
      .setOrigin(0.5);
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 60, 'Click or press R to play again', { ...style, fontSize: '14px', color: '#9a9ab0' })
      .setOrigin(0.5);

    const restart = () => {
      this.scene.stop('hud');
      this.scene.get('game').scene.restart();
      this.scene.stop();
    };
    // On release, so the restarting click doesn't also fire a shot.
    this.input.once('pointerup', restart);
    this.input.keyboard.once('keydown-R', restart);
  }
}
