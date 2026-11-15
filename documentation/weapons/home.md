# Weapons
This is the weapons folder, where information about how weapons work can be found.

## Overview
Weapons are point and click. The player faces the mouse. Left click triggers the firing which shoots a projectile. Depending on the weapon the type of projectile and other properties may vary.


## Properties
### projectileSpeed
The speed at which the projectile travels.
(projectile should inherit this as its speed)

### projectileDistance
The distance the projectile can travel before it disappears.
(projectile should inherit this distance as its max distance)

### projectiles
The number of projectiles a weapon produces.

### knockBack
the distance an enemy moves after being hit by a projectile. (Same vector the projectile was traveling)

### damage
the amount of damage the projectile does if it hits an enemy.

### firingSpeed
the delay in between each shot in seconds. So, after the player fires, they cannot shoot until the firing speed timer has been completed.

### clipSize
The amount of shots a player can take on the weapon before it is depleted.

### debuff
An object that defines a debuff. The debuff can be different effects that the enemy will receive after a projectile hits them.