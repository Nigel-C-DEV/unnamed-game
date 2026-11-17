# Unnamed Game

Game jam entry for the theme **SHIFT**: a survivors-like where you hold two guns, SHIFT between them, and empty guns cycle to the back of a queue.

Design docs are an Obsidian vault in [`documentation/`](documentation/home.md).

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

| command           | does |
| ----------------- | ---- |
| `npm run dev`     | Dev server; reloads when code or data changes. |
| `npm run build`   | Builds to `dist/` with relative paths (ready to zip for itch.io). |
| `npm run preview` | Serves the `dist/` build locally. |
| `npm test`        | Unit tests (`src/**/*.test.js`). |

## Controls
WASD move · mouse aim · left click fire (hold to keep firing) · Shift swap guns · R restart after game over.

## Layout

```
public/data/   game data (weapons, debuffs, enemies, player, waves); tune numbers here
public/maps/   Tiled maps (.tmj)
tiled/         Tiled project with custom types matching the data classes
src/           game code (Phaser 4)
  scenes/      boot, game, HUD, end screen
  entities/    Player, Enemy, Projectile
  systems/     WeaponQueue (gun cycle), WaveManager, debuff behaviour
documentation/ design docs (Obsidian)
```

How the docs, JSON and Tiled line up: [`documentation/data-mapping.md`](documentation/data-mapping.md).
