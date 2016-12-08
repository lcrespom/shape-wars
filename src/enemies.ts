import { Game, GameElement, ElementGroup } from './gamelib/game';
import { Shape } from './gamelib/shape';

/** A route is in charge of moving a ship across the canvas, folliwing a
 * given path based on accelleration rules
 */
class Route {
	step = 0;
	part = 0;

	constructor(public x: number, public y: number,
		public speedX: number, public speedY: number,
		public parts: { steps: number, ax: number, ay: number }[]) {}

	clone() {
		return new Route(this.x, this.y, this.speedX, this.speedY, this.parts);
	}

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


let route1 = new Route(20, -20, 2, 1, [
	{ steps: 36, ax: 0.2, ay: 0.1 },
	{ steps: 100, ax: -0.2, ay: 0 }
]);

let route2 = new Route(460, -20, -2, 1, [
	{ steps: 36, ax: -0.2, ay: 0.1 },
	{ steps: 100, ax: 0.2, ay: 0 }
]);

let enemyShape1 = new Shape([{
	fillStyle: '#FF0040',
	points: [
		{ x: 0, y: 0 },
		{ x: 30, y: 0 },
		{ x: 20, y: 30 },
		{ x: 10, y: 30 }
	]
}]);

let enemyShape2 = new Shape([{
	fillStyle: '#FF00C0',
	points: [
		{ x: 0, y: 0 },
		{ x: 30, y: 0 },
		{ x: 20, y: 30 },
		{ x: 10, y: 30 }
	]
}]);


/** A squadron is a group of ships that follow the same route, spaced
 * between each other by a given amount of steps.
 */
class Squadron extends ElementGroup {
	stepct: number;

	constructor(public route: Route, public shape: Shape,
		public ships: number, public steps: number, delay = 0) {
		super();
		this.stepct = steps - delay;
	}

	step(game: Game) {
		super.step(game);
		if (this.ships <= 0) return;
		this.stepct++;
		if (this.stepct >= this.steps) {
			this.stepct = 0;
			this.ships--;
			this.add(new Enemy(this.route.clone(), this.shape));
		}
	}
}


/** The living set of enemy ships in the game */
export class Enemies extends ElementGroup {
	constructor(canvas) {
		super();
		this.add(new Squadron(route1, enemyShape1, 5, 20));
		this.add(new Squadron(route2, enemyShape2, 5, 20, 30));
	}
}


class Enemy implements GameElement {
	dead = false;

	constructor(public route: Route, public shape: Shape) {
	}

	step(game: Game) {
		this.move(game.canvas);
	}

	draw(game: Game) {
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
