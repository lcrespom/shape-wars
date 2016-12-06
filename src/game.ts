export interface GameElement {
	step: (game: Game) => void;
}

export class Game {
	elements: any;
	gc: CanvasRenderingContext2D;
	time: number;
	fps = 0;
	cpu = 0;
	fpsct = 0;

	constructor(public canvas: HTMLCanvasElement) {
		let ctx = this.canvas.getContext('2d');
		if (!ctx)
			throw Error('Could not setup canvas');
		this.elements = {};
		this.gc = ctx;
		this.time = Date.now();
	}

	loop() {
		window.requestAnimationFrame(_ => {
			let tBefore = Date.now();
			this.step();
			this.calcTime(tBefore);
			this.loop();
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
		if ((++this.fpsct) == 25) {
			this.fpsct = 0;
			$('#fps').text(Math.round(this.fps));
			$('#cpu').text(Math.round(this.cpu * 100));
		}
	}
}


export function createGroup() {
	return {
		items: [],
		step(game: Game) {
			for (let item of this.items)
				item.step(game);
			this.items = this.items.filter(item => !item.dead);
		},
		add(element: GameElement) {
			this.items.push(element);
		}
	};
}
