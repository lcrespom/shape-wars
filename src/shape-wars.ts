import { Game, ElementGroup, GameElements } from './gamelib/game';
import { Starfield } from './stars';
import { StatusDisplay } from './status-display';
import { Ship } from './ship';
import { Enemies } from './enemies';


export interface ShapeWarsElements extends GameElements {
	stars: Starfield;
	status: StatusDisplay;
	ship: Ship;
	bullets: ElementGroup;
	enemies: ElementGroup;
	explosions: ElementGroup;
}


export class ShapeWars {
	game: Game;
	elements: ShapeWarsElements;

	constructor(canvas: HTMLCanvasElement) {
		this.createElements(canvas);
		this.game = new Game(canvas, this.elements);
	}

	loop(cb: () => void) {
		this.game.loop(() => {
			this.step();
			if (cb) cb();
		});
	}

	step() {
		let ship = this.elements.ship;
		if (ship.gameOver) {
			// ToDo: display "G A M E   O V E R"
		}
		else if (ship.startWave) {
			ship.startWave = false;
			this.elements.enemies = new Enemies(this.game.canvas);
		}
	}

	reset() {
		this.createElements(this.game.canvas);
		this.game.elements = this.elements;
	}

	createElements(canvas) {
		this.elements = {
			stars: new Starfield(canvas),
			status: new StatusDisplay(),
			ship: new Ship(canvas),
			bullets: new ElementGroup(),
			enemies: new Enemies(canvas),
			explosions: new ElementGroup()
		};
	}
}

