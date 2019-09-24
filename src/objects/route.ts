
import { Biome, Exit } from './biome';
import { Difficulty } from '../data/difficulties';
import { ScrollCount } from './scroll-count';
import { prisonersQuarters, biomes } from '../biomes';

export class Route {
	public readonly biomes: Biome[] = [ prisonersQuarters ];
	public readonly biomeSet: Set<Biome> = new Set([ prisonersQuarters ]);
	public difficulty: Difficulty = Difficulty.Normal;

	/**
	 * Removes all biomes (except the entry point) from the route
	 */
	public reset() {
		this.biomes.splice(1, this.biomes.length);
	}

	/**
	 * 
	 */
	public setRoute(biomes: Biome[]) {
		this.biomes.splice(0, this.biomes.length);

		biomes.forEach((biome) => {
			this.biomes.push(biome);
			this.biomeSet.add(biome);
		});
	}

	/**
	 * Selects a biome to be used in the route. If this biome is incompatible with other
	 * already selected biomes, those biomes will be removed from the route
	 *
	 * @param biome The biome to be added to the route
	 */
	public selectBiome(biome: Biome) {
		// 
	}

	/**
	 * Selects the difficulty level for the route. This will influence what exits are available
	 * for use, and how many scrolls are found in each biome. If any part of the route is incompatible
	 * with this level (due to using exits that are no longer available). thos biomes will be
	 * removed from the route.
	 *
	 * @param level The difficulty level to select
	 */
	public selectDifficulty(level: Difficulty) {
		const needsCleanupCheck = level >= this.difficulty;

		this.difficulty = level;

		// Run through the route, checking to see if any of the exits taken are no longer available
		if (needsCleanupCheck) {
			for (let i = 1; i < this.biomes.length; i++) {
				const next = this.biomes[i];
				const prev = this.biomes[i - 1];

				// If at any point we find an exit that cannot be taken, we remove it and everything
				// after it to leave an incomplete, but valid route
				if (! prev.exits(level).some((exit) => exit.to === next)) {
					this.biomes.splice(i, this.biomes.length);

					break;
				}
			}
		}
	}

	/**
	 * Get a count of the available scrolls to be found on this route
	 */
	public scrolls() : ScrollCount {
		const count: ScrollCount = {
			trueMax: { twoStat: 0, threeStat: 0 },
			max:     { twoStat: 0, threeStat: 0 },
			unlucky: { twoStat: 0, threeStat: 0 },
			noCurse: { twoStat: 0, threeStat: 0 }
		};

		this.biomes.forEach((biome) => {
			const scrolls = biome.scrolls(this.difficulty);

			count.trueMax.twoStat += scrolls.trueMax.twoStat;
			count.trueMax.threeStat += scrolls.trueMax.threeStat;
			count.max.twoStat += scrolls.max.twoStat;
			count.max.threeStat += scrolls.max.threeStat;
			count.unlucky.twoStat += scrolls.unlucky.twoStat;
			count.unlucky.threeStat += scrolls.unlucky.threeStat;
			count.noCurse.twoStat += scrolls.noCurse.twoStat;
			count.noCurse.threeStat += scrolls.noCurse.threeStat;
		});

		return count;
	}

	/**
	 * Determines if the given biome can be reached on the set difficulty
	 *
	 * @param biome The biome to check
	 */
	public isReachable(biome: Biome) {
		return this.canReachBiome(biome, prisonersQuarters);
	}

	/**
	 * Checks if a given exit is used in the route
	 *
	 * @param exit The exit to check for
	 */
	public hasExit(exit: Exit) {
		for (let i = 0; i < this.biomes.length; i++) {
			const biome = this.biomes[i];

			if (exit.from === biome) {
				const next = this.biomes[i + 1];

				if (exit.to === next) {
					return true;
				}

				return false;
			}
		}

		return false;
	}

	/**
	 * Returns a serialized string representing this route
	 */
	public serialize() {
		const ids = this.biomes.map((biome) => biomes.indexOf(biome));

		return `${this.difficulty}:${ids.join(',')}`;
	}

	/**
	 * Parses a serialized route string and applies the level/biomes to the route
	 *
	 * @param serialized The serialized route string to parse
	 */
	public deserialize(serialized: string) {
		const [ difficulty, ids ] = serialized.split(':');

		this.selectDifficulty(parseInt(difficulty, 10));
		
		const route = ids.split(',').map((id) => {
			return biomes[id];
		});

		this.setRoute(route);
	}

	/**
	 * Determines if a biome can be reached from another biome on the set difficulty
	 *
	 * @param biome The biome to try to reach
	 * @param from The biome to start from
	 */
	private canReachBiome(biome: Biome, from: Biome) {
		return from.exits(this.difficulty).some((exit) => {
			if (exit.to === biome) {
				return true;
			}

			return this.canReachBiome(biome, exit.to);
		});
	}
}
