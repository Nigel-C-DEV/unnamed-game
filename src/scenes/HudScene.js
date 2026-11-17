import Phaser from 'phaser';
import { ELEMENT_COLORS, GAME_WIDTH, GAME_HEIGHT, NEUTRAL_COLOR } from '../constants.js';

const describeWave = (wave) =>
  wave ? Object.entries(wave.enemies).map(([id, n]) => `${id} ×${n}`).join(', ') : '—';

const SLOT_W = 170;
const SLOT_H = 58;

// Health, wave preview and the gun queue. Reads the game scene every frame.
export class HudScene extends Phaser.Scene {
  constructor() {
    super('hud');
  }

  create() {
    this.gameScene = this.scene.get('game');
    const text = (x, y, size, origin = 0) =>
      this.add.text(x, y, '', { fontFamily: 'monospace', fontSize: size, color: '#e8e8f0' }).setOrigin(origin, 0);

    this.gfx = this.add.graphics();
    this.healthText = text(28, 22, '14px');
    this.waveTitle = text(GAME_WIDTH / 2, 14, '22px', 0.5);
    this.waveNow = text(GAME_WIDTH / 2, 44, '14px', 0.5);
    this.waveNext = text(GAME_WIDTH / 2, 64, '14px', 0.5).setColor('#9a9ab0');

    const slotY = GAME_HEIGHT - SLOT_H - 24;
    this.slots = [-1, 1].map((side) => {
      const x = GAME_WIDTH / 2 + side * (SLOT_W / 2 + 10) - SLOT_W / 2;
      return { x, y: slotY, name: text(x + 52, slotY + 10, '16px'), ammo: text(x + 52, slotY + 32, '14px') };
    });
    this.add.text(GAME_WIDTH / 2, slotY - 22, 'SHIFT ⇄', { fontFamily: 'monospace', fontSize: '12px', color: '#9a9ab0' }).setOrigin(0.5, 0);
    this.queueLabel = text(GAME_WIDTH / 2 + SLOT_W + 30, slotY + 4, '12px').setColor('#9a9ab0').setText('up next');
  }

  update() {
    const { player, waves } = this.gameScene;
    if (!player) return;
    const g = this.gfx.clear();

    // Health
    const hp = player.health / player.maxHealth;
    g.fillStyle(0x000000, 0.5).fillRect(20, 18, 248, 26);
    g.fillStyle(0xd04648).fillRect(24, 22, 240 * hp, 18);
    this.healthText.setText(`HP ${Math.ceil(player.health)}/${player.maxHealth}`);

    // Waves
    const total = waves.waves.length;
    const wave = waves.current;
    if (waves.state === 'waiting') {
      this.waveTitle.setText(`Wave ${waves.index + 1}/${total} in ${Math.ceil(waves.timer)}…`);
    } else {
      const left = waves.pending.length + this.gameScene.enemies.countActive(true);
      this.waveTitle.setText(`Wave ${waves.index + 1}/${total}  ·  ${left} left`);
    }
    this.waveNow.setText(`now: ${describeWave(wave)}`);
    this.waveNext.setText(`next: ${describeWave(waves.next)}`);

    // Guns: the two in hand, then the rest of the queue
    const { weapons } = player;
    [weapons.current, weapons.other].forEach((gun, i) => this.drawSlot(g, this.slots[i], gun, i === 0));
    weapons.waiting.forEach((gun, i) => {
      g.fillStyle(ELEMENT_COLORS[gun.def.element] ?? NEUTRAL_COLOR).fillRect(this.queueLabel.x + i * 22, this.queueLabel.y + 20, 16, 16);
    });
  }

  drawSlot(g, slot, gun, selected) {
    if (!gun) {
      slot.name.setText('');
      slot.ammo.setText('');
      return;
    }
    const color = ELEMENT_COLORS[gun.def.element] ?? NEUTRAL_COLOR;
    g.fillStyle(0x000000, selected ? 0.75 : 0.45).fillRect(slot.x, slot.y, SLOT_W, SLOT_H);
    g.lineStyle(selected ? 3 : 1, selected ? 0xffffff : 0x55556a).strokeRect(slot.x, slot.y, SLOT_W, SLOT_H);
    g.fillStyle(color).fillRect(slot.x + 10, slot.y + 11, 34, 34);
    g.fillStyle(0x33334a).fillRect(slot.x + 52, slot.y + 50, SLOT_W - 62, 4);
    g.fillStyle(color).fillRect(slot.x + 52, slot.y + 50, (SLOT_W - 62) * (gun.ammo / gun.def.clipSize), 4);
    slot.name.setText(gun.id).setAlpha(selected ? 1 : 0.6);
    slot.ammo.setText(`${gun.ammo}/${gun.def.clipSize}`).setAlpha(selected ? 1 : 0.6);
  }
}
