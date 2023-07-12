// In RxJS, a cold observable is an observable sequence
// that starts emitting values from the beginning each
// time it is subscribed to. This means that each subscriber
// receives the entire sequence of values from the
// beginning, regardless of when they subscribed.

// A hot observable in RxJS is an observable sequence
// that emits values regardless of whether there are any
// subscribers or not. It starts emitting values as soon
// as it is created, and subscribers that join later
// may miss some or all of the previously emitted values.

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

describe('Cold Observable test', () => {
	it('cold observable', () => {
		const coldObservable = new Observable(subscriber => {
			setTimeout(() => {
				subscriber.next(1);
			}, 1000);
			setTimeout(() => {
				subscriber.next(5);
			}, 1000);
			subscriber.next(2);
			subscriber.next(3);
			subscriber.complete();
		});

		// Subscriber 1
		coldObservable.subscribe({
			//next: value => console.log('Subscriber 1:', value),
			next(x) {
				console.log('got value ' + x);
			},
			complete() {
				console.log('Subscriber 1: Complete');
			},
		});

		// Subscriber 2
		coldObservable.subscribe({
			next: value => console.log('Subscriber 2:', value),
			complete: () => console.log('Subscriber 2: Complete'),
		});
	});
	it.only('hot observable test', () => {
		// Create a source observable
		const sourceObservable = interval(1000).pipe(take(5));

		// Create a subject
		const hotSubject = new Subject();

		// Subscribe the subject to the source observable
		sourceObservable.subscribe(hotSubject);

		// Subscriber 1
		hotSubject.subscribe({
			next: value => console.log('Subscriber 1:', value),
			complete: () => console.log('Subscriber 1: Complete'),
		});

		// Wait for 3 seconds
		setTimeout(() => {
			// Subscriber 2
			hotSubject.subscribe({
				next: value => console.log('Subscriber 2:', value),
				complete: () => console.log('Subscriber 2: Complete'),
			});
		}, 3000);
		// Since hotObservable is emitting values as soon as they are
		//  provided, both subscribers receive the values emitted
		//before they subscribed. The hot observable does not restart
		// or replay the sequence for each subscriber.

		// It's important to note that with hot observables,
		// subscribers that join after values have been emitted
		// may miss those emitted values. Hot observables
		// are often used in scenarios where you want to share
		// a single stream of events or data among multiple subscribers.
	});
});
