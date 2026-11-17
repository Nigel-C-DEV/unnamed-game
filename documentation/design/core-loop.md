---
type: design
status: designed
---
# Core Loop

## Overview
Game is a vampire survivor-like, where the player will face waves of opponents.
If you've ever played League of Legends, the SHIFT mechanic is tied to what feels like "Aphelios" gun cycles. Where the player can 'SHIFT' between guns (2 at a time). When the player has consumed all the ammunition in one gun, the consumed gun is replaced by a new one.
This will create a gun cycling strategy.

## SHIFT mechanic (gun cycle)
- The player holds **2 guns** at a time and SHIFTs between them (see [[controls]]).
- Each gun has a limited `clipSize` (see [[weapons]]). When a gun's clip is empty, it is replaced by a new gun.
- Guns have an element (see [[elements]]) + a different way they fire. This creates advantages against certain enemies.
- Replacement guns come from a queue (see [[weapons]] "Weapon rotation").

## Waves
Players get an overview of the type of enemies coming in the current wave, and potentially the next wave, so they can plan how to use their guns: which to recycle out and which to save.
- Wave structure and composition: see [[waves]].

## Win / lose
- Lose: player health reaches 0.
- Win: clear the last wave in [[waves]]. (Endless + score is still an option later.)
