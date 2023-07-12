import { Observable } from 'rxjs';
import { from } from 'rxjs';

describe('Observable test', () => {
	it('obersvable unsubscribe test ', () => {
		const myObs$ = new Observable(Obs => {
			Obs.next('start observable!!!');
			Obs.next('100');
			Obs.next('End Observable!!!');
			setTimeout(() => {
				Obs.next('400');
			}, 1000);
		});

		const thisData = myObs$.subscribe(sub => {
			console.log(sub);
		});
		thisData.unsubscribe();
	});
	it('obersvable error test ', () => {
		const myObs$ = new Observable(Obs => {
			Obs.next('start observable!!!');
			Obs.next('100');
			Obs.error('Error Received');
			Obs.next('200');
			Obs.next('End Observable!!!');
			Obs.complete();
		});

		const thisData = myObs$.subscribe(
			sub => {
				console.log(sub);
				cy.task('log', sub);
			},
			error => {
				console.log(error);
				cy.task('log', error);
			},
			complete => {
				console.log('done');
				cy.task('log', 'done');
			}
		);
	});

	it('obersvable complete test ', () => {
		const myObs$ = new Observable(Obs => {
			Obs.next('start observable!!!');
			Obs.next('100');
			Obs.next('200');
			Obs.complete();
			Obs.next('300');
			Obs.next('End Observable!!!');
		});

		const thisData = myObs$.subscribe(
			sub => {
				console.log(sub);
				cy.task('log', sub);
			},
			error => {
				console.log(error);
				cy.task('log', error);
			},
			complete => {
				console.log('done');
				cy.task('log', 'done');
			}
		);
	});

	it('obersvable async data test ', () => {
		const myObs$ = new Observable(Obs => {
			Obs.next('start observable!!!');
			Obs.next('100');
			setTimeout(() => {
				Obs.next('400');
			}, 1000);
			Obs.next('End Observable!!!');
			Obs.next('500');
		});

		const thisData = myObs$.subscribe(
			sub => {
				console.log(sub);
				cy.task('log', sub);
			},
			complete => {
				console.log('done');
				cy.task('log', 'done');
			}
		);
	});
	it('should receive random data using RxJS', () => {
		cy.visit('https://example.com');

		// Generate random data
		const generateRandomData = () => {
			const randomValue = Math.random();
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(randomValue);
				}, 8000);
			});
		};

		cy.wrap(generateRandomData(), { timeout: 10000 }).as('randomData');

		// Subscribe to the random data observable
		cy.get('@randomData').then(randomData => {
			from(Promise.resolve(randomData)).subscribe(data => {
				console.log('Received random data:', data);
				// Additional actions with the data
			});
		});
	});

	it.only('test observable with async data', () => {
		const observable = new Observable(subscriber => {
			subscriber.next(1);
			subscriber.next(2);
			subscriber.next(3);
			setTimeout(() => {
				subscriber.next(4);
				//subscriber.complete();
			}, 1000);

			setTimeout(() => {
				subscriber.next(5);
				subscriber.complete();
			}, 1000);
		});

		console.log('just before subscribe');
		observable.subscribe({
			next(x) {
				console.log('got value ' + x);
			},
			error(err) {
				console.error('something wrong occurred: ' + err);
			},
			complete() {
				console.log('done');
			},
		});
		console.log('just after subscribe');
	});
});
