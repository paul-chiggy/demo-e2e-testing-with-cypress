import { Locators } from "../locators/locators";

export class Asserter {
    private locators = new Locators();

    constructor() {}

    public verifyActiveTodosCount(count: number): void {
        cy.get(this.locators.todoItemCount)
            .should('contain', `${count} item${count !== 1 ? 's' : ''} left!`);
    }

    public verifyEmptyTodoList(): void {
        cy.get(this.locators.todoList).should('not.be.visible');
    }

    public verifyActiveTodoItem(todoText: string): void {
        cy.get(this.locators.todoItemLabel)
            .contains(todoText)
            .should('be.visible');
        cy.get(this.locators.todoItemLabel)
            .contains(todoText)
            .parent()
            .parent()
            .should('not.have.class', 'completed'); 
    }

    public verifyAllTodoItemsCompleted(): void {
        cy.findAllByTestId('todo-item').should('have.class', 'completed');        
    }

    public verifyCompletedTodoItem(todoText: string): void {
        cy.get(this.locators.todoItemLabel)
            .contains(todoText)
            .parent()
            .parent()
            .should('have.class', 'completed'); 
    }

    public verifyTotalTodosCount(count: number): void {
        cy.get(this.locators.todoListContainer)
            .find(this.locators.todoItem)
            .should('have.length', count);
    }
}