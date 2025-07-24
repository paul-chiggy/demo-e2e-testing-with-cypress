import { BasePage } from "./base.page";
import { Locators } from "../locators/locators";

export class TodoListPage extends BasePage {

    private locators = new Locators();

    constructor() {
        super();
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

    public verifyTotalTodosCount(count: number): void {
        cy.get(this.locators.todoListContainer)
            .find(this.locators.todoItem)
            .should('have.length', count);
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