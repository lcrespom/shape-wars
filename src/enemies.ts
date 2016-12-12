import { Game, GameElement, ElementGroup } from './gamelib/game';
import { Shape } from './gamelib/shape';
import { ShapeWarsElements } from './shape-wars';
import { Explosion } from './explosion';
import { Route, Squadron } from './wave';
import waves from './static/waves';


/** The living set of enemy ships in the game */
export class Enemies extends ElementGroup {
	constructor(canvas) {
		super();
		for (let sq of waves.squadrons)
			this.add(
				new Squadron(sq.route, sq.shape, sq.ships, sq.steps, sq.delay)
			);
	}
}


export class Enemy implements GameElement {
	dead = false;

	constructor(public route: Route, public shape: Shape) {
	}

	step(game: Game) {
		let elements = game.elements as ShapeWarsElements;
		if (elements.ship.dead)
			this.route.ay = -0.2;
		this.move(game.canvas);
	}

	draw(game: Game) {
		this.shape.draw(game.gc, this.route.x, this.route.y, this.calcAngle());
	}

	calcAngle(): number {
		let angle = - Math.atan(this.route.speedX / this.route.speedY);
		if (this.route.speedY < 0)
			angle += Math.PI;
		return angle;
	}

	move(canvas: HTMLCanvasElement) {
		this.route.move();
		if (this.shape.isOutside(canvas, this.route.x, this.route.y)) {
			this.dead = true;
			return;
		}
	}

	isHit(x: number, y: number) {
		return this.shape.isPointInside(
			this.route.x, this.route.y, x, y);
	}

	explode(game: Game) {
		let elements = game.elements as ShapeWarsElements;
		elements.explosions.add(new Explosion(
			{ x: this.route.x, y: this.route.y }));
		elements.sounds.enemyExplode();
		this.dead = true;
	}
}
