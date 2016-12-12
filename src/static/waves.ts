import { Shape } from '../gamelib/shape';
import { Route, Squadron } from '../wave';

let routeC = new Route(20, -20, 2, 1, [
	{ steps: 36, ax: 0.2, ay: 0.1 },
	{ steps: 100, ax: -0.2, ay: 0 }
]);

let routeD = new Route(460, -20, -2, 1, [
	{ steps: 36, ax: -0.2, ay: 0.1 },
	{ steps: 100, ax: 0.2, ay: 0 }
]);

let routeU = new Route(20, -20, 2, 10, [
	{ steps: 1000, ax: 0, ay: -0.12 }
]);

let routeV = new Route(460, -20, -2, 10, [
	{ steps: 1000, ax: 0, ay: -0.11 }
]);

let enemyPoints = [
	{ x: 0, y: 0 },
	{ x: 30, y: 0 },
	{ x: 20, y: 30 },
	{ x: 10, y: 30 }
];

let enemyShape1 = new Shape([{
	fillStyle: '#FF0040',
	points: enemyPoints
}]);

let enemyShape2 = new Shape([{
	fillStyle: '#FF0080',
	points: enemyPoints
}]);

let enemyShape3 = new Shape([{
	fillStyle: '#FF00FF',
	points: enemyPoints
}]);


export default {
	squadrons: [
		{ route: routeU, shape: enemyShape3, ships: 5, steps: 20, delay: 120 },
		{ route: routeV, shape: enemyShape2, ships: 5, steps: 20, delay: 240 },
		{ route: routeC, shape: enemyShape1, ships: 5, steps: 20, delay: 370 },
		{ route: routeD, shape: enemyShape2, ships: 5, steps: 20, delay: 470 }
	]
};
