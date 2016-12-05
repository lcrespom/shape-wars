import { Game } from './game';
import { createShape } from './shape';

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
		speed: 1,
		x: canvas.width / 2 - 25,
		y: canvas.height - 80,
		step(game: Game) {
			shape.draw(game.gc, this.x, this.y);
		}
	};
}

