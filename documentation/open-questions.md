# Open Questions
Unresolved questions live here. When one is answered, move it to the **Decisions** log and update the note it affects.

## Gameplay
- **Stalling by misfiring.** How easy is it to recycle a gun by spam clicking an empty area to misfire and stall the waves? Maybe a timer so stalling isn't easy, or reward faster clears? Does firing at nothing even consume ammo?
- **Where does the replacement gun come from?** Random, a fixed rotation, or a visible queue so you can see what's next? This drives the whole "plan your cycle" idea and the [[ui]].
	- A: I've answer this in the weapons page it will work like a queue. Refer to weapon page.
- **Right-click ability:** per gun, per element, or a player ability?
- **Shift key:** tap to swap only, or does it do anything else?
	- SHIFT to swap only for now, but doesn't mean we won't want to apply something on it too later.
- **Element advantage:** what does "advantage" mean mechanically? (see [[elements]])
	- We will have to explore this in sandboxing. 

## Properties
- **Units** for `projectileSpeed` (1) and `projectileDistance` (10): pixels, tiles, world units? Per second?
	- A: this needs to be modified once we have a sandbox environment we can test it out.
- **`projectiles` > 1** needs a spread pattern/angle property.
	- Will need to sandbox before i define how it works, but modifying number of projectiles is something I want to explore.
- **Burn tick rate** (every 0.5s) is hard-coded in the description. Make it a property (`tickRate`)?
	- Need to explore again once sandboxed
- **Debuff overrides:** Burn values are "defaults". Can a weapon override them? Do debuffs stack or refresh on re-hit?
	- 
- **Debuff naming:** `burnDamage`/`burnTimer` vs. generic `damage`/`duration` shared by all debuffs?
	- maybe can rename burnTimer to duration, however burnDamage cannot be called damage, since it's more of a damage per tick.

## Decisions
| date | decision | why |
| ---- | -------- | --- |
| 2026-11-17 | Renamed weapon property `firingSpeed` → `fireCooldown`. | It's the delay between shots (seconds), so "speed" read as higher = faster. Renamed before any code or JSON depends on it. |
