import { Game, GameElement, ElementGroup } from './gamelib/game';
import { Shape } from './gamelib/shape';

export class Enemies extends ElementGroup {
	constructor() {
		super();
		this.add(new Enemy());
	}
}

let enemyPaths = [{
	fillStyle: 'rgb(255, 0, 64)',
	points: [
		{ x: 0, y: 0 },
		{ x: 30, y: 0 },
		{ x: 20, y: 30 },
		{ x: 10, y: 30 }
	]
}];

class Enemy implements GameElement {
	speedY = 2;
	speedX = 1;
	x: number;
	y: number;
	shape: Shape;
	dead = false;
	steps = 0;

	constructor() {
		this.x = 20;
		this.y = 0;
		this.shape = new Shape(enemyPaths);
	}

	step(game: Game) {
		this.move(game.canvas);
		this.shape.draw(game.gc, this.x, this.y);
	}

	move(canvas: HTMLCanvasElement) {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.shape.isOutside(canvas, this.x, this.y)) {
			this.dead = true;
			return;
		}
		this.steps++;
		if (this.steps < 35) {
			this.speedX += 0.2;
			this.speedY += 0.1;
		}
		else {
			this.speedX -= 0.2;
		}
	}
}


class Route {
	step = 0;
	part = 0;

	constructor(public x: number, public y: number,
		public speedX: number, public speedY: number,
		public parts: { steps: number, ax: number, ay: number }[]) {}

	move() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.part >= this.parts.length) return;
		let segment = this.parts[this.part];
		this.speedX += segment.ax;
		this.speedY += segment.ay;
		this.step++;
		if (this.step > segment.steps) {
			this.step = 0;
			this.part++;
		}
	}
}
