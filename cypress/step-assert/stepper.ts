import { Locators } from "../locators/locators";

export class Stepper {
    public pages = {
        home: '/',
        todoList: '/examples/react/dist',
    }
    private locators = new Locators();

    constructor() {}

    public navigateTo(url: string): void {
        cy.visit(Cypress.env("baseUrl") + url);
    }

    public addTodoItem(todoText: string): void {
        cy.get(this.locators.todoInput).type(todoText);
        cy.get(this.locators.todoInput).type('{enter}');
    }

    public toggleAllTodosCompletion(): void {
        cy.get(this.locators.toggleAll).click();
    }

    public deleteTodoItem(todoText: string): void {
        cy.get(this.locators.todoItemLabel)
            .contains(todoText)
            .parent()
            .find(this.locators.todoItemDeleteButton)
            .invoke('show')
            .click();
    }

    public toggleTodoItemCompletion(todoText: string): void {
        cy.get(this.locators.todoItemLabel)
            .contains(todoText)
            .parent()
            .find(this.locators.todoItemToggle)
            .click();
    }

    public updateTodoItem(oldText: string, newText: string): void {
        cy.get(this.locators.todoItemLabel)
            .contains(oldText)
            .dblclick();
        cy.get(this.locators.todoInput)
            .last()
            .clear()
            .type(newText)
            .type('{enter}');
    }

    public clearCompletedTodos(): void {
        cy.get(this.locators.clearCompletedButton).click();
    }

    public filterCompletedTodos(): void {
        cy.get(this.locators.filterCompleted).click();
    }

    public filterActiveTodos(): void {
        cy.get(this.locators.filterActive).click();
    }

    public filterAllTodos(): void {
        cy.get(this.locators.filterAll).click();
    }

}