export class BasePage {
  
  public pages = {
    home: '/',
    todoList: '/examples/react/dist',
  }

  constructor() {}

  public navigateTo(url: string): void {
    cy.visit(Cypress.env("baseUrl") + url);
  }
}