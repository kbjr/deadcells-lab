
import './route-line';
import { biomes, biomeId } from '../../biomes';
import { Difficulty } from '../../data/difficulties';
import { Biome } from '../../objects/biome';
import { ScrollCount } from '../../objects/scroll-count';

export const template = `
	<div class="biome-flowchart">
		<div class="biomes"></div>
		<div class="route-lines"></div>
	</div>
	<div class="details"></div>
`;

export const biomeHtml = (biome: Biome, level: Difficulty, inRoute: boolean) => `
	<dc-biome-box id="${biomeId(biome)}" level="${level}" ${inRoute ? 'in-route' : ''}></dc-biome-box>
`;

export type RouteLineDir = 'left' | 'right' | 'down';

export const routeLineHtml = (dir: RouteLineDir, top: number, left: number, height: number, width: number, className: string, inRoute: boolean) => `
	<dc-route-line
		direction="${dir}"
		top="${top}"
		left="${left}"
		height="${height}"
		width="${width}"
		class="${className}"
		${inRoute ? 'in-route' : ''}
	>
	</dc-route-line>
`;

export const scrollsTable = (scrolls: ScrollCount) => `
	<thead>
		<tr>
			<td></td>
			<th>Three Stat</th>
			<th>Two Stat</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th title="The maxiumum possible scroll count, including random cursed chests and every possible challenge room">True Max</th>
			<td>${scrolls.trueMax.threeStat}</td>
			<td>${scrolls.trueMax.twoStat}</td>
		</tr>
		<tr>
			<th title="The maximum scroll count, including random cursed chests, but not possible challenge rooms">Max</th>
			<td>${scrolls.max.threeStat}</td>
			<td>${scrolls.max.twoStat}</td>
		</tr>
		<tr>
			<th title="The maximum scroll count if no random cursed chests spawn">Unlucky</th>
			<td>${scrolls.unlucky.threeStat}</td>
			<td>${scrolls.unlucky.twoStat}</td>
		</tr>
		<tr>
			<th title="The maximum scroll count if not taking any cursed chests">No Curse</th>
			<td>${scrolls.noCurse.threeStat}</td>
			<td>${scrolls.noCurse.twoStat}</td>
		</tr>
	</tbody>
`;
