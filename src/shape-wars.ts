import { ElementGroup, GameElements } from './gamelib/game';
import { Starfield } from './stars';
import { Ship } from './ship';

export interface ShapeWarsElements extends GameElements {
	stars: Starfield;
	ship: Ship;
	bullets: ElementGroup;
}

export function createElements(canvas): ShapeWarsElements {
	return {
		stars: new Starfield(canvas),
		ship: new Ship(canvas),
		bullets: new ElementGroup()
	};
}
