// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js
import './commands';
import { fromEvent } from 'rxjs';

// Custom command to listen for click events
Cypress.Commands.add('getClickStream', { prevSubject: true }, $subject => {
	//fromEvent:  first argument event target
	// As a second argument it takes string that indicates
	// type of event we want to listen for.
	return fromEvent($subject, 'click');
});

Cypress.Commands.add('customWait', { prevSubject: false }, duration => {
	return new Promise(resolve => {
		cy.wait(duration).then(() => {
			resolve();
		});
	});
});
