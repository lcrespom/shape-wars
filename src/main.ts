import { setupKeyboard } from './keyboard';
import { Game, createGroup } from './game';
import { setupStars } from './stars';
import { setupShip } from './ship';


function initGame(): Game {
	setupKeyboard();
	let game = new Game($('#game-canvas')[0] as HTMLCanvasElement);
	game.elements.stars = setupStars(game.canvas);
	game.elements.ship = setupShip(game.canvas);
	game.elements.bullets = createGroup();
	return game;
}

$(function() {
	initGame().loop();
});
