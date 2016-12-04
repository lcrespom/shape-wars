export interface GameElement {
	step: (game: Game) => void;
}

export interface Game {
	elements: any;
	canvas: HTMLCanvasElement;
	gc: CanvasRenderingContext2D;
	time: number;
	fps: number;
	cpu: number;
}


export function gameSetup(): Game {
	let canvas = $('#game-canvas')[0] as HTMLCanvasElement;
	let ctx = canvas.getContext('2d');
	if (!ctx)
		throw Error('Could not setup canvas');
	return {
		elements: {},
		canvas,
		gc: ctx,
		time: Date.now(),
		fps: 0,
		cpu: 0
	};
}

function gameStep(game: Game) {
	game.gc.clearRect(0, 0, game.canvas.width, game.canvas.height);
	for (let key of Object.keys(game.elements))
		game.elements[key].step(game);
}

let fpsCT = 0;

function gameTiming(game: Game, tBefore: number) {
	let now = Date.now();
	let elapsed = now - game.time;
	game.time = now;
	game.fps = 1000 / elapsed;
	game.cpu = (now - tBefore) / elapsed;
	if ((++fpsCT) == 25) {
		fpsCT = 0;
		$('#fps').text(Math.round(game.fps));
		$('#cpu').text(Math.round(game.cpu * 100));
	}
}

export function gameLoop(game: Game) {
	window.requestAnimationFrame(_ => {
		let tBefore = Date.now();
		gameStep(game);
		gameTiming(game, tBefore);
		gameLoop(game);
	});
}
