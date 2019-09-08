
export type PerDifficulty<T> = [ T, T, T, T, T, T ];

/**
 * Represents a cursed chest that can be found in a given biome
 */
export interface CursedChestData {
	/** Chance (percent) of the chest spawning */
	chance: number;

	/** Number of boss cells needed to access the chest */
	cellsNeeded: number;
}

/**
 * Represents a specific exit between levels
 */
export interface ExitData {
	/** How many boss cells are required to access this exit */
	requiresCells: number;

	/** Where does the exit spawn */
	from: BiomeData;

	/** Where does the exit go to */
	to: BiomeData;
}

/**
 * Represents a specific biome
 *
 * TODO: Add shop data?
 */
export interface BiomeData {
	/** The full text name of the biome */
	name: string;

	/** Is this biome a boss room */
	isBoss: boolean;

	/** If this biome is a boss, the boss' name */
	bossName?: string;

	/** The range of enemy tiers in this biome for each difficulty */
	enemyTiers: PerDifficulty<[ number, number ]>;

	/** The base gear level in this biome for each difficulty */
	gearLevels: PerDifficulty<number>;

	/** The number of scrolls in the biome (not counting cursed chests or challenge rooms) */
	scrolls: {
		/** The number of two-stat scrolls */
		twoStat: number;

		/** The number of three-stat scrolls */
		threeStat: number;
	};

	/** A list of all the exits that lead into this biome */
	entrances: ExitData[],

	/** A list of all the exits that lead out of this biome */
	exits: ExitData[],

	/** All of the cursed chests that can spawn in this biome */
	cursedChests: CursedChestData[];
}





// 
// Biomes
// 

