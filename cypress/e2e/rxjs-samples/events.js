import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

describe('Test Observable Events', () => {
	it('click event', () => {
		cy.visit('cypress/html/index.html');
		cy.get('[name="submit"]').then($el => {
			const click$ = fromEvent($el, 'click');
			click$.subscribe(evt => {
				console.log(`Click co-ordinates:  ${evt.clientX} - ${evt.clientY}`);
			});
		});
	});

	it('mouse move event', () => {
		cy.visit('cypress/html/index.html');
		cy.get('.container').then($el => {
			const click$ = fromEvent($el, 'mousemove');
			click$.subscribe(evt => {
				console.log(`Click co-ordinates:  ${evt.clientX} - ${evt.clientY}`);
			});
		});
	});

	it.only('key down event', () => {
		cy.visit('cypress/html/index.html');
		cy.get('[name="firstname"]').then($el => {
			const click$ = fromEvent($el, 'keydown');
			click$.subscribe(evt => {
				console.log(`Key down event triggered:  ${evt.key}`);
			});
		});
	});
	it('should handle click event using RxJS', () => {
		cy.visit('https://example.cypress.io/todo');

		cy.get('.dropdown-toggle').then($button => {
			const click$ = fromEvent($button, 'click');

			click$
				//.pipe(filter(event => event.clientX < 700 && event.clientY < 700))
				.subscribe(() => {
					// Handle the click event
					// You can perform assertions or any other actions here
					cy.log('Button clicked!');
				});

			$button.click();
		});
	});

	it('should handle keydown event using RxJS', () => {
		cy.visit('https://example.cypress.io/todo');

		cy.get('[data-test="new-todo"]').then($input => {
			const keydown$ = fromEvent($input, 'keydown');
			const mouseMove$ = fromEvent($input, 'mousemove');

			keydown$.subscribe(event => {
				const key = event.key;
				cy.log(`Keydown event is triggered =  ${key}`);
			});

			mouseMove$.subscribe(event => {
				const { clientX, clientY } = event;
				cy.log(`Mousemove event: x=${clientX}, y=${clientY}`);
			});

			cy.get('[data-test="new-todo"]').then($element => {
				$element.val('Hello World');
				$element.trigger('keydown', { key: 'Enter' });
				$element.trigger('keydown', { key: 'Enter' });
				$element.trigger('mousemove', { key: 'mousemove' });
			});
		});
	});
});
