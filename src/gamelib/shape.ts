export interface Shape {
	paths: Path[];
	draw: (gc: CanvasRenderingContext2D, x: number, y: number) => void;
}

export interface Path {
	fillStyle: string;
	points: Point[];
}

export interface Point {
	x: number;
	y: number;
}

export function createShape(paths: Path[]): Shape {
	return {
		paths,
		draw(gc: CanvasRenderingContext2D, x: number, y: number) {
			for (let path of paths) {
				gc.beginPath();
				gc.fillStyle = path.fillStyle;
				gc.moveTo(x + path.points[0].x, y + path.points[0].y);
				for (let i = 1; i < path.points.length; i++)
					gc.lineTo(x + path.points[i].x, y + path.points[i].y);
				gc.closePath();
				gc.fill();
			}
		}
	};
}
