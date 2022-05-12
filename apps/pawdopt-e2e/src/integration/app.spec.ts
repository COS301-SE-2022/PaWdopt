
describe('Login Page Tests', () => {
  beforeEach(() => cy.visit('/login'));

  it('is on login page', () => {
    cy.url().should('include', '/login');
  });

  it('should test successful login', () => {
    cy.get('#login-username > .native-input').type('Testerman');
    cy.get('#login-password > .native-input').type('123456');
    cy.get('#login-username > .native-input').should('have.value', 'Testerman');
    cy.get('#login-password > .native-input').should('have.value', '123456');
    cy.get('#login-button').click();
    cy.url().should('include', '/home');
  });

  it('should direct to signup', () => {
    cy.get('#signup-link').click();
    cy.url().should('include', '/signup');
  });

  it('should direct to add organisation', () => {
    cy.get('#add-org-link').click();
    cy.url().should('include', '/addorg');
  });


  // TODO Other Tests
  // it('should test login with Google', () => {});
  // it('should test login with Apple', () => {});

  // ** Negative tests
  // it('should test login with empty email', () => {});

  // it('should test login with empty password', () => {});

  // it('should test login with empty email and password', () => {});

  // it('should test login with invalid email', () => {});

  // it('should test login with invalid password', () => {
  //   cy.get('#login-email').type('john@testerman.test');
  //   cy.get('#login-password').type('not_the_right_password');
  //   cy.get('#login-email').should('have.value', 'john@testerman.test');
  //   cy.get('#login-password').should('have.value', 'not_the_right_password');
  //   cy.get('#login-submit').click();
  //   cy.url().should('include', '/login');
  // });

  // it('should test login with invalid email and password', () => {});

});

describe('Home Page Tests', () => {
  beforeEach(() => cy.visit('/home'));

  it('is on home page', () => {
    cy.url().should('include', '/home');
  });

  it('should test like', () => {
    cy.get(".swiper-wrapper").children().first().should('have.class', 'swiper-slide-active');
    cy.get("#like-button").click();
    cy.get(".swiper-wrapper").children().first().should('have.class', 'swiper-slide-prev');
  });

  it('should test dislike', () => {
    cy.get(".swiper-wrapper").children().first().should('have.class', 'swiper-slide-active');
    cy.get("#dislike-button").click();
    cy.get(".swiper-wrapper").children().first().should('have.class', 'swiper-slide-prev');  });

  it('should test refresh button', () => {
    cy.get(".swiper-wrapper").children().first().should('have.class', 'swiper-slide-active');
    cy.get("#refresh-button").click();
    cy.get(".swiper-wrapper").children().first().should('have.class', 'swiper-slide-active');
  });



  // TODO Other Tests
  // it('should test logout', () => {});

});

describe('Signup Page Tests', () => {
  beforeEach(() => cy.visit('/signup'));

  it('is on signup page', () => {
    cy.url().should('include', '/signup');
  });

  it('should test successful signup', () => {
    cy.get('#username-field > .native-input').type('Testerman');
    cy.get('#password-field > .native-input').type('123456');
    cy.get('#re-enter-password-field > .native-input').type('123456');
    cy.get('#dob-field > .native-input').type('01/01/1990');
    cy.get('#email-field > .native-input').type('testerman@test.test');
    cy.get('#create-account-button').click();

    //! TODO Signup validation popup

    cy.url().should('include', '/home');
  });

  it('should direct to login', () => {
    cy.get('#login-link').click();
    cy.url().should('include', '/login');
  });

  // TODO negative tests for invalid signups
});

describe('Add Organisation Page Tests', () => {
  beforeEach(() => cy.visit('/addorg'));

  it('is on add organisation page', () => {
    cy.url().should('include', '/addorg');
  });

  it('should test successful add organisation', () => {
    cy.get('#org-name-field > .native-input').type('Tester Co');
    cy.get('#password-field > .native-input').type('123456');
    cy.get('#re-enter-password-field > .native-input').type('123456');
    cy.get('#email-field > .native-input').type('testerman@testerco.com');
    cy.get('#add-org-button').click();

    //! TODO add company validation popup
    
    cy.url().should('include', '/dashboard');
  });

  it('should direct to login', () => {
    cy.get('#login-link').click();
    cy.url().should('include', '/login');
  });

  // TODO negative tests for invalid add organisation 
});

// describe('Dashboard Page Tests', () => {

// }

describe('Add Dog Page Tests', () => {
  beforeEach(() => cy.visit('/adddog'));
    
  it('is on add dog page', () => {
    cy.url().should('include', '/adddog');
  });

  it('should open image uploader', () => {
    cy.get('#image-upload-button').click();
    // TODO add upload image tests
    cy.get('.action-sheet-group-cancel > .action-sheet-button').click();
  });

  it('should test successful add dog', () => {
    cy.get('#name-field > .native-input').type('Chewy');
    cy.get('#name-field > .native-input').should('have.value', 'Chewy');
    cy.get('#breed-field > .native-input').type('Chihuahua');
    cy.get('#breed-field > .native-input').should('have.value', 'Chihuahua');
    cy.get('#gender-field > .native-input').type('male');
    cy.get('#gender-field > .native-input').should('have.value', 'male');
    cy.get('#age-field > .native-input').type('1');
    cy.get('#age-field > .native-input').should('have.value', '1');
    cy.get('#height-field > .native-input').type('15');
    cy.get('#height-field > .native-input').should('have.value', '15');
    cy.get('#weight-field > .native-input').type('2.6');
    cy.get('#weight-field > .native-input').should('have.value', '2.6');
    // TODO test int slider
    cy.get('#add-dog-button').click();
    // TODO add dog validation popup
    
    cy.url().should('include', '/dashboard');
  });
});

describe("Dashboard Page Tests", () => {
  beforeEach(() => cy.visit("/dashboard"));

  it("is on dashboard page", () => {
    cy.url().should("include", "/dashboard");
  });

  it("should test add dog", () => {
    cy.get("#add-dog-button").click();
    cy.url().should("include", "/adddog");
  });


  // TODO Other Tests
  // it("should test logout", () => {});
  // it("should test swipe approve", () => {});
  // it("should test swipe decline", () => {});
});
