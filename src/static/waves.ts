import { Shape } from '../gamelib/shape';
import { Route } from '../wave';


// -------------------- Enemy shapes and colors --------------------

function shuffle(aIn: any[]): any[] {
	let a = [...aIn];	// Copy array to make function pure
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
	return a;
}

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

let enemyRoutes = [
	routeN, routeИ, routeU, routeV, routeC, routeD
];

/* ToDo:
	- Routes: loop / inverted loop
	- Random entry point for routes (within a range)
	- Fully random routes
	- Random squadron selection
	- Waves!
	- Boss wave :-)
	- Create harder version of existing route by multiplying speed & acceleration
*/

function initWave(w: number) {
	let squadrons: any[] = [];
	let i = 0;
	for (let route of enemyRoutes) {
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


// ToDo: random init squadrons

export default {
	squadrons: initWave(1)
};
