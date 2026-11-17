import Phaser from 'phaser';
import { SPREAD_DEGREES } from '../constants.js';
import { Enemy } from '../entities/Enemy.js';
import { Player } from '../entities/Player.js';
import { Projectile } from '../entities/Projectile.js';
import { WaveManager } from '../systems/WaveManager.js';

// Tiled 1.9 wrote an object's class as "class"; 1.10+ writes it as "type".
const classOf = (obj) => obj.type || obj.class;

export class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  create() {
    const cache = this.cache.json;
    this.defs = {
      weapons: cache.get('weapons'),
      debuffs: cache.get('debuffs'),
      enemies: cache.get('enemies'),
      player: cache.get('player').player,
      waves: cache.get('waves'),
    };
    this.over = false;

    const map = this.make.tilemap({ key: 'arena' });
    const { widthInPixels: w, heightInPixels: h } = map;
    this.physics.world.setBounds(0, 0, w, h);
    this.add.tileSprite(0, 0, w, h, 'floor').setOrigin(0);

    const objects = map.getObjectLayer('spawns')?.objects ?? [];
    const playerSpawn = objects.find((o) => classOf(o) === 'playerSpawn') ?? { x: w / 2, y: h / 2 };
    const enemySpawns = objects.filter((o) => classOf(o) === 'enemySpawn');
    if (!enemySpawns.length) throw new Error('Map has no enemySpawn objects');

    this.enemies = this.physics.add.group();
    this.projectiles = this.physics.add.group();
    this.player = new Player(this, playerSpawn.x, playerSpawn.y, this.defs.player, this.defs.weapons);

    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.overlap(this.projectiles, this.enemies, this.onProjectileHit, null, this);
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      player.takeDamage(enemy.def.damage, this.time.now);
    });

    this.cameras.main.setBounds(0, 0, w, h).startFollow(this.player, true, 0.15, 0.15);

    this.keys = this.input.keyboard.addKeys('W,A,S,D');
    this.input.keyboard.on('keydown-SHIFT', () => this.player.weapons.swap());
    this.input.mouse.disableContextMenu();
    // A quick click can start and end between two frames; remember it so it
    // still fires.
    this.clicked = false;
    this.input.on('pointerdown', (pointer) => {
      if (pointer.leftButtonDown()) this.clicked = true;
    });

    this.waves = new WaveManager(this.defs.waves, enemySpawns, (id, x, y) => this.spawnEnemy(id, x, y));
    this.waves.start();

    this.scene.launch('hud');
  }

  spawnEnemy(id, x, y) {
    const def = this.defs.enemies[id];
    if (!def) throw new Error(`Unknown enemy "${id}" in waves.json`);
    this.enemies.add(new Enemy(this, x, y, id, def));
  }

  fire(now) {
    const gun = this.player.fire(now);
    const count = Math.max(1, gun.def.projectiles ?? 1);
    const spread = count > 1 ? Phaser.Math.DegToRad(SPREAD_DEGREES) : 0;
    for (let i = 0; i < count; i++) {
      const offset = count > 1 ? -spread / 2 + (spread * i) / (count - 1) : 0;
      const angle = this.player.rotation + offset;
      const x = this.player.x + Math.cos(angle) * 22;
      const y = this.player.y + Math.sin(angle) * 22;
      const shot = new Projectile(this, x, y, gun.id, gun.def);
      this.projectiles.add(shot);
      shot.launch(angle);
    }
  }

  onProjectileHit(shot, enemy) {
    if (!shot.active || !enemy.active) return;
    const now = this.time.now;
    const { def } = shot;
    enemy.knockBack(shot.travelAngle, def.knockBack, now);
    if (def.debuff) enemy.applyDebuff(def.debuff, this.defs.debuffs[def.debuff], now);
    enemy.takeDamage(def.damage);
    shot.destroy();
  }

  update(time, delta) {
    if (this.over) return;
    const pointer = this.input.activePointer;
    const aim = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

    this.player.move(this.keys);
    this.player.aimAt(aim.x, aim.y);
    this.player.updateFlash(time);
    if ((pointer.leftButtonDown() || this.clicked) && this.player.canFire(time)) this.fire(time);
    this.clicked = false;

    for (const enemy of [...this.enemies.getChildren()]) enemy.tick(time, this.player);
    for (const shot of [...this.projectiles.getChildren()]) {
      if (shot.outOfRange()) shot.destroy();
    }

    this.waves.update(delta / 1000, this.enemies.countActive(true), this.player);

    if (this.player.health <= 0) this.end(false);
    else if (this.waves.state === 'won') this.end(true);
  }

  end(won) {
    this.over = true;
    this.physics.pause();
    this.player.setAlpha(1);
    this.scene.launch('end', { won, wave: this.waves.index + 1, total: this.waves.waves.length });
  }
}
