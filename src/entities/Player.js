import Phaser from 'phaser';
import { PLAYER_COLOR, TILE } from '../constants.js';
import { WeaponQueue } from '../systems/WeaponQueue.js';

// The player, from public/data/player.json.
export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, def, weaponDefs) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.def = def;
    this.maxHealth = def.health;
    this.health = def.health;
    this.weapons = new WeaponQueue(weaponDefs, def.startingWeapons);
    this.nextShotAt = 0;
    this.invulnerableUntil = 0;

    // The 'player' texture is a 28px circle at (2, 2) with a gun nub sticking
    // out to the right; pivot on the circle's centre.
    this.setOrigin(16 / this.width, 0.5);
    this.setTint(PLAYER_COLOR);
    this.setCollideWorldBounds(true);
    this.body.setCircle(14, 2, 2);
  }

  move(keys) {
    const dir = new Phaser.Math.Vector2(
      (keys.D.isDown ? 1 : 0) - (keys.A.isDown ? 1 : 0),
      (keys.S.isDown ? 1 : 0) - (keys.W.isDown ? 1 : 0),
    ).normalize();
    this.body.velocity.copy(dir.scale(this.def.moveSpeed * TILE));
  }

  aimAt(x, y) {
    this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, x, y));
  }

  canFire(now) {
    return now >= this.nextShotAt;
  }

  // Uses a shot from the selected gun and returns that gun, so the caller can
  // spawn its projectiles. The fire cooldown is the player's, not per gun.
  fire(now) {
    const gun = this.weapons.current;
    this.nextShotAt = now + gun.def.fireCooldown * 1000;
    this.weapons.consume();
    return gun;
  }

  takeDamage(amount, now) {
    if (now < this.invulnerableUntil || this.health <= 0) return;
    this.health = Math.max(0, this.health - amount);
    this.invulnerableUntil = now + this.def.hitInvulnerability * 1000;
  }

  updateFlash(now) {
    const hurt = now < this.invulnerableUntil;
    this.setAlpha(hurt && Math.floor(now / 80) % 2 === 0 ? 0.35 : 1);
  }
}
