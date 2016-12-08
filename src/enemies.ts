import { Game, GameElement, ElementGroup } from './gamelib/game';
import { Shape } from './gamelib/shape';


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


let route1 = new Route(20, 0, 2, 1, [
	{ steps: 35, ax: 0.2, ay: 0.1 },
	{ steps: 100, ax: -0.2, ay: 0 }
]);

let route2 = new Route(420, 0, -2, 1, [
	{ steps: 35, ax: -0.2, ay: 0.1 },
	{ steps: 100, ax: 0.2, ay: 0 }
]);


export class Enemies extends ElementGroup {
	constructor(canvas) {
		super();
		this.add(new Enemy(route1));
		this.add(new Enemy(route2));
	}
}


let enemyShape = [{
	fillStyle: 'rgb(255, 0, 65)',
	points: [
		{ x: 0, y: 0 },
		{ x: 30, y: 0 },
		{ x: 20, y: 30 },
		{ x: 10, y: 30 }
	]
}];

class Enemy implements GameElement {
	shape: Shape;
	dead = false;

	constructor(public route: Route) {
		this.shape = new Shape(enemyShape);
	}

	step(game: Game) {
		this.move(game.canvas);
		this.shape.draw(game.gc, this.route.x, this.route.y, this.calcAngle());
	}

	calcAngle(): number {
		return - Math.atan(this.route.speedX / this.route.speedY);
	}

	move(canvas: HTMLCanvasElement) {
		this.route.move();
		if (this.shape.isOutside(canvas, this.route.x, this.route.y)) {
			this.dead = true;
			return;
		}
	}
}
