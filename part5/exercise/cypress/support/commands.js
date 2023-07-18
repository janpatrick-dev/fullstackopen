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

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then((response) => {
    const user = response.body;
    localStorage.setItem('currentUser', JSON.stringify(user));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  }).then((response) => {
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('likeBlog', (selector) => {
  cy.get(selector).find('button').contains('view').click();
  cy.get(selector).find('button').contains('like').click();
  cy.get(selector).find('button').contains('hide').click();
});