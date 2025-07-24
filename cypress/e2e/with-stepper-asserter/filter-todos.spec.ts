import { Asserter } from "../../step-assert/asserter";
import { Stepper } from "../../step-assert/stepper";
import { todoItemsFilter } from "../../support/test-data";

describe('Todo Items - Filtering', () => {

    let stepper: Stepper = new Stepper();;
    let asserter: Asserter = new Asserter();
    
    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        stepper.navigateTo(stepper.pages.todoList);
        stepper.addTodoItem(todoItemsFilter[0]);
        stepper.addTodoItem(todoItemsFilter[1]);
        stepper.addTodoItem(todoItemsFilter[2]);
        stepper.addTodoItem(todoItemsFilter[3]);
    });

    context('Filter completed todos', () => {

        beforeEach(() => {
            stepper.toggleTodoItemCompletion(todoItemsFilter[0]);
            stepper.filterActiveTodos();
        });

        it('should filter completed todos', () => {
            stepper.filterCompletedTodos();
            asserter.verifyCompletedTodoItem(todoItemsFilter[0]);
            asserter.verifyTotalTodosCount(1);
        });

    });

    context('Filter active todos', () => {

        beforeEach(() => {
            stepper.toggleTodoItemCompletion(todoItemsFilter[3]);
            stepper.filterCompletedTodos();
        });

        it('should filter active todos', () => {
            stepper.filterActiveTodos();
            asserter.verifyActiveTodoItem(todoItemsFilter[0]);
            asserter.verifyActiveTodoItem(todoItemsFilter[1]);
            asserter.verifyActiveTodoItem(todoItemsFilter[2]);
            asserter.verifyTotalTodosCount(3);
        });

    });

    context('Filter todos with all statuses', () => {

        beforeEach(() => {
            stepper.toggleTodoItemCompletion(todoItemsFilter[0]);
            stepper.toggleTodoItemCompletion(todoItemsFilter[1]);
            stepper.filterCompletedTodos();
        });

        it('should filter todos with all statuses', () => {
            stepper.filterAllTodos();
            asserter.verifyCompletedTodoItem(todoItemsFilter[0]);
            asserter.verifyCompletedTodoItem(todoItemsFilter[1]);
            asserter.verifyActiveTodoItem(todoItemsFilter[2]);
            asserter.verifyActiveTodoItem(todoItemsFilter[3]);
            asserter.verifyTotalTodosCount(4);
        });
    });
});