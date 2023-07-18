describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'johndoe',
      password: 'johndoe123',
      name: 'John Doe'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('johndoe');
      cy.get('#password').type('johndoe123');
      cy.contains('login').click();

      cy.contains('John Doe logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('johndoe');
      cy.get('#password').type('wrongpassword');
      cy.contains('login').click();

      cy.get('.error')
        .should('contain', 'invalid credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });
});