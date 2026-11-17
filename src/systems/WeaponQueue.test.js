import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WeaponQueue } from './WeaponQueue.js';

const defs = {
  fire: { clipSize: 2 },
  ice: { clipSize: 3 },
  wind: { clipSize: 1 },
};
const ids = (q) => q.slots.map((s) => s.id);

test('starts with the first two weapons in hand', () => {
  const q = new WeaponQueue(defs, ['fire', 'ice', 'wind']);
  assert.equal(q.current.id, 'fire');
  assert.equal(q.other.id, 'ice');
  assert.deepEqual(q.waiting.map((s) => s.id), ['wind']);
});

test('SHIFT swaps the first and second weapons only', () => {
  const q = new WeaponQueue(defs, ['fire', 'ice', 'wind']);
  q.swap();
  assert.deepEqual(ids(q), ['ice', 'fire', 'wind']);
});

test('an empty gun is refilled and sent to the back', () => {
  const q = new WeaponQueue(defs, ['fire', 'ice', 'wind']);
  assert.equal(q.consume(), false);
  assert.equal(q.current.ammo, 1);
  assert.equal(q.consume(), true);
  // old second is selected, old third is the swap target
  assert.deepEqual(ids(q), ['ice', 'wind', 'fire']);
  assert.equal(q.slots[2].ammo, 2);
});

test('rejects unknown weapon ids', () => {
  assert.throws(() => new WeaponQueue(defs, ['fire', 'laser']), /laser/);
});
