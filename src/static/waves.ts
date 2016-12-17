import { Shape } from '../gamelib/shape';
import { Route } from '../wave';


function shuffle(aIn: any[]): any[] {
	let a = [...aIn];	// Copy array to make function pure
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
	return a;
}


// -------------------- Enemy shapes and colors --------------------

let fillStyles = [
	'#FF0040', '#FF0080', '#FF00FF', '#4080FF'
];

let enemyPoints = [
	{ x: 0, y: 0 },
	{ x: 30, y: 0 },
	{ x: 20, y: 30 },
	{ x: 10, y: 30 }
];

function initShapes(): Shape[] {
	let shapes: Shape[] = [];
	for (let fillStyle of fillStyles) {
		shapes.push(new Shape([{
			fillStyle,
			points: enemyPoints
		}]));
	}
	return shuffle(shapes);
}

let enemyShapes = initShapes();


// -------------------- Enemy routes --------------------

let routeC = new Route(460, -20, -2, 1, [
	{ steps: 36, ax: -0.2, ay: 0.1 },
	{ steps: 100, ax: 0.2, ay: 0 }
]);

let routeD = new Route(20, -20, 2, 1, [
	{ steps: 36, ax: 0.2, ay: 0.1 },
	{ steps: 100, ax: -0.2, ay: 0 }
]);

let routeU = new Route(20, -20, 2, 10, [
	{ steps: 1000, ax: 0, ay: -0.12 }
]);

let routeV = new Route(460, -20, -2, 10, [
	{ steps: 1000, ax: 0, ay: -0.11 }
]);

let routeИ = new Route(20, -20, 2, 11, [
	{ steps: 110, ax: 0, ay: -0.14 },
	{ steps: 500, ax: 0, ay: 0.14 },
]);

let routeN = new Route(460, -20, -2, 11, [
	{ steps: 110, ax: 0, ay: -0.14 },
	{ steps: 500, ax: 0, ay: 0.14 },
]);

let routeO = new Route(20, -20, 5.5, 11, [
	{ steps: 130, ax: -0.04, ay: -0.13 },
	{ steps: 500, ax: -0.06, ay: 0.16 },
]);

let routeQ = new Route(460, -20, -5.5, 11, [
	{ steps: 130, ax: 0.04, ay: -0.13 },
	{ steps: 500, ax: 0.06, ay: 0.16 },
]);

let enemyRoutes = [
	routeO, routeQ, routeN, routeИ, routeU, routeV, routeC, routeD
];

function initWave(w: number) {
	let squadrons: any[] = [];
	let i = 0;
	for (let route of shuffle(enemyRoutes)) {
		squadrons.push({
			route,
			shape: enemyShapes[i % enemyShapes.length],
			ships: 3 + w,
			steps: 22 - 2 * w,
			delay: 100 + i * 140 - 10 * w
		});
		i++;
	}
	return squadrons;
}


export default {
	squadrons: initWave(1)
};
