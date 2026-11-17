// The gun cycle from documentation/weapons/weapons.md ("Weapon rotation").
// slots[0] is the selected gun, slots[1] is the one SHIFT swaps to,
// everything after that is waiting its turn.
export class WeaponQueue {
  constructor(weaponDefs, startingIds) {
    this.slots = startingIds.map((id) => {
      const def = weaponDefs[id];
      if (!def) throw new Error(`Unknown weapon "${id}" in startingWeapons`);
      return { id, def, ammo: def.clipSize };
    });
    if (this.slots.length === 0) throw new Error('startingWeapons is empty');
  }

  get current() {
    return this.slots[0];
  }

  get other() {
    return this.slots[1];
  }

  get waiting() {
    return this.slots.slice(2);
  }

  swap() {
    if (this.slots.length < 2) return;
    [this.slots[0], this.slots[1]] = [this.slots[1], this.slots[0]];
  }

  // Uses one shot from the selected gun. When it runs dry it is refilled and
  // sent to the back of the queue, and the old second gun becomes selected.
  // Returns true when that happened.
  consume() {
    const gun = this.current;
    gun.ammo -= 1;
    if (gun.ammo > 0) return false;
    this.slots.shift();
    gun.ammo = gun.def.clipSize;
    this.slots.push(gun);
    return true;
  }
}
