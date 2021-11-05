import ParkMiller from 'park-miller';
import stringHash from '@sindresorhus/string-hash';
import color from 'color';

const MAX_INT32 = 2_147_483_647;
const GOLDEN_RATIO_CONJUGATE = 0.618_033_988_749_895;

export default class Randoma {
	static seed() {
		return Math.floor(Math.random() * MAX_INT32);
	}

	#random;

	constructor({seed}) {
		if (typeof seed === 'string') {
			seed = stringHash(seed);
		}

		if (!Number.isInteger(seed)) {
			throw new TypeError('Expected `seed` to be a `integer`');
		}

		this.#random = new ParkMiller(seed);
	}

	integer() {
		return this.#random.integer();
	}

	integerInRange(minimum, maximum) {
		return this.#random.integerInRange(minimum, maximum);
	}

	float() {
		return this.#random.float();
	}

	floatInRange(minimum, maximum) {
		return this.#random.floatInRange(minimum, maximum);
	}

	boolean() {
		return this.#random.boolean();
	}

	arrayItem(array) {
		return array[Math.floor(this.float() * array.length)];
	}

	date() {
		return new Date(Date.now() * this.float());
	}

	dateInRange(startDate, endDate) {
		return new Date(this.integerInRange(startDate.getTime(), endDate.getTime()));
	}

	color(saturation = 0.5) {
		let hue = this.float();
		hue += GOLDEN_RATIO_CONJUGATE;
		hue %= 1;

		return color({
			h: hue * 360,
			s: saturation * 100,
			v: 95,
		});
	}
}
