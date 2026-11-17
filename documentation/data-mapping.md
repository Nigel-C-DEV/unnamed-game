---
type: design
status: designed
---
# Data Mapping
Every class of thing defined in these docs (weapons, debuffs, enemies, player, waves) maps 1:1 to a class in the game and to JSON objects. That way we can:
1. **Tune the game by editing JSON** without touching code. The dev server reloads when a data file is saved.
2. **Use the same classes in [Tiled](https://www.mapeditor.org/)**, so objects placed in maps carry the same properties the game already understands.

The docs are the source of truth. If a property is added, renamed or removed here, the JSON, the game code and the Tiled custom types must change to match. For now the docs and JSON are synced by hand.

## Classes
| class  | defined in  | instances      | JSON                       | in Tiled |
| ------ | ----------- | -------------- | -------------------------- | -------- |
| weapon | [[weapons]] | `weapons/*.md` | `public/data/weapons.json` | custom type defined, not placed yet |
| debuff | [[debuffs]] | `debuffs/*.md` | `public/data/debuffs.json` | no (each debuff has different properties) |
| enemy  | [[enemies]] | `enemies/*.md` | `public/data/enemies.json` | custom type defined, not placed yet |
| player | [[player]]  | [[player]]     | `public/data/player.json`  | custom type defined |
| wave   | [[waves]]   | [[waves]] table | `public/data/waves.json`  | no |

Map-only classes (placed as point objects in Tiled, no data file):

| class       | used for |
| ----------- | -------- |
| playerSpawn | Where the player starts. |
| enemySpawn  | Points enemies spawn from during [[waves]]. |

## Rules
- **Class name** = the note's `type` frontmatter value (`weapon`, `enemy`, ...). In Tiled this is the object's *Class*.
- **Instance id** = the note's filename (`fire`, `burn`). This is the JSON key and the name referenced by other objects.
- **Property names** = frontmatter keys, exactly: same spelling, same camelCase. These are also the Tiled custom type member names.
- **Docs-only keys** (`type`, `status`) are not exported as properties.
- **Links become ids.** `debuff: "[[burn]]"` in a note becomes `"debuff": "burn"` in JSON. An empty link becomes `null`.
- **Values keep their type.** Numbers are written as numbers (`10`, not `"10"`), so the JSON and Tiled types stay correct.
- **Units** live in the class's Properties table. JSON and Tiled store bare numbers. Distances are in tiles (1 tile = 32px), speeds in tiles/s, times in seconds.

## Example
`weapons/fire.md` frontmatter → `public/data/weapons.json`:
```json
{
  "fire": {
    "element": "fire",
    "damage": 10,
    "projectileSpeed": 15,
    "projectileDistance": 10,
    "projectiles": 1,
    "knockBack": 0,
    "fireCooldown": 0.75,
    "clipSize": 10,
    "debuff": "burn"
  }
}
```

## Property types
The `type` column in each class's Properties table maps like this:

| docs type    | JSON            | Tiled property type |
| ------------ | --------------- | ------------------- |
| int          | number          | `int`               |
| number       | number          | `float`             |
| string       | string          | `string`            |
| element      | string          | `enum` (fire, ice, wind, ground, electric) |
| link         | string (id)     | `string` (id of the linked object) |
| list of link | array of ids    | not supported; JSON only (e.g. player `startingWeapons`) |
| map          | object          | not supported; JSON only (e.g. wave `enemies`) |

## Tiled setup
- Open `tiled/unnamed-game.tiled-project` in Tiled. Its custom types (Project → Custom Types) mirror the classes above: `element` (enum), `weapon`, `enemy`, `player`, `playerSpawn`, `enemySpawn`. A placed `weapon` or `enemy` object has an `id` member naming the JSON entry.
- Maps live in `public/maps/` and are saved as JSON (`.tmj`). The game loads `public/maps/arena.tmj` and reads its `spawns` object layer.
- If a property changes here, update the matching custom type in Tiled too.

## Open
- Generate the JSON from the notes with a script, or keep editing both by hand?
- Should enemies placed directly in a Tiled map spawn at the start? (The `enemy` custom type is ready for it; the game doesn't read placed enemies yet.)
