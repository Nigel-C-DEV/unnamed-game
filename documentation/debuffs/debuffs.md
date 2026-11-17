---
type: design
status: designed
---
# Debuffs
A debuff is an effect an enemy receives after being hit by a projectile. Weapons link to the debuff they apply (see [[weapons]]). Each debuff is its own note with its default values in frontmatter. Game data: `public/data/debuffs.json`.

Hitting an enemy that already has the debuff refreshes it (restarts its timer). Debuffs don't stack.

## Properties
Each debuff has its own properties; define them in the debuff's note. What each debuff *does* with its numbers is code (`src/systems/debuffs.js`), so a new debuff needs a small code change as well as data.

| debuff    | element | effect           |
| --------- | ------- | ---------------- |
| [[burn]]  | fire    | Damage over time |
| [[chill]] | ice     | Slows movement   |
