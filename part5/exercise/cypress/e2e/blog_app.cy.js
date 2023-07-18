describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const users = [
      {
        username: 'johndoe',
        password: 'johndoe123',
        name: 'John Doe'
      },
      {
        username: 'janedoe',
        password: 'janedoe123',
        name: 'Jane Doe'
      }
    ];
    users.forEach((user) => {
      cy.request('POST', 'http://localhost:3003/api/users', user);
    });
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
      cy.get('[data-testid="loginButton"').click();
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'johndoe', password: 'johndoe123' });
      cy.createBlog({
        title: 'A Test Blog',
        author: 'John Doe',
        url: 'www.test.com'
      });
    });

    it('A blog can be created', function() {
      cy.contains('A Test Blog John Doe');
    });

    it('A user can like a blog', function() {
      cy.contains('A Test Blog').parent().find('button').as('blogParentButton');
      cy.get('@blogParentButton').contains('view').click();
      cy.get('@blogParentButton').contains('like').click();

      cy.get('[data-testid="blogLikes"]').should('contain', 'likes 1');
    });

    it('A user can delete their own created blogs', function() {
      cy.contains('A Test Blog').parent().as('blogViewParent');
      cy.get('@blogViewParent').find('button').contains('view').click();
      cy.get('@blogViewParent').find('button').contains('remove').click();

      cy.get('html').should('not.contain', 'A Test Blog');
    });

    it.only('A user can only see the delete button, not anyone else.', () => {
      cy.contains('A Test Blog').as('blogView');
      cy.get('@blogView').find('button').contains('view').click();
      cy.get('@blogView').find('button').contains('remove');
      cy.contains('John Doe logged in').find('button').contains('logout').click();

      cy.login({ username: 'janedoe', password: 'janedoe123' });

      cy.contains('Jane Doe logged in');
      cy.get('@blogView').should('not.contain', '[data-testid="removeButton"');
    });
  });
});