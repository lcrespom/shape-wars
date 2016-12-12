import { Game, ElementGroup, GameElements } from './gamelib/game';
import { Starfield } from './stars';
import { StatusDisplay } from './status-display';
import { Ship } from './ship';
import { Enemies } from './enemies';
import { Sounds } from './sounds';


export interface ShapeWarsElements extends GameElements {
	stars: Starfield;
	status: StatusDisplay;
	ship: Ship;
	bullets: ElementGroup;
	enemies: ElementGroup;
	explosions: ElementGroup;
	sounds: Sounds;
}


export class ShapeWars {
	game: Game;
	elements: ShapeWarsElements;
	sounds: Sounds;
	playedGameOver = false;

	constructor(canvas: HTMLCanvasElement) {
		this.sounds = new Sounds();
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
		if (ship.startWave) {
			ship.startWave = false;
			this.sounds.gameStart();
			this.elements.enemies = new Enemies(this.game.canvas);
		}
		if (ship.gameOver && !this.playedGameOver) {
			this.sounds.gameOver();
			this.playedGameOver = true;
		}
	}

	reset() {
		this.createElements(this.game.canvas);
		this.game.elements = this.elements;
		this.playedGameOver = false;
	}

	createElements(canvas) {
		this.elements = {
			stars: new Starfield(canvas),
			status: new StatusDisplay(),
			ship: new Ship(canvas),
			bullets: new ElementGroup(),
			enemies: new Enemies(canvas),
			explosions: new ElementGroup(),
			sounds: this.sounds
		};
	}
}

