import { Asserter } from "../../step-assert/asserter";
import { Stepper } from "../../step-assert/stepper";
import { todoItemsCrud } from "../../support/test-data";

describe('Todo Items - CRUD', () => {

    let stepper: Stepper = new Stepper();
    let asserter: Asserter = new Asserter();
    
    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        stepper.navigateTo(stepper.pages.todoList);
    });

    describe('Add and verify todo items', () => {
        it('should add a new todo item', () => {
            asserter.verifyEmptyTodoList();
            stepper.addTodoItem(todoItemsCrud[0]);
            asserter.verifyActiveTodosCount(1);
            asserter.verifyTotalTodosCount(1);
            asserter.verifyActiveTodoItem(todoItemsCrud[0]);
            stepper.addTodoItem(todoItemsCrud[1]);
            asserter.verifyActiveTodosCount(2);
            asserter.verifyTotalTodosCount(2);
            asserter.verifyActiveTodoItem(todoItemsCrud[1]);
        });
    });

    context('Update, Complete and delete todo items', () => {

        beforeEach(() => {
            stepper.addTodoItem(todoItemsCrud[0]);
            stepper.addTodoItem(todoItemsCrud[1]);
            asserter.verifyActiveTodosCount(2);
            asserter.verifyTotalTodosCount(2);
        });

        describe('Update and verify todo items', () => {
            it('should update todo\'s name and verify update', () => {
                const updatedTodo = 'Buy groceries and cook dinner';
                stepper.updateTodoItem(todoItemsCrud[0], updatedTodo);
                asserter.verifyActiveTodoItem(updatedTodo);
                asserter.verifyActiveTodoItem(todoItemsCrud[1]);
                asserter.verifyActiveTodosCount(2);
                asserter.verifyTotalTodosCount(2);
            });
        });

        describe('Complete and verify todo items', () => {

            context('Set items to Completed', () => {
                it('should set all todos to Completed at once and verify update', () => {
                    stepper.toggleAllTodosCompletion();
                    asserter.verifyAllTodoItemsCompleted();
                    asserter.verifyActiveTodosCount(0);
                    asserter.verifyTotalTodosCount(2);
                });

                it('should set a todo item to Completed and verify update', () => {
                    stepper.toggleTodoItemCompletion(todoItemsCrud[0]);
                    asserter.verifyCompletedTodoItem(todoItemsCrud[0]);
                    asserter.verifyActiveTodoItem(todoItemsCrud[1]);
                    asserter.verifyActiveTodosCount(1);
                    asserter.verifyTotalTodosCount(2);
                });
            });

            context('Revert items from Completed', () => {

                beforeEach(() => {
                    stepper.toggleAllTodosCompletion();
                    asserter.verifyAllTodoItemsCompleted();
                    asserter.verifyActiveTodosCount(0);
                    asserter.verifyTotalTodosCount(2);
                });

                it('should revert Completion of a todo item and verify update', () => {
                    stepper.toggleTodoItemCompletion(todoItemsCrud[0]);
                    asserter.verifyActiveTodoItem(todoItemsCrud[0]);
                    asserter.verifyCompletedTodoItem(todoItemsCrud[1]);
                    asserter.verifyActiveTodosCount(1);
                    asserter.verifyTotalTodosCount(2);
                });

                it('should revert all todos from Completed and verify update', () => {
                    stepper.toggleAllTodosCompletion();
                    asserter.verifyActiveTodosCount(2);
                    asserter.verifyTotalTodosCount(2);
                    asserter.verifyActiveTodoItem(todoItemsCrud[0]);
                    asserter.verifyActiveTodoItem(todoItemsCrud[1]);
                });
            });
        });

        describe('Delete and verify todos', () => {
            it('should delete todos by "delete" button', () => {
                stepper.deleteTodoItem(todoItemsCrud[0]);
                asserter.verifyActiveTodosCount(1);
                asserter.verifyTotalTodosCount(1);
                stepper.toggleTodoItemCompletion(todoItemsCrud[1]);      
                stepper.deleteTodoItem(todoItemsCrud[1]);
                asserter.verifyEmptyTodoList();
            });

            it('should delete completed todos by "Clear completed" button', () => {
                stepper.toggleTodoItemCompletion(todoItemsCrud[0]);
                asserter.verifyTotalTodosCount(2);
                asserter.verifyActiveTodosCount(1);            
                stepper.clearCompletedTodos();
                asserter.verifyTotalTodosCount(1);
            });
        });
    });
});