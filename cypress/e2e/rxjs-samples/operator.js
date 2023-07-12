import { interval, of } from 'rxjs';
import { take, filter, map } from 'rxjs/operators';

describe('Operator test', () => {
	it('Pipeable Operator test', () => {
		const myObs$ = interval(2000).pipe(take(10));

		myObs$.subscribe(sub => {
			console.log(sub);
		});
	});

	it.only('of and filter Operator test', () => {
		const myObs$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
			filter(f => f % 2),
			map(x => x * 100)
		);
		myObs$.subscribe(sub => {
			console.log(sub);
		});
	});
});
