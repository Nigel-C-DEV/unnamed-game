// One world unit (tile) in pixels. Distances in the data files are in tiles,
// speeds in tiles per second.
export const TILE = 32;

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

// Placeholder colours until there is real art.
export const ELEMENT_COLORS = {
  fire: 0xff5a36,
  ice: 0x7fd8ff,
  wind: 0x9be37a,
  ground: 0xb5835a,
  electric: 0xffe14d,
};
export const NEUTRAL_COLOR = 0xcccccc;

export const ENEMY_COLORS = {
  zombie: 0x4f8a4f,
};

export const PLAYER_COLOR = 0x5fcde4;

// Not in the docs yet: tune in sandbox (see documentation/open-questions.md).
export const KNOCKBACK_TIME = 0.1; // seconds a knockback takes to play out
export const SPREAD_DEGREES = 20; // total fan angle when a weapon fires several projectiles
export const SPAWN_MIN_DISTANCE = 8; // tiles; enemies don't spawn closer than this to the player
