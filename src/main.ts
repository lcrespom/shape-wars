import { setupKeyboard, isKeyPressed } from './gamelib/keyboard';
import { ShapeWars } from './shape-wars';

const RESET_KEY = 82;


function initGame() {
	setupKeyboard();
	let canvas = $('#game-canvas')[0] as HTMLCanvasElement;
	let shapeWars = new ShapeWars(canvas);
	return shapeWars;
}

function runGame() {
	let fpsct = 0;
	let shapeWars = initGame();
	shapeWars.loop(() => {
		if ((++fpsct) == 30) {
			fpsct = 0;
			$('#fps').text(Math.round(shapeWars.game.fps));
			$('#cpu').text(Math.round(shapeWars.game.cpu * 100));
		}
		if (isKeyPressed(RESET_KEY))
			shapeWars.reset();
	});
}

$(function() {
	runGame();
});
