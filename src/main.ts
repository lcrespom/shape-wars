import { setupKeyboard } from './keyboard';
import { Game, ElementGroup } from './game';
import { setupStars } from './stars';
import { setupShip } from './ship';


function initGame(): Game {
	setupKeyboard();
	let game = new Game($('#game-canvas')[0] as HTMLCanvasElement);
	game.elements.stars = setupStars(game.canvas);
	game.elements.ship = setupShip(game.canvas);
	game.elements.bullets = new ElementGroup();
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
	});
}

$(function() {
	runGame();
});
