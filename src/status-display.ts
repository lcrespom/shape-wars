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
	/*
	Cool fonts:
		https://fonts.google.com/selection?
			category=Display,Monospace&
			selection.family=Electrolize|Geostar+Fill|Kelly+Slab|Press+Start+2P|Revalia|VT323
	 */
	step(game: Game) {}

	draw(game: Game) {
		let score = (game.elements as ShapeWarsElements).ship.score;
		let txt = '' + score;
		prepareFont(game.gc, 28);
		let w = game.gc.measureText(txt).width;
		game.gc.fillText(txt, game.gc.canvas.width - w - 20, 40);
	}
}


class Messages implements GameElement {
	step(game: Game) {}

	draw(game: Game) {
		let gameOver = (game.elements as ShapeWarsElements).ship.gameOver;
		if (!gameOver) return;
		let txt = 'GAME OVER';
		prepareFont(game.gc, 50);
		let w = game.gc.measureText(txt).width;
		let x = game.gc.canvas.width / 2 - w / 2;
		let y = game.gc.canvas.height / 2;
		game.gc.fillText(txt, x, y);
	}
}


function prepareFont(gc: CanvasRenderingContext2D, size: number) {
	gc.font = `${size}px 'Geostar Fill'`;
	gc.fillStyle = 'white';
}
