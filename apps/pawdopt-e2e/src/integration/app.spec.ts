
describe('Adopter Use Case', () => {
  it.skip('should add adopter', () => {
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

  it.skip('should login as adopter', () => {
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
      cy.get("#retry-button").click();
      cy.get(".card").last().should("be.visible");
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
      cy.get("ion-button").first().click();
      cy.url().should("include", "/orgprofile");
  });






  // it('should retry', (){
  //     cy.get("")
  // });


});

describe.skip('OrgMember Use Case', () => {
  it('should add org member', () => {
    cy.visit("/login");
    cy.get("#org-signup-link").click();
    cy.url().should('include', '/addorg');
    // Fill in form
    cy.get('#username-field > .native-input').type('Testerman');
    cy.get('#password-field > .native-input').type('123456');
    cy.get('#re-enter-password-field > .native-input').type('123456');
    cy.get('#idnum-field > .native-input').type('123456789012');
    cy.get('#email-field > .native-input').type('');
  });
});