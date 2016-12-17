import { Game, ElementGroup } from './gamelib/game';
import { Shape } from './gamelib/shape';
import { Enemy } from './enemies';
import { enemyShapes, enemyRoutes } from './static/waves';


/** A route is in charge of moving a ship across the canvas, folliwing a
 * given path based on accelleration rules
 */
export class Route {
	step = 0;
	part = 0;
	ax = 0;
	ay = 0;

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
		this.speedX += this.ax ? this.ax : segment.ax;
		this.speedY += this.ay ? this.ay : segment.ay;
		this.step++;
		if (this.step > segment.steps) {
			this.step = 0;
			this.part++;
		}
	}
}


/** A squadron is a group of ships that follow the same route, spaced
 * between each other by a given amount of steps.
 */
export class Squadron extends ElementGroup {
	stepct: number;
	dead = false;

	constructor(public route: Route, public shape: Shape,
		public ships: number, public steps: number, delay = 0) {
		super();
		this.stepct = steps - delay;
	}

	step(game: Game) {
		super.step(game);
		if (this.ships <= 0) {
			this.dead = this.items.every(e => !!e.dead);
			return;
		}
		this.stepct++;
		if (this.stepct >= this.steps) {
			this.stepct = 0;
			this.ships--;
			this.add(new Enemy(this.route.clone(), this.shape));
		}
	}
}
