---
type: design
status: designed
---
# User Interface
Placeholder shapes for now: element colours come from `ELEMENT_COLORS` in `src/constants.js`.

## HUD
- Top left: player health bar.
- Bottom centre: the two gun slots. Each shows the element colour, name and ammo left in the clip; the selected gun has a white border.
- Next to the slots: "up next", the rest of the gun queue in order (see [[weapons]] "Weapon rotation").

## Wave preview
- Top centre: wave number, enemies left, and a countdown between waves.
- Below that: the enemies in the current wave and in the next wave (see [[waves]]).

## Screens
- Title: TBD (the game starts straight into wave 1 for now)
- Game over / win: shows how far you got; click or press R to play again.
