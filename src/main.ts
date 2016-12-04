interface GameElement {
	step: (game: Game) => void;
}

interface Game {
	elements: {
		[ename: string]: GameElement;
	};
	canvas: HTMLCanvasElement;
	gc: CanvasRenderingContext2D;
	time: number;
}

/*-------------------- Stars --------------------*/

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

function setupStars(canvas: HTMLCanvasElement, gc: CanvasRenderingContext2D) {
	let imgData = gc.createImageData(1, 1);
	let pixel = imgData.data;
	return {
		stars: initStars(canvas.width, canvas.height),
		pixel,
		putPixel(x: number, y: number,
			r: number, g: number, b: number, a: number) {
			this.pixel[0] = r;
			this.pixel[1] = g;
			this.pixel[2] = b;
			this.pixel[3] = a;
			gc.putImageData(imgData, x, y);
		},
		step() {
			for (let star of this.stars) {
				let f = 255 << 0;
				this.putPixel(star.x, star.y, f, f, f, f);
				star.y += star.speed;
				if (star.y > canvas.height)
					initStar(canvas.width, canvas.height, star);
			}
		}
	};
}


/*-------------------- Main game engine --------------------*/

function gameSetup(): Game {
	let canvas = $('#game-canvas')[0] as HTMLCanvasElement;
	let ctx = canvas.getContext('2d');
	if (!ctx)
		throw Error('Could not setup canvas');
	return {
		elements: {
			stars: setupStars(canvas, ctx)
		},
		canvas,
		gc: ctx,
		time: Date.now()
	};
}

function gameStep(game: Game) {
	game.gc.clearRect(0, 0, game.canvas.width, game.canvas.height);
	for (let key of Object.keys(game.elements))
		game.elements[key].step(game);
}

function gameLoop(game: Game) {
	window.requestAnimationFrame(_ => {
		//ToDo: measure FPS
		gameStep(game);
		gameLoop(game);
	});
}

$(function() {
	let game = gameSetup();
	gameLoop(game);
});
