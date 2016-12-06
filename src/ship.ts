import { Game } from './game';
import { createShape } from './shape';
import { isKeyPressed } from './keyboard';

const KEY_LEFT = 90;
const KEY_RIGHT = 88;
const CURSOR_LEFT = 37;
const CURSOR_RIGHT = 39;
const KEY_FIRE = 77;
const FIRE_TIME = 30;

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
		fireTime: 0,
		step(game: Game) {
			this.move();
			this.fire(game);
			shape.draw(game.gc, this.x, this.y);
		},
		move() {
			if ((isKeyPressed(KEY_LEFT) || isKeyPressed(CURSOR_LEFT))
				&& this.x > 5)
				this.x -= this.speedX;
			if ((isKeyPressed(KEY_RIGHT) || isKeyPressed(CURSOR_RIGHT))
				&& this.x < canvas.width - 55)
				this.x += this.speedX;
		},
		fire(game: Game) {
			if (this.fireTime > 0) this.fireTime--;
			if (!isKeyPressed(KEY_FIRE) || this.fireTime > 0) return;
			this.fireTime = FIRE_TIME;
			// ToDo: create bullet & add it to game
		}
	};
}
