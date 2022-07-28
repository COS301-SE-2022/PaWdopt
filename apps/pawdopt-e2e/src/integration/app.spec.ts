import { type } from "os";

describe.skip('Adopter Use Case', () => {
  it('should add adopter', () => {
    cy.visit("/login");
    cy.get("#signup-link").click();
    cy.url().should('include', '/signup');
    // Fill in form
    cy.get('#username-field > .native-input').type('Testerman');
    cy.get('#password-field > .native-input').type('123456');
    cy.get('#re-enter-password-field > .native-input').type('123456');
    cy.get('#idnum-field > .native-input').type('123456789012');
    cy.get('#email-field > .native-input').type('testerman@ci.mintemail.com');
    // Check
    cy.get('#username-field > .native-input').should('have.value', 'Testerman');
    cy.get('#password-field > .native-input').should('have.value', '123456');
    cy.get('#re-enter-password-field > .native-input').should('have.value', '123456');
    cy.get('#idnum-field > .native-input').should('have.value', '123456789012');
    cy.get('#email-field > .native-input').should('have.value', 'testerman@ci.mintemail.com');
    // Submit
    // cy.get('#create-account-button').click();
  });

  it('should login as adopter', () => {
    cy.visit('/login');
    cy.get('#email-field > .native-input').type('testerman@ci.mintemail.com');
    cy.get('#password-field > .native-input').type('123456');
    cy.get('#email-field > .native-input').should('have.value', 'testerman@ci.mintemail.com');
    cy.get('#password-field > .native-input').should('have.value', '123456');
    cy.get('#login-button').click();
    cy.url().should('include', '/home');
  });

  it.skip('should swipe on some cards', () => {
      cy.get("#like-button").click();
      cy.get(".card").last().should("not.be.visible")
      // cy.get("#dislike-button").click();
      cy.get("#like-button").click();
      cy.get(".card").last().prev().should("not.be.visible");
  });

  it.skip('should retry a dog', () => {
      cy.get("#refresh-button").click();
      cy.get(".card").last().prev().should("be.visible");
      cy.get("#like-button").click();
  });

  it('should navigate to userlikes', () => {
      cy.get("#tab-button-liked").click();
      cy.url().should("include", "/userlikes");
  });

  it('should search for dogs', () => {
      cy.get(".searchbar-input").type("c");
  });
  
  it('should go to a liked dogs profile', () => {
      cy.get(".thefront > .button > b").first().click();
      cy.url().should("include", "/orgprofile");
  });

  it('should log out of the adopter from their profile', () => {
    cy.get("pawdopt-orgprofile.ion-page > .header-md > .toolbar-title-default > .buttons-last-slot > .ion-color").click();
    cy.get("#signout-org-button").click();
    cy.url().should("include", "/login");
  });







  // it('should retry', (){
  //     cy.get("")
  // });


});

describe('OrgMember Use Case', () => {
  it('should login as org member', () => {
    cy.visit('/login');
    cy.get('#email-field > .native-input').type('krabs@krusty.com');
    cy.get('#password-field > .native-input').type('123456');
    cy.get('#email-field > .native-input').should('have.value', 'krabs@krusty.com');
    cy.get('#password-field > .native-input').should('have.value', '123456');
    cy.get('#login-button').click();
    cy.url().should('include', '/owneddogs');
  });

  it.skip('should add some dogs', () => {
    cy.get("#add-dog-button").click();
    cy.url().should("include", "/adddog");
    cy.get('#name-field > .native-input').type('Poggers');
    cy.get('#breed-field > .native-input').type('Pug');
    cy.get('#gender-field > .native-input').type('Male');
    cy.get('#age-field > .native-input').type('2021-01-12');
    cy.get('#about-field > .native-input').type('Absolutely the best');
    cy.get('#height-field > .native-input').type('20');
    cy.get('#weight-field > .native-input').type('2');
    cy.get('#furlength-field > .native-input').type('Short');
    cy.get('#temperament-field > .native-input').type('Friendly');
  });

  it('search dogs', () => {
    cy.get(".searchbar-input").type("c");
  });

  it('should go to a dog profile', () => {
    cy.get(':nth-child(7) > .thecard > .thefront > .ion-float-left').click();
    // cy.url().should("include", "/dogprofile");
  });
});