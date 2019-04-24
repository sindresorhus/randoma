import ColorClass = require('color');

declare namespace Randoma {
	interface Options {
		/**
		[Initialization seed.](https://en.wikipedia.org/wiki/Random_seed) Multiple instances of `Randoma` with the same seed will generate the same random numbers.
		*/
		readonly seed: string | number;
	}

	type Color = ColorClass;
}

declare class Randoma {
	/**
	@returns A random seed you could use in the `seed` option if you for some reason don't want deterministic randomness.
	*/
	static seed(): number;

	/**
	User-friendly [pseudorandom number generator (PRNG)](https://en.wikipedia.org/wiki/Pseudorandom_number_generator).

	This is not cryptographically secure.

	@example
	```
	import Randoma = require('randoma');

	const random = new Randoma({seed: 10});

	random.integer();
	//=> 2027521326

	random.integer();
	//=> 677268843

	(new Randoma({seed: '🦄'}).integer());
	//=> 1659974344

	(new Randoma({seed: '🦄'}).integer());
	//=> 1659974344
	```
	*/
	constructor(options: Randoma.Options);

	integer(): number;
	integerInRange(min: number, max: number): number;
	float(): number;
	floatInRange(min: number, max: number): number;
	boolean(): boolean;
	arrayItem<T>(array: readonly T[]): T;
	date(): Date;
	dateInRange(startDate: Date, endDate: Date): Date;

	/**
	@param saturation - Saturation percentage in the range `0...1`. Default: `0.5`.
	@returns A random [aesthetically pleasing color](https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/) as a [`color`](https://github.com/Qix-/color) object.

	@example
	```
	random.color(0.5).hex().toString()
	//=> '#AAF2B0'
	```
	*/
	color(saturation?: number): Randoma.Color;
}

export = Randoma;
