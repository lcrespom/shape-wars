import { Game } from './game';

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


function initStar(w: number, h: number, str = { y: 0 }): Star {
	let star = str as Star;
	star.x = Math.random() * w;
	star.y = star.y > 0 ? 0 : Math.random() * h;
	star.speed = 0.1 + Math.random() * 0.9;
	let randomColor = () => Math.round(64 + 191 * Math.random() * star.speed);
	star.r = randomColor();
	star.g = randomColor();
	star.b = randomColor() & 252;	// Background objects have 2 last bits to 0
	return star;
}

function initStars(w: number, h: number): Star[] {
	let stars: Star[] = [];
	for (let i = 0; i < NUM_STARS; i++) {
		stars.push(initStar(w, h));
	}
	return stars;
}

export function setupStars(canvas: HTMLCanvasElement) {
	return {
		stars: initStars(canvas.width, canvas.height),
		drawStar(gc: CanvasRenderingContext2D, star: Star) {
			gc.fillStyle = `rgb(${star.r}, ${star.g}, ${star.b})`;
			gc.fillRect(star.x, star.y, 2, 2);
		},
		step(game: Game) {
			for (let star of this.stars) {
				this.drawStar(game.gc, star);
				star.y += star.speed * game.elements.ship.speed;
				if (star.y > canvas.height)
					initStar(canvas.width, canvas.height, star);
			}
		}
	};
}
