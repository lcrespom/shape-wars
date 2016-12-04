const NUM_STARS = 100;

interface Star {
	x: number;
	y: number;
	speed: number;
	//ToDo: RGB, speed, twinkle period, twinkle position
}


function initStar(w: number, h: number,
	star = { x: 0, y: 0, speed: 0 }): Star {
	star.x = Math.random() * w;
	star.y = star.y > 0 ? 0 : Math.random() * h;
	star.speed = 0.1 + Math.random() * 0.9;
	return star;
}

function initStars(w: number, h: number): Star[] {
	let stars: Star[] = [];
	for (let i = 0; i < NUM_STARS; i++) {
		stars.push(initStar(w, h));
	}
	return stars;
}

export function setupStars(canvas: HTMLCanvasElement, gc: CanvasRenderingContext2D) {
	return {
		stars: initStars(canvas.width, canvas.height),
		drawStar(star: Star) {
			gc.fillStyle = `rgb(255, 255, 255)`;
			gc.fillRect(star.x, star.y, 1, 1);
		},
		step() {
			for (let star of this.stars) {
				this.drawStar(star);
				star.y += star.speed;
				if (star.y > canvas.height)
					initStar(canvas.width, canvas.height, star);
			}
		}
	};
}
