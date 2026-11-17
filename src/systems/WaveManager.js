import Phaser from 'phaser';
import { SPAWN_MIN_DISTANCE, TILE } from '../constants.js';

// Runs the waves in public/data/waves.json, in file order.
// A wave is cleared when everything it spawned is dead. Clearing the last
// wave wins the game.
export class WaveManager {
  constructor(wavesData, spawnPoints, spawnEnemy) {
    this.waves = Object.entries(wavesData).map(([id, wave]) => ({ id, ...wave }));
    this.spawnPoints = spawnPoints;
    this.spawnEnemy = spawnEnemy;
    this.index = -1;
    this.state = 'idle'; // idle | waiting | spawning | fighting | won
    this.pending = [];
    this.timer = 0;
  }

  get current() {
    return this.waves[this.index];
  }

  get next() {
    return this.waves[this.index + 1];
  }

  start() {
    this.queueWave(0);
  }

  queueWave(index) {
    this.index = index;
    this.state = 'waiting';
    this.timer = this.current.delayBefore;
  }

  update(dt, aliveCount, playerPos) {
    if (this.state === 'waiting') {
      this.timer -= dt;
      if (this.timer > 0) return;
      this.pending = Phaser.Utils.Array.Shuffle(
        Object.entries(this.current.enemies).flatMap(([id, count]) => Array(count).fill(id)),
      );
      this.state = 'spawning';
      this.timer = 0;
    }

    if (this.state === 'spawning') {
      this.timer -= dt;
      while (this.timer <= 0 && this.pending.length) {
        const point = this.pickSpawnPoint(playerPos);
        this.spawnEnemy(this.pending.pop(), point.x, point.y);
        this.timer += this.current.spawnInterval;
      }
      if (!this.pending.length) this.state = 'fighting';
      return;
    }

    if (this.state === 'fighting' && aliveCount === 0) {
      if (this.next) this.queueWave(this.index + 1);
      else this.state = 'won';
    }
  }

  pickSpawnPoint(playerPos) {
    const far = this.spawnPoints.filter(
      (p) => Phaser.Math.Distance.Between(p.x, p.y, playerPos.x, playerPos.y) >= SPAWN_MIN_DISTANCE * TILE,
    );
    return Phaser.Utils.Array.GetRandom(far.length ? far : this.spawnPoints);
  }
}
