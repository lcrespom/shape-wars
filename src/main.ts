import { setupKeyboard } from './gamelib/keyboard';
import { Game, GameElement, ElementGroup } from './gamelib/game';
import { Starfield } from './stars';
import { Ship } from './ship';

interface ShapeWarsElements {
	stars: GameElement;
	ship: GameElement;
	bullets: GameElement;
}

function initGame(): Game {
	setupKeyboard();
	let canvas = $('#game-canvas')[0] as HTMLCanvasElement;
	let elements: ShapeWarsElements = {
		stars: new Starfield(canvas),
		ship: new Ship(canvas),
		bullets: new ElementGroup()
	};
	let game = new Game(canvas, elements);
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
