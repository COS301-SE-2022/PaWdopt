
describe('Adopter Use Case', () => {

  it('should login as adopter', () => {
    cy.visit('/login');
    cy.get('#email-field > .native-input').type('Testerman');
    cy.get('#password-field > .native-input').type('123456');
    cy.get('#email-field > .native-input').should('have.value', 'Testerman');
    cy.get('#password-field > .native-input').should('have.value', '123456');
    cy.get('#login-button').click();
    cy.url().should('include', '/home');
  });

  it('should swipe on some cards', () => {
      cy.get("#like-button").click();
      cy.get(".card").last().should("not.be.visible")
      cy.get("#dislike-button").click();
      cy.get(".card").last().prev().should("not.be.visible");
  });

  // it('should retry', (){
  //     cy.get("")
  // });


});