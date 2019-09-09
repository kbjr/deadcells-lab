
import { app } from '../app';

export class PageItems extends HTMLElement {
	constructor() {
		super();

		this.innerHTML = `
			<img class="logo" src="/images/logo.png" />
			<p>
				This page is still under development
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

customElements.define('dc-page-items', PageItems);
