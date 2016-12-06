import { Game, GameElement } from './gamelib/game';
import { Shape } from './gamelib/shape';
import { isKeyPressed } from './gamelib/keyboard';

const KEY_LEFT = 90;
const KEY_RIGHT = 88;
const CURSOR_LEFT = 37;
const CURSOR_RIGHT = 39;
const KEY_FIRE = 77;

const FIRE_TIME = 30;
const BULLET_LENGTH = 6;
const BULLET_STROKE_STYLE = 'white';
const BULLET_SPEED = 4;

let shipPaths = [{
	fillStyle: 'rgb(0, 192, 128)',
	points: [
		{ x: 0, y: 50 },
		{ x: 25, y: 0 },
		{ x: 50, y: 50 }
	]
}];


export class Ship implements GameElement {
	speedY = 1;
	speedX = 2;
	fireTime = 0;
	x: number;
	y: number;
	shape: Shape;

	constructor(canvas: HTMLCanvasElement) {
		this.x = canvas.width / 2 - 25;
		this.y = canvas.height - 120;
		this.shape = new Shape(shipPaths);
	}

	step(game: Game) {
		this.move(game);
		this.fire(game);
		this.shape.draw(game.gc, this.x, this.y);
	}

	move(game: Game) {
		if ((isKeyPressed(KEY_LEFT) || isKeyPressed(CURSOR_LEFT))
			&& this.x > 5)
			this.x -= this.speedX;
		if ((isKeyPressed(KEY_RIGHT) || isKeyPressed(CURSOR_RIGHT))
			&& this.x < game.canvas.width - 55)
			this.x += this.speedX;
	}

	fire(game: Game) {
		if (this.fireTime > 0) this.fireTime--;
		if (!isKeyPressed(KEY_FIRE) || this.fireTime > 0) return;
		this.fireTime = FIRE_TIME;
		game.elements.bullets.add(new Bullet(this.x + 25, this.y));
	}
}


class Bullet implements GameElement {
	dead: boolean;

	constructor(public x: number, public y: number) {}

	step(game: Game) {
		this.draw(game.gc);
		this.y -= BULLET_SPEED;
		if (this.y < 0)
			this.dead = true;
	}

	draw(gc: CanvasRenderingContext2D) {
		gc.beginPath();
		gc.strokeStyle = BULLET_STROKE_STYLE;
		gc.moveTo(this.x, this.y);
		gc.lineTo(this.x, this.y - BULLET_LENGTH);
		gc.closePath();
		gc.stroke();
	}
}
