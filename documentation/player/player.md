---
type: player
status: designed
health: 100
moveSpeed: 6
hitInvulnerability: 0.5
startingWeapons:
  - "[[fire]]"
  - "[[ice]]"
  - "[[wind]]"
  - "[[ground]]"
  - "[[electric]]"
---
# Player
The player character: movement and stats. For input see [[controls]]; for guns see [[weapons]]. Game data: `public/data/player.json`.

## Properties
| property           | type         | unit    | meaning |
| ------------------ | ------------ | ------- | ------- |
| health             | number       | HP      | Damage the player can take before losing. |
| moveSpeed          | number       | tiles/s | How fast the player moves. |
| hitInvulnerability | number       | seconds | After taking a hit, how long the player can't be hit again. |
| startingWeapons    | list of link |         | The weapon queue at the start of a run, front first (see [[weapons]] "Weapon rotation"). |
