import { Game, GameElement } from './gamelib/game';
import { ShapeWarsElements } from './shape-wars';

const NUM_STARS = 150;

interface Star {
	x: number;
	y: number;
	speed: number;
	r: number;
	g: number;
	b: number;
	// ToDo: twinkle period, twinkle position
}

export class Starfield implements GameElement {
	stars: Star[];

	constructor(canvas: HTMLCanvasElement) {
		this.initStars(canvas.width, canvas.height);
	}

	initStars(w: number, h: number) {
		this.stars = [];
		for (let i = 0; i < NUM_STARS; i++) {
			this.stars.push(this.initStar(w, h));
		}
	}

	initStar(w: number, h: number, str = { y: 0 }): Star {
		let star = str as Star;
		star.x = Math.random() * w;
		star.y = star.y > 0 ? 0 : Math.random() * h;
		star.speed = 0.1 + Math.random() * 0.9;
		let randomColor = () => Math.round(128 + 127 * Math.random() * star.speed);
		star.r = randomColor();
		star.g = randomColor();
		star.b = randomColor() & 252;	// Background objects have 2 last bits to 0
		return star;
	}

	drawStar(gc: CanvasRenderingContext2D, star: Star) {
		gc.fillStyle = `rgb(${star.r}, ${star.g}, ${star.b})`;
		gc.fillRect(star.x, star.y, 2, 2);
	}

	step(game: Game) {
		for (let star of this.stars) {
			this.drawStar(game.gc, star);
			let elements = game.elements as ShapeWarsElements;
			star.y += star.speed * elements.ship.speedY;
			if (star.y > game.canvas.height)
				this.initStar(game.canvas.width, game.canvas.height, star);
		}
	}
}