export const prisonersQuarters: BiomeData = {
	name: 'The Prisoners\' Quarters',
	isBoss: false,
	enemyTiers: [
		[ 1, 1 ],
		[ 2, 4 ],
		[ 4, 7 ],
		[ 5, 9 ],
		[ 6, 11 ],
		[ 6, 11 ]
	],
	gearLevels: [ 1, 1, 1, 2, 4, 4 ],
	scrolls: {
		twoStat: 0,
		threeStat: 2
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [ ]
};

export const promenadeOfTheCondemned: BiomeData = {
	name: 'The Promenade of the Condemned',
	isBoss: false,
	enemyTiers: [
		[ 2, 4 ],
		[ 5, 8 ],
		[ 8, 12 ],
		[ 11, 14 ],
		[ 13, 17 ],
		[ 13, 17 ]
	],
	gearLevels: [ 2, 2, 2, 3, 5, 5 ],
	scrolls: {
		twoStat: 2,
		threeStat: 1
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [
		{ chance: 10, cellsNeeded: 0 }
	]
};

export const toxicSewers: BiomeData = {
	name: 'The Toxic Sewers',
	isBoss: false,
	enemyTiers: [
		[ 2, 5 ],
		[ 5, 9 ],
		[ 9, 12 ],
		[ 11, 15 ],
		[ 13, 18 ],
		[ 13, 18 ]
	],
	gearLevels: [ 2, 2, 2, 3, 5, 5 ],
	scrolls: {
		twoStat: 2,
		threeStat: 1
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [
		{ chance: 100, cellsNeeded: 2 },
		{ chance: 100, cellsNeeded: 4 },
		{ chance: 10, cellsNeeded: 0 }
	]
};

export const prisonDepths: BiomeData = {
	name: 'Prison Depths',
	isBoss: false,
	enemyTiers: [
		[ 6, 9 ],
		[ 10, 12 ],
		[ 14, 17 ],
		[ 19, 21 ],
		[ 22, 24 ],
		[ 22, 24 ]
	],
	gearLevels: [ 3, 3, 3, 4, 6, 6 ],
	scrolls: {
		twoStat: 0,
		threeStat: 1
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [
		{ chance: 100, cellsNeeded: 4 }
	]
};

export const ramparts: BiomeData = {
	name: 'Ramparts',
	isBoss: false,
	enemyTiers: [
		[ 5, 8 ],
		[ 8, 11 ],
		[ 13, 16 ],
		[ 16, 20 ],
		[ 19, 24 ],
		[ 19, 24 ]
	],
	gearLevels: [ 3, 3, 3, 4, 6, 6 ],
	scrolls: {
		twoStat: 2,
		threeStat: 2
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [
		{ chance: 100, cellsNeeded: 3 },
		{ chance: 100, cellsNeeded: 4 },
		{ chance: 33, cellsNeeded: 0}
	]
};

export const ancientSewers: BiomeData = {
	name: 'Ancient Sewers',
	isBoss: false,
	enemyTiers: [
		[ 6, 10 ],
		[ 10, 13 ],
		[ 15, 19 ],
		[ 16, 20 ],
		[ 20, 24 ],
		[ 20, 24 ]
	],
	gearLevels: [ 3, 3, 3, 4, 6, 6 ],
	scrolls: {
		twoStat: 0,
		threeStat: 4
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [
		{ chance: 100, cellsNeeded: 1 },
		{ chance: 100, cellsNeeded: 3 },
		{ chance: 33, cellsNeeded: 0}
	]
};

export const ossuary: BiomeData = {
	name: 'Ossuary',
	isBoss: false,
	enemyTiers: [
		[ 8, 10 ],
		[ 11, 14 ],
		[ 14, 17 ],
		[ 17, 20 ],
		[ 19, 23 ],
		[ 19, 23 ]
	],
	gearLevels: [ 4, 4, 4, 5, 7, 7 ],
	scrolls: {
		twoStat: 1,
		threeStat: 3
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [
		{ chance: 100, cellsNeeded: 2 },
		{ chance: 100, cellsNeeded: 4 },
		{ chance: 33, cellsNeeded: 0}
	]
};

export const blackBridge: BiomeData = {
	name: 'Black Bridge',
	isBoss: true,
	bossName: 'Concierge',
	enemyTiers: [
		[ 10, 10 ],
		[ 16, 16 ],
		[ 21, 21 ],
		[ 24, 24 ],
		[ 28, 28 ],
		[ 28, 28 ]
	],
	gearLevels: [ 3, 3, 3, 4, 6, 6 ],
	scrolls: {
		twoStat: 0,
		threeStat: 0
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [ ]
};

export const insufferableCrypt: BiomeData = {
	name: 'Insufferable Crypt',
	isBoss: true,
	bossName: 'Conjonctivius',
	enemyTiers: [
		[ 11, 11 ],
		[ 16, 16 ],
		[ 21, 21 ],
		[ 24, 24 ],
		[ 28, 28 ],
		[ 28, 28 ]
	],
	gearLevels: [ 3, 3, 3, 4, 6, 6 ],
	scrolls: {
		twoStat: 0,
		threeStat: 0
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [ ]
};

export const stiltVillage: BiomeData = {
	name: 'Stilt Village',
	isBoss: false,
	enemyTiers: [
		[ 11, 13 ],
		[ 16, 19 ],
		[ 22, 25 ],
		[ 26, 29 ],
		[ 27, 31 ],
		[ 27, 31 ]
	],
	gearLevels: [ 4, 4, 4, 5, 7, 7 ],
	scrolls: {
		twoStat: 1,
		threeStat: 3
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [
		{ chance: 100, cellsNeeded: 2 },
		{ chance: 100, cellsNeeded: 3 },
		{ chance: 100, cellsNeeded: 0}
	]
};

export const graveyard: BiomeData = {
	name: 'Graveyard',
	isBoss: false,
	enemyTiers: [
		[ 11, 13 ],
		[ 16, 19 ],
		[ 22, 25 ],
		[ 25, 29 ],
		[ 28, 32 ],
		[ 28, 32 ]
	],
	gearLevels: [ 4, 4, 4, 5, 7, 7 ],
	scrolls: {
		twoStat: 1,
		threeStat: 3
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [
		{ chance: 100, cellsNeeded: 0 },
		{ chance: 100, cellsNeeded: 0 },
		{ chance: -1, cellsNeeded: 0}
	]
};

export const slumberingSanctuary: BiomeData = {
	name: 'Slumbering Sanctuary',
	isBoss: false,
	enemyTiers: [
		[ 11, 13 ],
		[ 17, 19 ],
		[ 22, 24 ],
		[ 26, 29 ],
		[ 28, 32 ],
		[ 28, 32 ]
	],
	gearLevels: [ 4, 4, 4, 5, 7, 7 ],
	scrolls: {
		twoStat: 1,
		threeStat: 3
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [
		{ chance: 100, cellsNeeded: 1 },
		{ chance: 100, cellsNeeded: 0 }
	]
};

export const forgottenSepulcher: BiomeData = {
	name: 'Forgotten Sepulcher',
	isBoss: false,
	enemyTiers: [
		[ 11, 13 ],
		[ 17, 19 ],
		[ 22, 24 ],
		[ 26, 29 ],
		[ 28, 32 ],
		[ 28, 32 ]
	],
	gearLevels: [ 5, 5, 5, 6, 8, 8 ],
	scrolls: {
		twoStat: 0,
		threeStat: 5
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [
		{ chance: 100, cellsNeeded: 0 },
		{ chance: 100, cellsNeeded: 1 }
	]
};

export const clockTower: BiomeData = {
	name: 'Clock Tower',
	isBoss: false,
	enemyTiers: [
		[ 14, 16 ],
		[ 21, 23 ],
		[ 27, 30 ],
		[ 30, 33 ],
		[ 33, 38 ],
		[ 33, 38 ]
	],
	gearLevels: [ 5, 5, 5, 6, 8, 8 ],
	scrolls: {
		twoStat: 3,
		threeStat: 2
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [
		{ chance: 100, cellsNeeded: 0 }
	]
};

export const cavern: BiomeData = {
	name: 'Cavern',
	isBoss: false,
	enemyTiers: [
		[ 14, 18 ],
		[ 21, 21 ],
		[ 28, 28 ],
		[ 31, 35 ],
		[ 34, 38 ],
		[ 34, 38 ]
	],
	gearLevels: [ 7, 7, 7, 8, 10, 10 ],
	scrolls: {
		twoStat: 2,
		threeStat: 3
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [
		{ chance: 100, cellsNeeded: 4 }
	]
};

export const clockRoom: BiomeData = {
	name: 'Clock Room',
	isBoss: true,
	bossName: 'The Time Keeper',
	enemyTiers: [
		[ 20, 20 ],
		[ 26, 26 ],
		[ 33, 33 ],
		[ 35, 35 ],
		[ 41, 41 ],
		[ 41, 41 ]
	],
	gearLevels: [ 5, 5, 5, 6, 8, 8 ],
	scrolls: {
		twoStat: 0,
		threeStat: 0
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [ ]
};

export const guardiansHaven: BiomeData = {
	name: 'Guardian\'s Haven',
	isBoss: true,
	bossName: 'The Giant',
	enemyTiers: [
		[ 21, 21 ],
		[ 27, 27 ],
		[ 35, 35 ],
		[ 36, 36 ],
		[ 44, 44 ],
		[ 44, 44 ]
	],
	gearLevels: [ 7, 7, 7, 8, 10, 10 ],
	scrolls: {
		twoStat: 0,
		threeStat: 0
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [ ]
};

export const highPeakCastle: BiomeData = {
	name: 'High Peak Castle',
	isBoss: false,
	enemyTiers: [
		[ 17, 21 ],
		[ 25, 30 ],
		[ 33, 35 ],
		[ 35, 38 ],
		[ 40, 44 ],
		[ 40, 44 ]
	],
	gearLevels: [ 6, 6, 6, 7, 9, 9 ],
	scrolls: {
		twoStat: 2,
		threeStat: 2
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [ ]
};

export const throneRoom: BiomeData = {
	name: 'Throne Room',
	isBoss: true,
	bossName: 'Hand of the King',
	enemyTiers: [
		[ 23, 23 ],
		[ 31, 31 ],
		[ 33, 33 ],
		[ 39, 39 ],
		[ 44, 44 ],
		[ 44, 44 ]
	],
	gearLevels: [ 6, 6, 6, 7, 9, 9 ],
	scrolls: {
		twoStat: 0,
		threeStat: 0
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [ ]
};

export const astrolab: BiomeData = {
	name: 'Astrolab',
	isBoss: false,
	enemyTiers: [
		[ 23, 23 ],
		[ 31, 31 ],
		[ 37, 37 ],
		[ 39, 39 ],
		[ 44, 46 ],
		[ 44, 46 ]
	],
	gearLevels: [ 7, 7, 7, 8, 10, 10 ],
	scrolls: {
		twoStat: 2,
		threeStat: 0
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [ ]
};

export const observatory: BiomeData = {
	name: 'Observatory',
	isBoss: true,
	bossName: 'The Collector',
	enemyTiers: [
		[ 25, 25 ],
		[ 34, 34 ],
		[ 39, 39 ],
		[ 42, 42 ],
		[ 47, 47 ],
		[ 47, 47 ]
	],
	gearLevels: [ 7, 7, 7, 8, 10, 10 ],
	scrolls: {
		twoStat: 0,
		threeStat: 0
	},
	entrances: [ ],
	exits: [ ],
	cursedChests: [ ]
};





/**
 * List of all the biomes in the game
 */
export const biomes: BiomeData[] = [
	prisonersQuarters,
	promenadeOfTheCondemned,
	toxicSewers,
	prisonDepths,
	ramparts,
	ancientSewers,
	ossuary,
	blackBridge,
	insufferableCrypt,
	stiltVillage,
	graveyard,
	slumberingSanctuary,
	forgottenSepulcher,
	clockTower,
	cavern,
	clockRoom,
	guardiansHaven,
	highPeakCastle,
	throneRoom,
	astrolab,
	observatory
];





// 
// Exits
// 

export const quatersToPromenade: ExitData = {
	requiresCells: 0,
	from: prisonersQuarters,
	to: promenadeOfTheCondemned
};

export const quatersToToxicSewers: ExitData = {
	requiresCells: 0,
	from: prisonersQuarters,
	to: toxicSewers
};

export const promenadeToPrisonDepths: ExitData = {
	requiresCells: 0,
	from: promenadeOfTheCondemned,
	to: prisonDepths
};

export const promenadeToRamparts: ExitData = {
	requiresCells: 0,
	from: promenadeOfTheCondemned,
	to: ramparts
};

export const promenadeToOssuary: ExitData = {
	requiresCells: 0,
	from: promenadeOfTheCondemned,
	to: ossuary
};

export const toxicSewerToRamparts: ExitData = {
	requiresCells: 0,
	from: toxicSewers,
	to: ramparts
};

export const toxicSewerToAncientSewer: ExitData = {
	requiresCells: 0,
	from: toxicSewers,
	to: ancientSewers
};

export const prisonDepthsToOssuary: ExitData = {
	requiresCells: 0,
	from: prisonDepths,
	to: ossuary
};

export const prisonDepthsToAncientSewer: ExitData = {
	requiresCells: 1,
	from: prisonDepths,
	to: ancientSewers
};

export const rampartsToBridge: ExitData = {
	requiresCells: 0,
	from: ramparts,
	to: blackBridge
};

export const rampartsToCrypt: ExitData = {
	requiresCells: 3,
	from: ramparts,
	to: insufferableCrypt
}

export const ossuaryToBridge: ExitData = {
	requiresCells: 0,
	from: ossuary,
	to: blackBridge
};

export const ancientSewerToCrypt: ExitData = {
	requiresCells: 0,
	from: ancientSewers,
	to: insufferableCrypt
};

export const bridgeToStiltVillage: ExitData = {
	requiresCells: 0,
	from: blackBridge,
	to: stiltVillage
};

export const bridgeToSanctuary: ExitData = {
	requiresCells: 0,
	from: blackBridge,
	to: slumberingSanctuary
};

export const cryptToSanctuary: ExitData = {
	requiresCells: 0,
	from: insufferableCrypt,
	to: slumberingSanctuary
};

export const cryptToGraveyard: ExitData = {
	requiresCells: 0,
	from: insufferableCrypt,
	to: graveyard
};

export const stiltVillageToClockTower: ExitData = {
	requiresCells: 0,
	from: stiltVillage,
	to: clockTower
};

export const stiltVillageToSepulcher: ExitData = {
	requiresCells: 0,
	from: stiltVillage,
	to: forgottenSepulcher
};

export const sanctuaryToClockTower: ExitData = {
	requiresCells: 0,
	from: slumberingSanctuary,
	to: clockTower
};

export const sanctuaryToSepulcher: ExitData = {
	requiresCells: 0,
	from: slumberingSanctuary,
	to: forgottenSepulcher
};

export const sanctuaryToCavern: ExitData = {
	requiresCells: 2,
	from: slumberingSanctuary,
	to: cavern
};

export const graveyardToSepulcher: ExitData = {
	requiresCells: 0,
	from: graveyard,
	to: forgottenSepulcher
};

export const graveyardToCavern: ExitData = {
	requiresCells: 0,
	from: graveyard,
	to: cavern
};

export const clockTowerToClockRoom: ExitData = {
	requiresCells: 0,
	from: clockTower,
	to: clockRoom
};

export const sepulcherToClockRoom: ExitData = {
	requiresCells: 0,
	from: forgottenSepulcher,
	to: clockRoom
};

export const sepulcherToGuardiansHaven: ExitData = {
	requiresCells: 2,
	from: forgottenSepulcher,
	to: guardiansHaven
};

export const cavernToGuardiansHaven: ExitData = {
	requiresCells: 0,
	from: cavern,
	to: guardiansHaven
};

export const clockRoomToCastle: ExitData = {
	requiresCells: 0,
	from: clockRoom,
	to: highPeakCastle
};

export const guardiansHavenToCastle: ExitData = {
	requiresCells: 0,
	from: guardiansHaven,
	to: highPeakCastle
};

export const castleToThroneRoom: ExitData = {
	requiresCells: 0,
	from: highPeakCastle,
	to: throneRoom
};

export const throneRoomToAstrolab: ExitData = {
	requiresCells: 5,
	from: throneRoom,
	to: astrolab
};

export const astrolabToObservatory: ExitData = {
	requiresCells: 0,
	from: astrolab,
	to: observatory
};





/**
 * List of all exits
 */
export const exits: ExitData[] = [
	quatersToPromenade,
	quatersToToxicSewers,
	promenadeToPrisonDepths,
	promenadeToRamparts,
	promenadeToOssuary,
	toxicSewerToRamparts,
	toxicSewerToAncientSewer,
	prisonDepthsToOssuary,
	prisonDepthsToAncientSewer,
	rampartsToBridge,
	rampartsToCrypt,
	ossuaryToBridge,
	ancientSewerToCrypt,
	bridgeToStiltVillage,
	bridgeToSanctuary,
	cryptToSanctuary,
	cryptToGraveyard,
	stiltVillageToClockTower,
	stiltVillageToSepulcher,
	sanctuaryToClockTower,
	sanctuaryToSepulcher,
	sanctuaryToCavern,
	graveyardToSepulcher,
	graveyardToCavern,
	clockTowerToClockRoom,
	sepulcherToClockRoom,
	sepulcherToGuardiansHaven,
	cavernToGuardiansHaven,
	clockRoomToCastle,
	guardiansHavenToCastle,
	castleToThroneRoom,
	throneRoomToAstrolab,
	astrolabToObservatory
];



// Assign all the exits to the biomes they apply to

exits.forEach((exit) => {
	exit.from.exits.push(exit);
	exit.to.entrances.push(exit);
});
