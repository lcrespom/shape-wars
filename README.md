# shape-wars
A vectorial retro videogame

## ToDo
- Stars
	- Twinkle
- Ship
	- Shape
	- Move with keyboard
	- Fire
- Collision detection trick:
	- Get color of target pixel (see http://stackoverflow.com/questions/667045/getpixel-from-html-canvas)
	- Obtain last 2 bits from blue component
	- 0 => background
	- 1 => enemy
	- 2 => player