'use strict';
const ParkMiller = require('park-miller');
const stringHash = require('@sindresorhus/string-hash');

const MAX_INT32 = 2147483647;

module.exports = class {
	constructor(options = {}) {
		let seed = options.seed;

		if (typeof seed === 'string') {
			seed = stringHash(seed);
		}

		if (!Number.isInteger(seed)) {
			throw new TypeError('Expected `seed` to be a `integer`');
		}

		this._random = new ParkMiller(seed);
	}

	integer() {
		return this._random.integer();
	}

	integerInRange(min, max) {
		return this._random.integerInRange(min, max);
	}

	float() {
		return this._random.float();
	}

	floatInRange(min, max) {
		return this._random.floatInRange(min, max);
	}

	boolean() {
		return this._random.boolean();
	}

	date() {
		return new Date(Date.now() * this.float());
	}

	dateInRange(startDate, endDate) {
		return new Date(this.integerInRange(startDate.getTime(), endDate.getTime()));
	}
};

module.exports.seed = () => Math.floor(Math.random() * MAX_INT32);
