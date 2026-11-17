import Phaser from 'phaser';
import { ELEMENT_COLORS, NEUTRAL_COLOR, TILE } from '../constants.js';

// A shot from a weapon. It carries the weapon's definition so a hit can
// apply damage, knockback and the debuff.
export class Projectile extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, weaponId, def) {
    super(scene, x, y, 'projectile');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.weaponId = weaponId;
    this.def = def;
    this.startX = x;
    this.startY = y;
    this.maxDistance = def.projectileDistance * TILE;
    this.setTint(ELEMENT_COLORS[def.element] ?? NEUTRAL_COLOR);
  }

  // Call after adding to a physics group: groups reset velocity on add.
  launch(angle) {
    this.travelAngle = angle;
    this.setRotation(angle);
    this.scene.physics.velocityFromRotation(angle, this.def.projectileSpeed * TILE, this.body.velocity);
  }

  outOfRange() {
    return Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y) >= this.maxDistance;
  }
}
