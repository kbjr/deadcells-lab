
import { biomesById } from '../../biomes';
import { scrollsTable } from './routes.html';

export class BiomeBox extends HTMLElement {
	static readonly observedAttributes = [ 'biome' ];

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.render();
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

	public get biome() {
		return biomesById[this.id];
	}

	public get level() {
		return parseInt(this.getAttribute('level'));
	}

	private render() {
		this.shadowRoot.innerHTML = `
			<style>
				:host h3 {
					font-family: ATCKrueger, sans-serif;
					font-weight: bold;
					margin: 0;
					color: var(--color-white);
					font-size: 1.9rem;
				}

				:host table {
					color: var(--color-white);
					font-size: 0.75rem;
					text-align: center;
					margin: 0.5rem auto;
				}

					:host table th,
					:host table td {
						padding: 0.25rem;
					}

				@media (max-width: 800px) {
					:host table th {
						display: none;
					}
				}
			</style>
			<h3>${this.biome.name}</h3>
			<table>
				${scrollsTable(this.biome.scrolls(this.level))}
			</table>
		`;
	}
}

customElements.define('dc-biome-box', BiomeBox);
