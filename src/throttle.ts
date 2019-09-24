
import { Func, Params } from './func';

export const runWhenIdle = <F extends Func>(waitTime: number, func: F) => {
	type P = Params<F>;

	let args: any[];
	let timer;

	const call = () => {
		return func(...args);
	};

	return (..._args: P) => {
		args = _args;

		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(call, waitTime);
	};
};
