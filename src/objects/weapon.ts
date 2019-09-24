
export enum ItemQuality {
	'' = 0,
	'+',
	'++',
	'S',
	'L',
}

const calculateDamage = (baseDamage: number, itemLevel: number, itemQuality: ItemQuality, scrolls: number) => {
	// Calculate the item damage modifier (eg. +25%)
	const level = itemLevel + itemQuality;
	const rawModifier = Math.floor((level - 1) / 2) * 25;
	const itemModifier = 1 + (rawModifier / 100);

	// Calculate the scroll damage modifier
	const scrollModifier = 1.15 ** scrolls;

	return {
		modifier: rawModifier ? `+${rawModifier}%` : '',
		damage: Math.round(baseDamage * itemModifier * scrollModifier)
	};
};
