
import { app } from '../app';

export class PageHome extends HTMLElement {
	constructor() {
		super();

		this.innerHTML = `
			<img class="logo" src="/images/logo.png" />
			<p>
				The Dead Cells Lab is a tool to help you plan out your runs. It contains tools to plan out routes,
				test out different weapon / affix / stat combos, etc.
			</p>
		`;
	}

	private connectedCallback() {
		// 
	}

	private disconnectedCallback() {
		// 
	}

	private attributeChangedCallback(attrName: string, oldValue: string, newValue: string) {
		// 
	}
}

customElements.define('dc-page-home', PageHome);
