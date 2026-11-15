---
type: design
status: designed
---
# Weapons
How weapons work, and what each weapon property means. Each weapon is its own note in this folder with its values in frontmatter. Open `weapons.base` to see them all in one table.

## Overview
Weapons are point and click. The player faces the mouse. Left click fires, shooting a projectile. Depending on the weapon, the type of projectile and other properties vary. The player holds two weapons at a time (see [[core-loop]]).

## Properties
| property           | type       | unit    | meaning |
| ------------------ | ---------- | ------- | ------- |
| element            | string     |         | The weapon's element (see [[elements]]). |
| projectileSpeed    | number     | TBD     | The speed at which the projectile travels. The projectile inherits this as its speed. |
| projectileDistance | number     | TBD     | The distance the projectile can travel before it disappears. The projectile inherits this as its max distance. |
| projectiles        | int        | count   | The number of projectiles the weapon produces per shot. |
| knockBack          | number     | TBD     | The distance an enemy moves after being hit, along the projectile's travel vector. |
| damage             | number     | HP      | The damage the projectile does if it hits an enemy. |
| firingSpeed        | number     | seconds | The delay between shots. After firing, the player can't shoot again until this timer completes. |
| clipSize           | int        | shots   | The number of shots before the weapon is depleted (and replaced). |
| debuff             | link       |         | The debuff applied to an enemy hit by a projectile (see [[debuffs]]). |

## All weapons
[[fire]] · [[ice]] · [[wind]] · [[ground]] · [[electric]]

## Weapon rotation
Weapons appear in a cycle.
Default 2 weapons first.
Take the first 2 weapons in the queue.

Selected weapon is always at the front of the queue.
When the player SHIFTs weapons, it swaps the first (current weapon) with the second item in the queue.

When the player runs out of ammo (will always be the selected weapon, hence will be at the front of the queue), pop the weapon, then refill the ammo, then queue it at the back. 

This interaction will default, select the old second to become the first, and the weapon the player can SHIFT to is new second (old third).


Starting Weapons Queue
Fire, Ice, Wind, Ground, Electric.
