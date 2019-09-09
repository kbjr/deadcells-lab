
export enum Difficulty {
	Normal = 0,
	Hard = 1,
	VeryHard = 2,
	Expert = 3,
	Nightmare = 4,
	Hell = 5
}

export interface DifficultyLevel {
	level: Difficulty;
	name: string;
}

export const difficulties: DifficultyLevel[] = [
	{ level: 0, name: 'Normal' },
	{ level: 1, name: 'Hard' },
	{ level: 2, name: 'Very Hard' },
	{ level: 3, name: 'Expert' },
	{ level: 4, name: 'Nightmare' },
	{ level: 5, name: 'Hell' }
];
