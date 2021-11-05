import {expectType} from 'tsd';
import Randoma, {Options, Color} from './index.js';

const options: Options = {seed: 10};

const random = new Randoma(options);
new Randoma({seed: '🦄'}); // eslint-disable-line no-new
new Randoma({seed: Randoma.seed()}); // eslint-disable-line no-new

expectType<number>(random.integer());
expectType<number>(random.integerInRange(0, 1));
expectType<number>(random.float());
expectType<number>(random.floatInRange(0, 1));
expectType<boolean>(random.boolean());
expectType<string>(random.arrayItem(['🦄']));
expectType<Date>(random.date());
expectType<Date>(random.dateInRange(new Date(), new Date()));
expectType<Color>(random.color());
random
	.color(0.5)
	.hex()
	.toString();
