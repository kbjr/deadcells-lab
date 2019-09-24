
const strokeWidth = 6;

export class RouteLine extends HTMLElement {
	static readonly observedAttributes = [ 'top', 'left', 'height', 'width', 'direction' ];

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.render();
	}

	get direction() {
		return this.getAttribute('direction');
	}

	get top() {
		return parseInt(this.getAttribute('top'), 10);
	}

	get left() {
		return parseInt(this.getAttribute('left'), 10);
	}

	get height() {
		return parseInt(this.getAttribute('height'), 10);
	}

	get width() {
		return parseInt(this.getAttribute('width'), 10);
	}

	private connectedCallback() {
		// 
	}

	private disconnectedCallback() {
		// 
	}

	private attributeChangedCallback(attrName: string, oldValue: string, newValue: string) {
		this.render();
	}

	private render() {
		const css = this.getCss();

		switch (this.direction) {
			case 'left': {
				this.shadowRoot.innerHTML = `
					<style>${css}</style>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}" viewBox="0 0 ${this.width} ${this.height}">
						${this.drawLeftCurve()}
					</svg>
				`;
				break;
			}

			case 'right': {
				this.shadowRoot.innerHTML = `
					<style>${css}</style>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}" viewBox="0 0 ${this.width} ${this.height}">
						${this.drawRightCurve()}
					</svg>
				`;
				break;
			}

			case 'down': {
				this.shadowRoot.innerHTML = `
					<style>${css}</style>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${strokeWidth}" height="${this.height}" viewBox="0 0 ${strokeWidth} ${this.height}">
						${this.drawStraightLine()}
					</svg>
				`;
				break;
			}
		}
	}

	private getCss() {
		if (this.direction === 'down') {
			return `
				:host {
					display: block;
					position: absolute;
					top: ${this.top}px;
					left: ${this.left - (strokeWidth / 2)}px;
					width: ${strokeWidth}px;
					height: ${this.height}px;
				}

				:host path {
					stroke: currentColor;
					stroke-width: ${strokeWidth}px;
				}
			`;
		}

		return `
			:host {
				display: block;
				position: absolute;
				top: ${this.top}px;
				left: ${this.left}px;
				width: ${this.width}px;
				height: ${this.height}px;
			}

			:host path {
				stroke: currentColor;
				stroke-width: ${strokeWidth}px;
			}
		`;
	}

	private drawStraightLine() {
		const halfStroke = strokeWidth / 2;

		const start = this.pathM(halfStroke, 0);
		const lineDown = this.pathL(halfStroke, this.height);

		return `<path d="${start} ${lineDown}" fill="transparent"/>`;
	}

	private drawLeftCurve() {
		const w = this.width;
		const h = this.height;

		const halfStroke = strokeWidth / 2;
		const curveDist = h * 0.15;
		const lineDist = h - (curveDist * 2);

		// Starting point
		const x1 = w - halfStroke;
		const y1 = 0;

		// Straight line down
		const x2 = w - halfStroke;
		const y2 = lineDist;

		// Curve to the left
		const x3 = x2 - curveDist;
		const y3 = y2 + curveDist;
		const cx1 = x2;
		const cy1 = y3;

		// Straight line to the left
		const x4 = curveDist;
		const y4 = y3;

		// Curve back down
		const x5 = halfStroke;
		const y5 = h;
		const cx2 = x5;
		const cy2 = y4;

		const start = this.pathM(x1, y1);
		const lineDown = this.pathL(x2, y2);
		const curveLeft = this.pathC(x3, y3, cx1, cy1);
		const lineLeft = this.pathL(x4, y4);
		const curveDown = this.pathC(x5, y5, cx2, cy2);

		return `<path d="${start} ${lineDown} ${curveLeft} ${lineLeft} ${curveDown}" fill="transparent"/>`;
	}

	private drawRightCurve() {
		const w = this.width;
		const h = this.height;

		const halfStroke = strokeWidth / 2;
		const curveDist = h * 0.15;
		const lineDist = h - (curveDist * 2);

		// Starting point
		const x1 = halfStroke;
		const y1 = 0;

		// Straight line down
		const x2 = halfStroke;
		const y2 = lineDist;

		// Curve to the left
		const x3 = x2 + curveDist;
		const y3 = y2 + curveDist;
		const cx1 = x2;
		const cy1 = y3;

		// Straight line to the left
		const x4 = w - curveDist;
		const y4 = y3;

		// Curve back down
		const x5 = w - halfStroke;
		const y5 = h;
		const cx2 = x5;
		const cy2 = y4;

		const start = this.pathM(x1, y1);
		const lineDown = this.pathL(x2, y2);
		const curveLeft = this.pathC(x3, y3, cx1, cy1);
		const lineLeft = this.pathL(x4, y4);
		const curveDown = this.pathC(x5, y5, cx2, cy2);

		return `<path d="${start} ${lineDown} ${curveLeft} ${lineLeft} ${curveDown}" fill="transparent"/>`;
	}

	/**
	 * Draws the starting point of a path
	 *
	 * @param x The X coordinate
	 * @param y The Y coordinate
	 */
	private pathM(x: number, y: number) {
		return `M${x} ${y}`;
	}

	/**
	 * Draws a straight line of a path
	 *
	 * @param x The X coordinate to draw to
	 * @param y The Y coordinate to draw to
	 */
	private pathL(x: number, y: number) {
		return `L${x} ${y}`;
	}

	/**
	 * Draws a cubic curve of a path
	 *
	 * @param x The end point X coordinate
	 * @param y The end point Y coordinate
	 * @param cx1 The X coordinate of the first control point
	 * @param cy1 The Y coordinate of the first control point
	 * @param cx2 The X coordinate of the second control point (defaults to cx1)
	 * @param cy2 The Y coordinate of the second control point (defaults to cy1)
	 */
	private pathC(x: number, y: number, cx1: number, cy1: number, cx2: number = cx1, cy2: number = cy1) {
		return `C${cx1} ${cy1} ${cx2} ${cy2} ${x} ${y}`;
	}
}

customElements.define('dc-route-line', RouteLine);
