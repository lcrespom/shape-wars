import { setupStars } from './stars';

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
