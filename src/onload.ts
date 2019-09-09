
let loaded = false;
const waiting: (() => void)[] = [ ];

window.addEventListener('load', () => {
	console.log('onload fired');
	
	loaded = true;
	waiting.forEach((func) => func());
});

export const onLoad = (func: () => void) => {
	if (loaded) {
		func();
	}

	else {
		waiting.push(func);
	}
};
