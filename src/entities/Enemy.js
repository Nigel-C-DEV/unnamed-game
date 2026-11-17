import Phaser from 'phaser';
import { ENEMY_COLORS, KNOCKBACK_TIME, NEUTRAL_COLOR, TILE } from '../constants.js';
import { DEBUFFS } from '../systems/debuffs.js';

// An instance of an entry in public/data/enemies.json.
export class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, id, def) {
    super(scene, x, y, 'enemy');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.enemyId = id;
    this.def = def;
    this.health = def.health;
    this.baseColor = ENEMY_COLORS[id] ?? NEUTRAL_COLOR;
    this.debuffs = new Map();
    this.knockbackUntil = 0;
    this.flashUntil = 0;

    this.body.setCircle(this.width / 2);
    this.setTint(this.baseColor);
  }

  takeDamage(amount) {
    if (!this.active) return;
    this.health -= amount;
    this.flashUntil = this.scene.time.now + 60;
    if (this.health <= 0) this.destroy();
  }

  knockBack(angle, distance, now) {
    if (!distance) return;
    this.knockbackUntil = now + KNOCKBACK_TIME * 1000;
    this.scene.physics.velocityFromRotation(angle, (distance * TILE) / KNOCKBACK_TIME, this.body.velocity);
  }

  applyDebuff(id, def, now) {
    const effect = DEBUFFS[id];
    if (!effect) {
      console.warn(`No behaviour for debuff "${id}" (see src/systems/debuffs.js)`);
      return;
    }
    const state = { id, def, endsAt: now + effect.duration(def) * 1000 };
    effect.start?.(state, def, now);
    this.debuffs.set(id, state);
  }

  tick(now, target) {
    let speedMultiplier = 1;
    let tint = this.baseColor;
    for (const [id, state] of this.debuffs) {
      const effect = DEBUFFS[id];
      effect.update?.(this, state, state.def, now);
      if (!this.active) return;
      if (now >= state.endsAt) {
        this.debuffs.delete(id);
        continue;
      }
      if (effect.speedMultiplier) speedMultiplier *= effect.speedMultiplier(state.def);
      tint = effect.tint;
    }

    if (now < this.flashUntil) {
      this.setTint(0xffffff).setTintMode(Phaser.TintModes.FILL);
    } else {
      this.setTint(tint).setTintMode(Phaser.TintModes.MULTIPLY);
    }

    if (now < this.knockbackUntil) return;
    const angle = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
    this.scene.physics.velocityFromRotation(angle, this.def.moveSpeed * TILE * speedMultiplier, this.body.velocity);
  }
}
