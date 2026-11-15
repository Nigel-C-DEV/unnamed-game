# Open Questions
Unresolved questions live here. When one is answered, move it to the **Decisions** log and update the note it affects.

## Gameplay
- **Stalling by misfiring.** How easy is it to recycle a gun by spam clicking an empty area to misfire and stall the waves? Maybe a timer so stalling isn't easy, or reward faster clears? Does firing at nothing even consume ammo?
- **Where does the replacement gun come from?** Random, a fixed rotation, or a visible queue so you can see what's next? This drives the whole "plan your cycle" idea and the [[ui]].
- **Right-click ability:** per gun, per element, or a player ability?
- **Shift key:** tap to swap only, or does it do anything else?
- **Element advantage:** what does "advantage" mean mechanically? (see [[elements]])

## Properties
- **`firingSpeed`** is a *delay* (seconds between shots), but the name reads as "higher = faster". Rename to `fireCooldown` before code depends on it?
- **Units** for `projectileSpeed` (1) and `projectileDistance` (10): pixels, tiles, world units? Per second?
- **`projectiles` > 1** needs a spread pattern/angle property.
- **Burn tick rate** (every 0.5s) is hard-coded in the description. Make it a property (`tickRate`)?
- **Debuff overrides:** Burn values are "defaults". Can a weapon override them? Do debuffs stack or refresh on re-hit?
- **Debuff naming:** `burnDamage`/`burnTimer` vs. generic `damage`/`duration` shared by all debuffs?

## Decisions
| date | decision | why |
| ---- | -------- | --- |
|      |          |     |
