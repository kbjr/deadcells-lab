
import { CursedChestData } from '../data/biomes';
import { Difficulty } from '../data/difficulties';

export class CursedChest {
	constructor(private readonly data: CursedChestData) {
		// 
	}

	get chance() {
		return this.data.chance;
	}

	get chanceFormatted() {
		if (this.data.chance < 0) {
			return '??%';
		}

		return `${this.data.chance}%`;
	}

	get cellsNeeded() : Difficulty {
		return this.data.cellsNeeded;
	}
}
