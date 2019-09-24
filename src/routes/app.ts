
import { onLoad } from '../onload';

const pageKey = 'page';
const defaultPage = 'home';

interface Page {
	component: string;
	subHeading: string;
}

interface Pages {
	[page: string]: Page;
}

export class DeadCellsApp extends HTMLElement {
	public page: string;
	public query: URLSearchParams;

	private readonly pages: Pages = { };

	constructor() {
		super();

		console.log('constructing app component');

		const query = new URLSearchParams(location.search);
		const page = query.has(pageKey) ? query.get(pageKey) : defaultPage;

		onLoad(() => this.renderPage(page, query));
	}

	private connectedCallback() {
		window.addEventListener('popstate', this.onPopState);
		window.addEventListener('click', this.onClick);
	}

	private disconnectedCallback() {
		window.removeEventListener('popstate', this.onPopState);
		window.removeEventListener('click', this.onClick);
	}

	private attributeChangedCallback(attrName: string, oldValue: string, newValue: string) {
		// 
	}

	get subHeading() {
		return document.querySelector<HTMLDivElement>('header .subheading').innerText;
	}

	set subHeading(text: string) {
		document.querySelector<HTMLDivElement>('header .subheading').innerHTML = text;
	}

	/**
	 * Navigate to the new given page (pushState)
	 *
	 * @param page The new page to navigate to
	 * @param values The new query string values
	 */
	public navigateTo(page: string, values: { }) {
		console.log('manual routing', { page, values });

		const query = new URLSearchParams();

		query.set(pageKey, page);

		Object.keys(values).forEach((key) => {
			query.set(key, values[key]);
		});

		this.updateHistory('pushState', query);
		this.renderPage(page, query);
	}

	/**
	 * Updates the query string data without adding a new record to history (replaceState)
	 *
	 * @param values The new query string values
	 */
	public updateQuery(values: { }) {
		console.log('updating querystring data', { values });

		this.query = new URLSearchParams();

		this.query.set(pageKey, this.page);

		Object.keys(values).forEach((key) => {
			this.query.set(key, values[key]);
		});

		this.updateHistory('replaceState', this.query);
	}

	/**
	 * Registers a new route in the router
	 *
	 * @param page The name of the page
	 * @param details Details of the page to be rendered for this route
	 */
	public registerPage(page: string, details: Page) {
		this.pages[page] = details;
	}

	/**
	 * Renders the given page with the given query params
	 *
	 * @param page The page to render
	 * @param query The query string data to use
	 */
	private renderPage(page: string, query: URLSearchParams) {
		console.log('rendering route', { page, query });

		this.page = page;
		this.query = query;

		const component = this.pages[page].component;

		this.subHeading = this.pages[page].subHeading;
		this.innerHTML = `<${component}></${component}>`;
	}

	/**
	 * Event method called when popstate event fires
	 */
	private onPopState = () => {
		console.log('location popstate event');

		const query = new URLSearchParams(location.search);
		const route = query.has(pageKey) ? query.get(pageKey) : defaultPage;

		this.renderPage(route, query);
	};

	/**
	 * Runs on click anywhere, used to capture local link clicks to handle navigation
	 * internally without page load
	 */
	private onClick = (event: MouseEvent) => {
		const link: HTMLAnchorElement = event.target as HTMLAnchorElement;

		if (link.tagName === 'A') {
			const isLocal = link.href.indexOf(location.origin) === 0;

			if (isLocal) {
				event.preventDefault();

				const query = new URLSearchParams('?' + link.href.split('?')[1]);

				console.log('navigating local link', { page: query.get(pageKey) });

				this.updateHistory('pushState', query);
				this.renderPage(query.get(pageKey), query);
			}
		}
	};

	private updateHistory(update: 'pushState' | 'replaceState', query: URLSearchParams) {
		const string = query.toString();

		history[update](null, null, '?' + string);
	}
}

customElements.define('dc-app', DeadCellsApp);
