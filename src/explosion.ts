import { Game, GameElement } from './gamelib/game';


interface ExplosionParams {
	x: number;
	y: number;
	radius?: number;
	growTicks?: number;
	shrinkTicks?: number;
	fillStyle?: string;
	strokeStyle?: string;
	rays?: number;
}

let defaultParams: ExplosionParams = {
	x: 0, y: 0, radius: 30,
	growTicks: 12, shrinkTicks: 40,
	fillStyle: '', strokeStyle: 'white',
	rays: 6
};

export class Explosion implements GameElement {
	stepct = 0;
	dead = false;
	radius = 0;
	params: ExplosionParams;

	constructor(params: ExplosionParams) {
		this.params = Object.assign({}, defaultParams, params);
	}

	step(game: Game) {
		let grow = this.params.growTicks;
		let shrink = this.params.shrinkTicks;
		let r = this.params.radius;
		if (this.stepct < grow)
			this.radius += r / grow;
		else if (this.stepct < grow + shrink)
			this.radius -= r / shrink;
		else
			this.dead = true;
		this.stepct++;
	}

	draw(game: Game) {
		game.gc.strokeStyle = this.params.strokeStyle || 'red';
		game.gc.translate(this.params.x, this.params.y);
		let angle = 2 * Math.PI / this.params.rays;
		game.gc.rotate(Math.random());
		game.gc.beginPath();
		for (let i = 0; i < this.params.rays; i++) {
			game.gc.moveTo(0, 0);
			game.gc.lineTo(this.radius * (0.5 + Math.random() / 2), 0);
			game.gc.rotate(angle);
		}
		game.gc.stroke();
		game.gc.setTransform(1, 0, 0, 1, 0, 0);
	}
}
