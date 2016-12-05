import { Game, gameSetup, gameLoop } from './game';
import { setupStars } from './stars';
import { setupShip } from './ship';


function initGame(): Game {
	let game = gameSetup();
	game.elements.stars = setupStars(game.canvas);
	game.elements.ship = setupShip(game.canvas);
	return game;
}

$(function() {
	gameLoop(initGame());
});
