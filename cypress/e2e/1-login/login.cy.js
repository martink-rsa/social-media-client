const BASE_URL = 'https://norofffeu.github.io/social-media-client/';

describe('Login form', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe('Login and Logout', () => {
    it('should log in using valid credentials', () => {
      cy.get('#loginEmail').type('student@noroff.no', { force: true });
      cy.get('#loginPassword').type('password123', { force: true });
      cy.get('#loginForm').submit({ force: true });
    });
    it('should log out successfully', () => {
      cy.get('button[data-auth="logout"]').click({ force: true });
      cy.url().should('eq', BASE_URL);
    });
  });

  describe('Invalid credentials', () => {
    it('should show an error message when using invalid credentials', () => {
      cy.get('#loginEmail').type('student@noroff.nox', { force: true });
      cy.get('#loginPassword').type('password123', { force: true });
      cy.get('#loginForm').submit({ force: true });
      cy.on('window:alert', (text) => {
        expect(text).to.contains(
          'Either your username was not found or your password is incorrect',
        );
      });
    });
  });
});
