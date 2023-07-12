import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

describe('Marble Diagram Test', () => {
	let scheduler;

	beforeEach(() => {
		scheduler = new TestScheduler((actual, expected) => {
			expect(actual).to.deep.equal(expected);
		});
	});

	it('should double the values and log the process', () => {
		scheduler.run(({ cold, expectObservable }) => {
			const source$ = cold('--a--b--c--|', { a: 2, b: 4, c: 8 });
			const expected$ = '--x--y--z--|';

			const result$ = source$.pipe(
				map(value => {
					cy.log(`Doubling value ${value}`);
					return value * 2;
				})
			);

			expectObservable(result$).toBe(expected$, { x: 4, y: 8, z: 16 });
		});
	});
});
