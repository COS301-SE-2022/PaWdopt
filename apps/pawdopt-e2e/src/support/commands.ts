// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    swipe(direction: string): void;
  }
}

Cypress.Commands.add('swipe', (direction) => {
  if (direction === 'left') {
  cy.get('.swiper-slide-active')
    .trigger('mousedown', {position: "right"})
    .trigger('mousemove', {position: "left"})
    .trigger('mouseup', {force: true})
  } else if (direction === 'right') {
    cy.get('.swiper-slide-active')
    .trigger('mousedown', {position: "left"})
    .trigger('mousemove', {position: "right"})
    .trigger('mouseup', {force: true})
  }
});