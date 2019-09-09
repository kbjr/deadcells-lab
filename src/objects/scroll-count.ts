
/**
 * The number of scrolls found in a biome at a given difficulty.
 */
export interface ScrollCount {
	/** Absolute maximum number of scrolls possible */
	trueMax: { twoStat: number, threeStat: number };

	/** Maximum number of scrolls assuming no challenge rooms */
	max: { twoStat: number, threeStat: number };

	/** Maximum number of scrolls assuming no challenge rooms, and no random cursed chests */
	unlucky: { twoStat: number, threeStat: number };

	/** Maximum number of scrolls assuming no challenge rooms, and skipping cursed chests */
	noCurse: { twoStat: number, threeStat: number };
}
