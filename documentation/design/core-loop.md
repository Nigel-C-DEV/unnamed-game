---
type: design
status: idea
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
- Where the replacement gun comes from is still open (see [[open-questions]]).

## Waves
Players get an overview of the type of enemies coming in the current wave, and potentially the next wave, so they can plan how to use their guns: which to recycle out and which to save.
- Wave structure: TBD (number of waves, what ends a wave, time between waves)
- Wave composition: TBD (see [[enemies]])

## Win / lose
- Lose: TBD
- Win: TBD (survive N waves? endless + score?)
