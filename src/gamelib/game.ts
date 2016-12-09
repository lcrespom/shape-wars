export interface GameElement {
	step: (game: Game) => void;
	draw: (game: Game) => void;
	dead?: boolean;
}


export interface GameElements {
	[prop: string]: GameElement;
}


export class Game {
	gc: CanvasRenderingContext2D;
	time: number;
	fps = 0;
	cpu = 0;

	constructor(public canvas: HTMLCanvasElement, public elements: GameElements) {
		let ctx = this.canvas.getContext('2d');
		if (!ctx)
			throw Error('Could not setup canvas');
		this.gc = ctx;
		this.time = Date.now();
	}

	loop(cb?: () => void) {
		window.requestAnimationFrame(_ => {
			let tBefore = Date.now();
			this.step();
			this.draw();
			this.calcTime(tBefore);
			if (cb) cb();
			this.loop(cb);
		});
	}

	step() {
		for (let key of Object.keys(this.elements))
			this.elements[key].step(this);
	}

	draw() {
		this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (let key of Object.keys(this.elements))
			this.elements[key].draw(this);
	}

	calcTime(tBefore: number) {
		let now = Date.now();
		let elapsed = now - this.time;
		this.time = now;
		this.fps = 1000 / elapsed;
		this.cpu = (now - tBefore) / elapsed;
	}
}


export class ElementGroup implements GameElement {
	items: GameElement[];

	constructor() {
		this.items = [];
	}

	step(game: Game) {
		for (let item of this.items)
			item.step(game);
	}

	draw(game: Game) {
		this.items = this.items.filter(item => !item.dead);
		for (let item of this.items)
			item.draw(game);
	}

	add(element: GameElement) {
		this.items.push(element);
	}

	forEach(cb: (ge: GameElement) => void) {
		this.items.forEach(item => {
			if (item instanceof ElementGroup)
				item.forEach(cb);
			else cb(item);
		});
	}

	find(cb: (ge: GameElement) => boolean): GameElement | undefined {
		let ge: GameElement | undefined = undefined;
		this.items.some(item => {
			if (item instanceof ElementGroup) {
				ge = item.find(cb);
				return ge !== undefined;
			}
			else {
				if (!cb(item))
					return false;
				ge = item;
				return true;
			}
		});
		return ge;
	}
}
