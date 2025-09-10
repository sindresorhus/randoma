import test from 'ava';
import is from '@sindresorhus/is';
import Randoma from './index.js';

const MAX_INT32 = 2_147_483_647;
const ITERATIONS = 1000;

function assertInteger(t, seed) {
	const random = new Randoma({seed});

	for (let index = 0; index < ITERATIONS; index++) {
		const result = random.integer();
		t.true(is.integer(result));
		t.true(result <= MAX_INT32);
	}
}

function assertIntegerInRange(t, seed) {
	const random = new Randoma({seed});
	const min = 33;
	const max = 2242;

	for (let index = 0; index < ITERATIONS; index++) {
		const result = random.integerInRange(min, max);
		t.true(is.integer(result));
		t.true(result >= min);
		t.true(result <= max);
	}
}

function assertFloat(t, seed) {
	const random = new Randoma({seed});

	for (let index = 0; index < ITERATIONS; index++) {
		const result = random.float();
		t.false(is.integer(result));
		t.true(result <= MAX_INT32);
	}
}

function assertFloatInRange(t, seed) {
	const random = new Randoma({seed});
	const min = 0.33;
	const max = 0.522_42;

	for (let index = 0; index < ITERATIONS; index++) {
		const result = random.floatInRange(min, max);
		t.false(is.integer(result));
		t.true(result >= min);
		t.true(result <= max);
	}
}

function assertBoolean(t, seed) {
	const random = new Randoma({seed});
	let average = 0;

	for (let index = 0; index < ITERATIONS; index++) {
		const result = random.boolean();
		t.true(is.boolean(result));
		average += result ? 1 : -1;
	}

	t.true(average < 10_000);
}

function assertArrayItem(t, seed) {
	const random = new Randoma({seed});
	const fixture = [1, 2, 3, 4, 5];
	const set = new Set();

	for (let index = 0; index < ITERATIONS; index++) {
		const result = random.arrayItem(fixture);
		t.true(is.number(result));
		set.add(result);
	}

	t.deepEqual([...set].sort(), fixture);
}

function assertDate(t, seed) {
	const random = new Randoma({seed});

	for (let index = 0; index < ITERATIONS; index++) {
		const result = random.date();
		t.true(is.date(result));
		t.true(is.function(result.getTime));
	}
}

function assertDateInRange(t, seed) {
	const random = new Randoma({seed});
	const startDate = new Date('2009');
	const endDate = new Date('2010');

	for (let index = 0; index < ITERATIONS; index++) {
		const result = random.dateInRange(startDate, endDate);
		t.true(is.date(result));
		t.true(result >= startDate);
		t.true(result <= endDate);
	}
}

function runFn(fn) {
	const random = new Randoma({seed: 33});
	const values = [];

	for (let index = 0; index < ITERATIONS; index++) {
		values.push(random[fn]());
	}

	return values;
}

function runAsserts(t, fn, assertFn) {
	const seeds = [
		0,
		1,
		10,
		-10,
		Number.MIN_SAFE_INTEGER,
		Number.MAX_SAFE_INTEGER,
	];

	for (const seed of seeds) {
		assertFn(t, seed);
	}

	if (['integer', 'float', 'boolean'].includes(fn)) {
		// Ensure it generates numbers deterministically
		t.deepEqual(runFn(fn), runFn(fn));
		t.deepEqual(runFn(fn), runFn(fn));
	}
}

test('.integer()', t => {
	runAsserts(t, 'integer', assertInteger);
});

test('.integerInRange()', t => {
	runAsserts(t, 'integerInRange', assertIntegerInRange);
});

test('.float()', t => {
	runAsserts(t, 'float', assertFloat);
});

test('.floatInRange()', t => {
	runAsserts(t, 'floatInRange', assertFloatInRange);
});

test('.boolean()', t => {
	runAsserts(t, 'boolean', assertBoolean);
});

test('.arrayItem()', t => {
	runAsserts(t, 'arrayItem', assertArrayItem);
});

test('.date()', t => {
	runAsserts(t, 'date', assertDate);
});

test('.dateInRange()', t => {
	runAsserts(t, 'dateInRange', assertDateInRange);
});

test('.color()', t => {
	const random = new Randoma({seed: 1});
	t.is(random.color(0.5).hex().toString(), '#B579F2');
});

test('.color() distribution', t => {
	// Test that first colors from different seeds have good distribution
	const colors = [];
	const seedCount = 1000;
	
	for (let seed = 0; seed < seedCount; seed++) {
		const random = new Randoma({seed});
		colors.push(random.color().hex());
	}
	
	const uniqueColors = new Set(colors);
	// Should have significantly more unique colors than the old buggy behavior (~57)
	// With the fix, we get ~685/1000 (68.5%), which is much better
	t.true(uniqueColors.size > 600); // Should have at least 600 unique colors out of 1000
});

test('string seed', t => {
	const seed = '🦄';

	const random = new Randoma({seed});
	t.not(random.integer(), random.integer());

	t.is(
		(new Randoma({seed})).integer(),
		(new Randoma({seed})).integer(),
	);
});

test('Randoma.seed()', t => {
	const seed = Randoma.seed();
	t.true(Number.isInteger(seed));

	const random = new Randoma({seed});
	t.not(random.integer(), random.integer());
});
