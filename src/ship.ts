import { Game, GameElement } from './gamelib/game';
import { Shape } from './gamelib/shape';
import { isKeyPressed } from './gamelib/keyboard';
import { ShapeWarsElements } from './shape-wars';
import { Enemy } from './enemies';
import { Explosion } from './explosion';

const KEY_LEFT = 90;
const KEY_RIGHT = 88;
const CURSOR_LEFT = 37;
const CURSOR_RIGHT = 39;
const KEY_FIRE = 77;

const BULLET_LENGTH = 6;
const BULLET_STROKE_STYLE = 'white';
const BULLET_SPEED = 8;
const DYING_TICKS = 180;
const ENEMY_SCORE = 100;

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
	speedX = 3;
	x: number;
	y: number;
	shape: Shape;
	canFire = true;
	dead = false;
	lives = 3;
	diect: number;
	gameOver = false;
	startWave = true;
	score = 0;

	constructor(canvas: HTMLCanvasElement) {
		this.x = canvas.width / 2;
		this.y = canvas.height - 100;
		this.shape = new Shape(shipPaths);
	}

	step(game: Game) {
		if (this.dead) {
			this.diect--;
			if (this.diect <= 0) {
				if (this.lives <= 0)
					this.gameOver = true;
				else {
					this.dead = false;
					this.startWave = true;
				}
			}
		}
		else {
			this.move(game);
			this.fire(game);
			if (this.hitByEnemy(game))
				this.die(game);
		}
	}

	draw(game: Game) {
		if (this.dead) return;
		this.shape.draw(game.gc, this.x, this.y);
	}

	move(game: Game) {
		if ((isKeyPressed(KEY_LEFT) || isKeyPressed(CURSOR_LEFT))
			&& this.x > this.shape.width / 2 + 5)
			this.x -= this.speedX;
		if ((isKeyPressed(KEY_RIGHT) || isKeyPressed(CURSOR_RIGHT))
			&& this.x < game.canvas.width - this.shape.width / 2 - 5)
			this.x += this.speedX;
	}

	fire(game: Game) {
		if (isKeyPressed(KEY_FIRE)) {
			if (!this.canFire) return;
			this.canFire = false;
			let elements = game.elements as ShapeWarsElements;
			elements.bullets.add(new Bullet(this.x, this.y - 15));
			elements.sounds.pew();
		}
		else {
			this.canFire = true;
		}
	}

	hitByEnemy(game: Game): boolean {
		let killed = false;
		let elements = game.elements as ShapeWarsElements;
		elements.enemies.find((enemy: Enemy) => {
			if (!near(this.x, this.y, this.shape.radius,
				enemy.route.x, enemy.route.y, enemy.shape.radius)) return false;
			for (let point of this.shape.paths[0].points) {
				if (enemy.isHit(this.x + point.x, this.y + point.y)) {
					killed = true;
					return true;
				}
			}
			return false;
		});
		return killed;
	}

	die(game: Game) {
		let elements = game.elements as ShapeWarsElements;
		elements.explosions.add(new Explosion({
			x: this.x, y: this.y, radius: 50
		}));
		elements.sounds.shipExplode();
		this.diect = DYING_TICKS;
		this.dead = true;
		this.lives--;
	}
}


function near(x1, y1, r1, x2, y2, r2) {
	let sqr = x => x * x;
	let dist = Math.sqrt(sqr(x1 - x2) + sqr(y1 - y2));
	return dist <= r1 + r2;
}


class Bullet implements GameElement {
	dead = false;

	constructor(public x: number, public y: number) { }

	step(game: Game) {
		this.y -= BULLET_SPEED;
		if (this.hitEnemy(game) || this.y < 0)
			this.dead = true;
	}

	draw(game: Game) {
		game.gc.beginPath();
		game.gc.strokeStyle = BULLET_STROKE_STYLE;
		game.gc.moveTo(this.x, this.y);
		game.gc.lineTo(this.x, this.y - BULLET_LENGTH);
		game.gc.closePath();
		game.gc.stroke();
	}

	hitEnemy(game: Game): boolean {
		let killed = false;
		let elements = game.elements as ShapeWarsElements;
		elements.enemies.find((enemy: Enemy) => {
			if (enemy.isHit(this.x, this.y)) {
				enemy.explode(game);
				elements.ship.score += ENEMY_SCORE;
				killed = true;
				return true;
			}
			return false;
		});
		return killed;
	}
}
