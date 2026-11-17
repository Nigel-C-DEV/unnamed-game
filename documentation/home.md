# Home

> **Jam theme:** SHIFT
> **Deadline:** TBD
> **Engine:** Phaser 4 + Vite (JavaScript), maps in Tiled. See the repo `README.md` to run it.

## Pitch
A vampire-survivors-like where the player fights waves of enemies holding two guns at a time and SHIFTs between them. When a gun runs out of ammo it's replaced by a new one, so the game becomes about planning your gun cycle against the waves you can see coming.

## Project
- [[scope]]: what's in the jam build, what's a stretch, what's cut
- [[open-questions]]: unresolved design questions + log of decisions made

## Design
- [[core-loop]]: the SHIFT mechanic, gun cycling, waves, win/lose
- [[elements]]: the elements and which beats which
- [[controls]]
- [[ui]]

## Content (data)
- [[data-mapping]]: how these classes map to JSON and Tiled
- [[weapons]]: weapon property definitions; one note per weapon
- [[debuffs]]: debuff property definitions; one note per debuff
- [[enemies]]
- [[waves]]
- [[player]]

## Conventions

### Properties are data
Throughout the documentation, properties are defined. These map to JSON files consumed by the game and must always be correct.
- The **folder overview note** (e.g. [[weapons]]) defines what each property *means*: type, units, description.
- Each **item** (e.g. [[fire]]) is its own note and stores its *values* in the note's frontmatter (Obsidian's Properties panel). Frontmatter keys are the JSON keys: same spelling, same casing.
- `weapons/weapons.base` shows every weapon as one table, so you can compare and tune values side by side.
- These classes and objects map to the game's JSON data and, later, to Tiled custom types. See [[data-mapping]] for the rules.

### Every note has
- `type`: `design`, `weapon`, `debuff`, `enemy`, ...
- `status`: `idea` → `designed` → `implemented` → `tuned`

### Where things go
- A new question or concern → [[open-questions]], not scattered through notes.
- Once it's answered, move it to the decisions log there and update the relevant note.
- New feature idea → [[scope]] first (Must / Should / Could), then its own design note if it survives.

### New notes
Use the templates in `_templates/` (Command palette → *Templates: Insert template*).
