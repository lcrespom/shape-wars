import { Game, GameElement, ElementGroup } from './gamelib/game';
import { ShapeWarsElements } from './shape-wars';


export class StatusDisplay extends ElementGroup {
	constructor() {
		super();
		this.add(new ShipsDisplay());
		this.add(new Scoring());
		this.add(new Messages());
	}
}


class ShipsDisplay implements GameElement {
	step(game: Game) {}

	draw(game: Game) {
		let ship = (game.elements as ShapeWarsElements).ship;
		for (let i = 0; i < ship.lives; i++) {
			ship.shape.draw(game.gc, 30 + i * 30, 30, 0, 0.5);
		}
	}
}


class Scoring implements GameElement {
	step(game: Game) {}
	draw(game: Game) {}
}


class Messages implements GameElement {
	step(game: Game) {}
	draw(game: Game) {}
}
