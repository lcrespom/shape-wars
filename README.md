# shape-wars
A vectorial retro videogame.
- Written in TypeScript.
- HTML5 `<canvas>` used for rendering
- All elements are rendered as lines or polygons
- Sound is synthesized using synthlib from [Modulator](https://github.com/lcrespom/Modulator)

Use `Z` and `X` to move the ship left and right, and `M` to shoot. Use `R` to restart the game at any time.

## ToDo
- Enemies
	- Create harder version of existing route by multiplying speed & acceleration
	- Random entry point for routes (within a range)
	- Fully random routes
	- Boss wave :-)

- Collision detection:
	- Refine to pointInPath
