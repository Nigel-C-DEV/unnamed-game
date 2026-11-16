---
type: design
status: idea
---
# Data Mapping
Every class of thing defined in these docs (weapons, debuffs, enemies, player) maps 1:1 to a class in the game and to JSON objects. That way we can:
1. **Tune the game by editing JSON** without touching code.
2. **Use the same classes in [Tiled](https://www.mapeditor.org/) later**, so objects placed in maps (e.g. enemy spawns) carry the same properties the game already understands.

The docs are the source of truth. If a property is added, renamed or removed here, the JSON, the game code and the Tiled custom types must change to match.

## Classes
| class  | defined in   | instances       | JSON (proposed)      | used in Tiled |
| ------ | ------------ | --------------- | -------------------- | ------------- |
| weapon | [[weapons]]  | `weapons/*.md`  | `data/weapons.json`  | TBD           |
| debuff | [[debuffs]]  | `debuffs/*.md`  | `data/debuffs.json`  | TBD           |
| enemy  | [[enemies]]  | `enemies/*.md`  | `data/enemies.json`  | likely: spawn points / wave placement |
| player | [[player]]   | [[player]]      | `data/player.json`   | likely: spawn point |

## Rules
- **Class name** = the note's `type` frontmatter value (`weapon`, `enemy`, ...). In Tiled this is the object's *Class*.
- **Instance id** = the note's filename (`fire`, `burn`). This is the JSON key and the name referenced by other objects.
- **Property names** = frontmatter keys, exactly: same spelling, same camelCase. These are also the Tiled custom type member names.
- **Docs-only keys** (`type`, `status`) are not exported as properties.
- **Links become ids.** `debuff: "[[burn]]"` in a note becomes `"debuff": "burn"` in JSON.
- **Values keep their type.** Numbers are written as numbers (`10`, not `"10"`), so the JSON and Tiled types stay correct.
- **Units** live in the class's Properties table. JSON and Tiled store bare numbers.

## Example
`weapons/fire.md` frontmatter → `data/weapons.json`:
```json
{
  "fire": {
    "element": "fire",
    "damage": 10,
    "projectileSpeed": 1,
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

| docs type | JSON    | Tiled property type |
| --------- | ------- | ------------------- |
| int       | number  | `int`               |
| number    | number  | `float`             |
| string    | string  | `string`            |
| element   | string  | `enum` (fire, ice, wind, ground, electric) |
| link      | string (id) | `string` (id of the linked object) |

## Tiled setup (later)
- Define each class in Tiled's *Custom Types Editor* (Project → Custom Types) as a **Class** with the same members and types as its Properties table. Tiled can export/import these definitions as JSON, so they can be kept in the repo alongside the data.
- Objects placed in a map set their *Class* (e.g. `enemy`) and override only the properties that differ from the defaults in `data/*.json`.
- Export maps as JSON (`.tmj`) so the game loads maps and data the same way.

## Open
- Which engine, and does it have a Tiled importer? (see [[home]])
- Generate the JSON from the notes with a script, or edit JSON directly and keep the docs in sync by hand?
- Which classes actually get placed in Tiled maps?
