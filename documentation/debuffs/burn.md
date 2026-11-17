---
type: debuff
status: designed
element: fire
burnDamage: 2
burnTimer: 5
tickRate: 0.5
---
# Burn
Leaves damage over time on the enemy. Every `tickRate` seconds, inflict `burnDamage` on the enemy. Burn lasts on the enemy for `burnTimer` seconds.

## Properties
| property   | type   | unit    | meaning |
| ---------- | ------ | ------- | ------- |
| burnDamage | number | HP      | Damage dealt each tick. |
| burnTimer  | number | seconds | How long the burn lasts. |
| tickRate   | number | seconds | Time between ticks. |
