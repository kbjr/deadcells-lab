
import { Biome } from './objects/biome';
import {
	prisonersQuarters as prisonersQuartersData,
	promenadeOfTheCondemned as promenadeOfTheCondemnedData,
	toxicSewers as toxicSewersData,
	prisonDepths as prisonDepthsData,
	ramparts as rampartsData,
	ancientSewers as ancientSewersData,
	ossuary as ossuaryData,
	blackBridge as blackBridgeData,
	insufferableCrypt as insufferableCryptData,
	stiltVillage as stiltVillageData,
	graveyard as graveyardData,
	slumberingSanctuary as slumberingSanctuaryData,
	forgottenSepulcher as forgottenSepulcherData,
	clockTower as clockTowerData,
	cavern as cavernData,
	clockRoom as clockRoomData,
	guardiansHaven as guardiansHavenData,
	highPeakCastle as highPeakCastleData,
	throneRoom as throneRoomData,
	astrolab as astrolabData,
	observatory as observatoryData
} from './data/biomes';

export const prisonersQuarters = new Biome(prisonersQuartersData);
export const promenadeOfTheCondemned = new Biome(promenadeOfTheCondemnedData);
export const toxicSewers = new Biome(toxicSewersData);
export const prisonDepths = new Biome(prisonDepthsData);
export const ramparts = new Biome(rampartsData);
export const ancientSewers = new Biome(ancientSewersData);
export const ossuary = new Biome(ossuaryData);
export const blackBridge = new Biome(blackBridgeData);
export const insufferableCrypt = new Biome(insufferableCryptData);
export const stiltVillage = new Biome(stiltVillageData);
export const graveyard = new Biome(graveyardData);
export const slumberingSanctuary = new Biome(slumberingSanctuaryData);
export const forgottenSepulcher = new Biome(forgottenSepulcherData);
export const clockTower = new Biome(clockTowerData);
export const cavern = new Biome(cavernData);
export const clockRoom = new Biome(clockRoomData);
export const guardiansHaven = new Biome(guardiansHavenData);
export const highPeakCastle = new Biome(highPeakCastleData);
export const throneRoom = new Biome(throneRoomData);
export const astrolab = new Biome(astrolabData);
export const observatory = new Biome(observatoryData);

export const biomes = [
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
