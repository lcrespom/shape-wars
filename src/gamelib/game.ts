export interface GameElement {
	step: (game: Game) => void;
	dead?: boolean;
}


export class Game {
	gc: CanvasRenderingContext2D;
	time: number;
	fps = 0;
	cpu = 0;

	constructor(public canvas: HTMLCanvasElement, public elements: any) {
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
			this.calcTime(tBefore);
			if (cb) cb();
			this.loop(cb);
		});
	}

	step() {
		this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (let key of Object.keys(this.elements))
			this.elements[key].step(this);
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
		this.items = this.items.filter(item => !item.dead);
	}

	add(element: GameElement) {
		this.items.push(element);
	}
}
