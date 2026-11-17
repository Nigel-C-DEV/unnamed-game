---
type: design
status: idea
---
# Enemies
How enemies work, and what each enemy property means. Each enemy is its own note in this folder with its values in frontmatter (use the `enemy` template). Game data: `public/data/enemies.json`.

## Overview
Enemies come in waves (see [[core-loop]]). Their element/resistances decide which guns are strong against them (see [[elements]]).

## Properties
| property  | type   | unit    | meaning |
| --------- | ------ | ------- | ------- |
| health    | number | HP      | Damage it can take before dying. |
| moveSpeed | number | tiles/s | How fast it moves toward the player. |
| damage    | number | HP      | Damage dealt to the player on contact (see [[player]] `hitInvulnerability`). |
| element   | element |        | Its element, for elemental advantages. |

## All enemies
- [[zombie]]: the basic enemy
