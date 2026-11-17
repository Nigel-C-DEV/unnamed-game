// Behaviour for each debuff id in public/data/debuffs.json. The numbers come
// from the data; this file only says what a debuff does with them.
// Re-applying a debuff refreshes it (no stacking).
export const DEBUFFS = {
  burn: {
    tint: 0xff7a1a,
    duration: (def) => def.burnTimer,
    start(state, def, now) {
      state.nextTickAt = now + def.tickRate * 1000;
    },
    update(enemy, state, def, now) {
      while (enemy.active && state.nextTickAt <= Math.min(now, state.endsAt)) {
        enemy.takeDamage(def.burnDamage);
        state.nextTickAt += def.tickRate * 1000;
      }
    },
  },
  chill: {
    tint: 0x7fd8ff,
    duration: (def) => def.chillTimer,
    speedMultiplier: (def) => 1 - def.chillSlow,
  },
};
