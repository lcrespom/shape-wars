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
	enemies: Enemies;
	explosions: ElementGroup;
	sounds: Sounds;
}


export class ShapeWars {
	game: Game;
	elements: ShapeWarsElements;
	sounds: Sounds;
	playedGameOver = false;
	wave = 1;

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
		if (this.playedGameOver) return;
		let ship = this.elements.ship;
		if (ship.startWave) {
			ship.startWave = false;
			this.startWave();
		}
		else if (ship.gameOver) {
			this.sounds.gameOver();
			this.playedGameOver = true;
		}
		else if (this.elements.enemies.endWave) {
			this.wave++;
			this.startWave();
		}
	}

	startWave() {
		this.sounds.gameStart();
		this.elements.enemies = new Enemies(this.wave);
	}

	reset() {
		this.wave = 1;
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
			enemies: new Enemies(this.wave),
			explosions: new ElementGroup(),
			sounds: this.sounds
		};
	}
}

