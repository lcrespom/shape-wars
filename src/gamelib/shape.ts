export interface Path {
	fillStyle: string;
	points: Point[];
}

export interface Point {
	x: number;
	y: number;
}

export class Shape {
	width: number;
	height: number;

	constructor(public paths: Path[]) {
		this.calcWidthHeight(paths);
		this.recenter();
	}

	calcWidthHeight(paths: Path[]) {
		let { x: minx, y: miny } = paths[0].points.reduce(
			(prev, curr) => ({
				x: Math.min(prev.x, curr.x),
				y: Math.min(prev.y, curr.y)
			}));
		let { x: maxx, y: maxy } = paths[0].points.reduce(
			(prev, curr) => ({
				x: Math.max(prev.x, curr.x),
				y: Math.max(prev.y, curr.y)
			}));
		this.width = maxx - minx;
		this.height = maxy - miny;
	}

	recenter() {
		this.paths.forEach(path => path.points.forEach(point => {
			point.x -= this.width / 2;
			point.y -= this.height / 2;
		}));
	}

	draw(gc: CanvasRenderingContext2D, x: number, y: number, angle = 0) {
		for (let path of this.paths) {
			gc.beginPath();
			gc.fillStyle = path.fillStyle;
			gc.translate(x, y);
			if (angle) gc.rotate(angle);
			gc.moveTo(path.points[0].x, path.points[0].y);
			for (let i = 1; i < path.points.length; i++)
				gc.lineTo(path.points[i].x, path.points[i].y);
			gc.closePath();
			gc.fill();
			gc.setTransform(1, 0, 0, 1, 0, 0);
		}
	}

	isOutside(canvas: HTMLCanvasElement, x: number, y: number) {
		return x + this.width < 0
			|| x - this.width > canvas.width
			|| y + this.height < 0
			|| y - this.height > canvas.height;
	}
}
