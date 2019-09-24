
import { BiomeData, ExitData } from '../data/biomes';
import { Difficulty } from '../data/difficulties';
import { ScrollCount } from './scroll-count';
import { CursedChest } from './cursed-chest';

const exitsByData: Map<ExitData, Exit> = new Map();
const biomesByData: Map<BiomeData, Biome> = new Map();

export class Biome {
	public readonly name: string;
	public readonly isBoss: boolean;
	public readonly bossName: string;
	public readonly cursedChests: readonly CursedChest[];

	constructor(private readonly data: BiomeData) {
		if (biomesByData.has(data)) {
			return biomesByData.get(data);
		}

		biomesByData.set(data, this);

		this.name = data.name;
		this.isBoss = data.isBoss;
		this.bossName = data.bossName;
		this.cursedChests = Object.freeze(
			data.cursedChests.map((curse) => new CursedChest(curse))
		);
	}

	/**
	 * Gets the base gear level for this biome
	 *
	 * @param level The difficulty level to get data for
	 */
	public gearLevel(level: Difficulty) : number {
		return this.data.gearLevels[level];
	}

	/**
	 * Returns a formatted string representing the range of enemy tiers in the biome
	 *
	 * @param level The difficulty level to get data for
	 */
	public enemyTiers(level: Difficulty) : string {
		const tiers = this.data.enemyTiers[level];

		if (tiers[0] === tiers[1]) {
			return String(tiers[0]);
		}

		return `${tiers[0]} - ${tiers[1]}`;
	}

	/**
	 * Returns the number of available scrolls in the biome
	 *
	 * @param level The difficulty level to get data for
	 */
	public scrolls(level: Difficulty) : ScrollCount {
		const scrolls = this.data.scrolls;

		const count: ScrollCount = {
			trueMax: { twoStat: scrolls.twoStat, threeStat: scrolls.threeStat },
			max:     { twoStat: scrolls.twoStat, threeStat: scrolls.threeStat },
			unlucky: { twoStat: scrolls.twoStat, threeStat: scrolls.threeStat },
			noCurse: { twoStat: scrolls.twoStat, threeStat: scrolls.threeStat }
		};

		// Add one three-stat to the true max for possible challenge room (unless this is a boss)
		if (! this.data.isBoss) {
			count.trueMax.threeStat++;
		}

		// Account for cursed chests
		this.cursedChests.forEach((curse) => {
			if (curse.cellsNeeded <= level) {
				count.max.threeStat++;
				count.trueMax.threeStat++;
				
				if (curse.chance === 100) {
					count.unlucky.threeStat++;
				}
			}
		});

		return count;
	}

	/**
	 * Returns a list of all entrances leading to this biome
	 *
	 * @param level The difficulty level to get data for
	 */
	public entrances(level: Difficulty) : Exit[] {
		const exits: Exit[] = [ ];

		this.data.entrances.forEach((exit) => {
			if (exit.cellsNeeded <= level) {
				exits.push(new Exit(exit));
			}
		});

		return exits;
	}

	/**
	 * Returns a list of all exits leading out of this biome
	 *
	 * @param level The difficulty level to get data for
	 */
	public exits(level: Difficulty) : Exit[] {
		const exits: Exit[] = [ ];

		this.data.exits.forEach((exit) => {
			if (exit.cellsNeeded <= level) {
				exits.push(new Exit(exit));
			}
		});

		return exits;
	}
}

/**
 * Represents an exit from one biome to another
 */
export class Exit {
	public readonly from: Biome;
	public readonly to: Biome;
	public readonly cellsNeeded: Difficulty;

	constructor(private readonly data: ExitData) {
		if (exitsByData.has(data)) {
			return exitsByData.get(data);
		}


		exitsByData.set(data, this);

		this.from = new Biome(data.from);
		this.to = new Biome(data.to);
		this.cellsNeeded = data.cellsNeeded;
	}
}
