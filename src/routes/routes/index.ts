
import { app } from '../../app';
import { html } from './routes.html';

export class PageRoutes extends HTMLElement {
	constructor() {
		super();

		this.innerHTML = html;
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

customElements.define('dc-page-routes', PageRoutes);
