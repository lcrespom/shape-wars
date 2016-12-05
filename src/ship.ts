import { Game } from './game';
import { createShape } from './shape';
import { isKeyPressed } from './keyboard';

const KEY_LEFT = 90;
const KEY_RIGHT = 88;


let shipPaths = [{
	fillStyle: 'rgb(0, 192, 128)',
	points: [
		{ x: 0, y: 50 },
		{ x: 25, y: 0 },
		{ x: 50, y: 50 }
	]
}];

export function setupShip(canvas: HTMLCanvasElement) {
	let shape = createShape(shipPaths);
	return {
		speedY: 1,
		speedX: 2,
		x: canvas.width / 2 - 25,
		y: canvas.height - 120,
		step(game: Game) {
			if (isKeyPressed(KEY_LEFT))
				this.x -= this.speedX;
			if (isKeyPressed(KEY_RIGHT))
				this.x += this.speedX;
			shape.draw(game.gc, this.x, this.y);
		}
	};
}

