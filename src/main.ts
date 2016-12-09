import { setupKeyboard, isKeyPressed } from './gamelib/keyboard';
import { Game } from './gamelib/game';
import { createElements } from './shape-wars';


function initGame(): Game {
	setupKeyboard();
	let canvas = $('#game-canvas')[0] as HTMLCanvasElement;
	let game = new Game(canvas, createElements(canvas));
	return game;
}

function runGame() {
	let fpsct = 0;
	let game = initGame();
	game.loop(() => {
		if ((++fpsct) == 30) {
			fpsct = 0;
			$('#fps').text(Math.round(game.fps));
			$('#cpu').text(Math.round(game.cpu * 100));
		}
		if (isKeyPressed(82))
			game.elements = createElements(game.canvas);
	});
}

$(function() {
	runGame();
});
