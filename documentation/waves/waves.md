---
type: design
status: designed
---
# Waves
How waves work, and the list of waves. Game data: `public/data/waves.json`.

Waves are kept in one table rather than one note each, because their order matters. The JSON keeps them in the same order.

## Overview
- Waves run in order. Before each wave there's a short countdown (`delayBefore`).
- The wave's enemies spawn one at a time, every `spawnInterval` seconds, at a random `enemySpawn` point in the map that isn't right next to the player.
- A wave is cleared when everything it spawned is dead. Then the next wave's countdown starts.
- Clearing the last wave wins the game (see [[core-loop]]).
- The HUD shows the current and next wave's enemies so the player can plan their gun cycle.

## Properties
| property      | type                | unit    | meaning |
| ------------- | ------------------- | ------- | ------- |
| enemies       | map of enemy → int  | count   | Which enemies spawn, and how many of each (e.g. `zombie ×5`). |
| spawnInterval | number              | seconds | Time between enemy spawns. |
| delayBefore   | number              | seconds | Countdown before the wave starts. |

## All waves
| wave  | enemies     | spawnInterval | delayBefore |
| ----- | ----------- | ------------- | ----------- |
| wave1 | zombie ×5   | 1             | 2           |
| wave2 | zombie ×8   | 0.8           | 3           |
| wave3 | zombie ×12  | 0.7           | 3           |
| wave4 | zombie ×16  | 0.6           | 3           |
| wave5 | zombie ×22  | 0.5           | 3           |
