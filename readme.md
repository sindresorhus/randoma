# randoma [![Build Status](https://travis-ci.org/sindresorhus/randoma.svg?branch=master)](https://travis-ci.org/sindresorhus/randoma)

> User-friendly [pseudorandom number generator (PRNG)](https://en.wikipedia.org/wiki/Pseudorandom_number_generator)

This is not cryptographically secure.


## Install

```
$ npm install randoma
```


## Usage

```js
const Randoma = require('randoma');

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


## API

### `const random = new Randoma(options)`

#### options

Type: `Object`

##### seed

*Required*<br>
Type: `string` `integer`

[Initialization seed.](https://en.m.wikipedia.org/wiki/Random_seed) Multiple instances of `Randoma` with the same seed will generate the same random numbers.

#### random.integer()
#### random.integerInRange(min, max)
#### random.float()
#### random.floatInRange(min, max)
#### random.boolean()
#### random.date()
#### random.dateInRange(startDate, endDate)

*"Pull request welcome" for additional commonly used random methods.*

### Randoma.seed()

Returns a random seed you could use in the `seed` option if you for some reason don't want deterministic randomness.


## Related

- [park-miller](https://github.com/sindresorhus/park-miller) - Park-Miller pseudorandom number generator (PRNG)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
