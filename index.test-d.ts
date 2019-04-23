import {expectType} from 'tsd';
import Randoma = require('.');

const options: Randoma.Options = {seed: 10};

const random = new Randoma(options);
new Randoma({seed: '🦄'});
new Randoma({seed: Randoma.seed()});

expectType<number>(random.integer());
expectType<number>(random.integerInRange(0, 1));
expectType<number>(random.float());
expectType<number>(random.floatInRange(0, 1));
expectType<boolean>(random.boolean());
expectType<string>(random.arrayItem(['🦄']));
expectType<Date>(random.date());
expectType<Date>(random.dateInRange(new Date(), new Date()));
expectType<Randoma.Color>(random.color());
random
	.color(0.5)
	.hex()
	.toString();
