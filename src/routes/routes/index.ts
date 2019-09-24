
import './biome-box';
import './route-line';

import { app } from '../../app';
import { Route } from '../../objects/route';
import { Biome, Exit } from '../../objects/biome';
import { biomes, biomeId } from '../../biomes';
import { Difficulty } from '../../data/difficulties';
import { template, biomeHtml, routeLineHtml, scrollsTable } from './routes.html';
import { runWhenIdle } from '../../throttle';

const routeKey = 'route';

export class PageRoutes extends HTMLElement {
	private readonly biomeNodes: HTMLDivElement[] = [ ];
	private readonly biomeNodesByBiome: Map<Biome, HTMLDivElement> = new Map();
	private readonly biomesByNode: Map<HTMLDivElement, Biome> = new Map();
	private readonly route: Route = new Route();

	private details: HTMLDivElement;
	private biomes: HTMLDivElement;
	private routeLines: HTMLDivElement;
	private offsetX: number;
	private offsetY: number;

	constructor() {
		super();

		if (app.query.has(routeKey)) {
			try {
				this.route.deserialize(app.query.get(routeKey));
			}

			catch (error) {
				// We just catch here so invalid route string don't crash
			}
		}

		this.render();
	}

	private connectedCallback() {
		window.addEventListener('resize', this.onResize);
		window.addEventListener('mousemove', this.onMouseMove);
	}

	private disconnectedCallback() {
		window.removeEventListener('resize', this.onResize);
		window.removeEventListener('mousemove', this.onMouseMove);
	}

	private attributeChangedCallback(attrName: string, oldValue: string, newValue: string) {
		// 
	}

	private render() {
		this.renderTemplate();
		this.findNodes();
		this.renderBiomes();
		this.renderExitLines();
		this.renderDetails();
	}

	/**
	 * Render the basic component template
	 */
	private renderTemplate() {
		this.innerHTML = template;
	}

	/**
	 * Find all of the relevant nodes and store them
	 */
	private findNodes() {
		// Find the node where we render the route details
		this.details = this.querySelector('.details');

		// Find the node we store biome boxes in
		this.biomes = this.querySelector('.biomes');

		// Find the node we store our lines in
		this.routeLines = this.querySelector('.route-lines');
	}

	/**
	 * Renders the biome boxes
	 */
	private renderBiomes() {
		let html = '';

		biomes.forEach((biome) => {
			html += biomeHtml(biome, this.route.difficulty, this.route.biomeSet.has(biome));
		});

		this.biomes.innerHTML = html;

		this.biomeNodes.splice(0, this.biomeNodes.length);
		this.biomeNodesByBiome.clear();
		this.biomesByNode.clear();

		// Build up our lists of biomes to nodes
		biomes.forEach((biome) => {
			const id = biomeId(biome);
			const node = this.querySelector<HTMLDivElement>(`#${id}`);

			this.biomeNodes.push(node);
			this.biomeNodesByBiome.set(biome, node);
			this.biomesByNode.set(node, biome);
		});
	}

	/**
	 * Renders the exit lines between the biomes
	 */
	private renderExitLines() {
		const containerBox = this.routeLines.getBoundingClientRect();

		this.offsetY = containerBox.top;
		this.offsetX = containerBox.left;

		let lines = '';

		biomes.forEach((biome) => {
			biome.exits(this.route.difficulty).forEach((exit, index) => {
				lines += this.renderExitLine(exit.from, exit.to, index, exit);
			});
		});

		this.routeLines.innerHTML = lines;
	}

	/**
	 * Renders an individual exit line between the given two biomes
	 */
	private renderExitLine(biomeA: Biome, biomeB: Biome, index: number, exit: Exit) {
		const boxA = this.biomeNodesByBiome.get(biomeA).getBoundingClientRect();
		const boxB = this.biomeNodesByBiome.get(biomeB).getBoundingClientRect();

		const boxACenterX = boxA.left + boxA.width / 2;
		const boxBCenterX = boxB.left + boxB.width / 2;

		const top = boxA.bottom - this.offsetY;
		const height = boxB.top - boxA.bottom;
		const left = Math.min(boxACenterX, boxBCenterX) - this.offsetX;
		const width = Math.abs(boxACenterX - boxBCenterX);
		const dir = boxA.left < boxB.left
			? 'right'
			: boxB.left < boxA.left
				? 'left' : 'down';

		const inRoute = this.route.hasExit(exit);
		const className = `color-${index + 1} ${biomeId(biomeA)} ${biomeId(biomeB)}`;

		return routeLineHtml(dir, top, left, height, width, className, inRoute);
	}

	private renderDetails() {
		const scrolls = this.route.scrolls();

		this.details.innerHTML = `
			<aside>
				<section>
					<h3>Route</h3>
					<ol id="route-biomes">
						${this.route.biomes.map((biome) => `<li>${biome.name}</li>`).join('')}
					</ol>
				</section>

				<section>
					<h3>Scrolls</h3>
					<table id="route-scrolls">
						${scrollsTable(scrolls)}
					</table>
				</section>
			</aside>
		`;
	}

	private readonly onResize = runWhenIdle(100, () => {
		// Redraw the lines on resize, because they are absolutely positioned by px
		this.renderExitLines();
	});

	private readonly onMouseMove = runWhenIdle(20, (event: MouseEvent) => {
		// When a biome box is hovered, set an attribute for that biome so that we can
		// fade out all non-connected exit lines, and bolden the connected ones
		const target = document.elementFromPoint(event.clientX, event.clientY);
		const biomeNode = this.biomeNodes.find((biome) => {
			return biome === target || biome.contains(target);
		});

		if (biomeNode) {
			this.routeLines.setAttribute('hovered-biome', biomeNode.id);
		}

		else {
			this.routeLines.removeAttribute('hovered-biome');
		}
	});
}

customElements.define('dc-page-routes', PageRoutes);
