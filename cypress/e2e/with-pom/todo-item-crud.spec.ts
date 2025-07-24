import { BasePage } from "../../page-object/base.page";
import { TodoListPage } from "../../page-object/todo-list.page";
import { todoItemsCrud } from "../../support/test-data";

describe('Todo Items - CRUD', () => {

    let todoPage: TodoListPage = new TodoListPage();;
    let basePage: BasePage = new BasePage();
    
    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        basePage.navigateTo(todoPage.pages.todoList);
    });

    describe('Add and verify todo items', () => {
        it('should add a new todo item', () => {
            todoPage.verifyEmptyTodoList();
            todoPage.addTodoItem(todoItemsCrud[0]);
            todoPage.verifyActiveTodosCount(1);
            todoPage.verifyTotalTodosCount(1);
            todoPage.verifyActiveTodoItem(todoItemsCrud[0]);
            todoPage.addTodoItem(todoItemsCrud[1]);
            todoPage.verifyActiveTodosCount(2);
            todoPage.verifyTotalTodosCount(2);
            todoPage.verifyActiveTodoItem(todoItemsCrud[1]);
        });
    });

    context('Update, Complete and delete todo items', () => {

        beforeEach(() => {
            todoPage.addTodoItem(todoItemsCrud[0]);
            todoPage.addTodoItem(todoItemsCrud[1]);
            todoPage.verifyActiveTodosCount(2);
            todoPage.verifyTotalTodosCount(2);
        });

        describe('Update and verify todo items', () => {
            it('should update todo\'s name and verify update', () => {
                const updatedTodo = 'Buy groceries and cook dinner';
                todoPage.updateTodoItem(todoItemsCrud[0], updatedTodo);
                todoPage.verifyActiveTodoItem(updatedTodo);
                todoPage.verifyActiveTodoItem(todoItemsCrud[1]);
                todoPage.verifyActiveTodosCount(2);
                todoPage.verifyTotalTodosCount(2);
            });
        });

        describe('Complete and verify todo items', () => {

            context('Set items to Completed', () => {
                it('should set all todos to Completed at once and verify update', () => {
                    todoPage.toggleAllTodosCompletion();
                    todoPage.verifyAllTodoItemsCompleted();
                    todoPage.verifyActiveTodosCount(0);
                    todoPage.verifyTotalTodosCount(2);
                });

                it('should set a todo item to Completed and verify update', () => {
                    todoPage.toggleTodoItemCompletion(todoItemsCrud[0]);
                    todoPage.verifyCompletedTodoItem(todoItemsCrud[0]);
                    todoPage.verifyActiveTodoItem(todoItemsCrud[1]);
                    todoPage.verifyActiveTodosCount(1);
                    todoPage.verifyTotalTodosCount(2);
                });
            });

            context('Revert items from Completed', () => {

                beforeEach(() => {
                    todoPage.toggleAllTodosCompletion();
                    todoPage.verifyAllTodoItemsCompleted();
                    todoPage.verifyActiveTodosCount(0);
                    todoPage.verifyTotalTodosCount(2);
                });

                it('should revert Completion of a todo item and verify update', () => {
                    todoPage.toggleTodoItemCompletion(todoItemsCrud[0]);
                    todoPage.verifyActiveTodoItem(todoItemsCrud[0]);
                    todoPage.verifyCompletedTodoItem(todoItemsCrud[1]);
                    todoPage.verifyActiveTodosCount(1);
                    todoPage.verifyTotalTodosCount(2);
                });

                it('should revert all todos from Completed and verify update', () => {
                    todoPage.toggleAllTodosCompletion();
                    todoPage.verifyActiveTodosCount(2);
                    todoPage.verifyTotalTodosCount(2);
                    todoPage.verifyActiveTodoItem(todoItemsCrud[0]);
                    todoPage.verifyActiveTodoItem(todoItemsCrud[1]);
                });
            });
        });

        describe('Delete and verify todos', () => {
            it('should delete todos by "delete" button', () => {
                todoPage.deleteTodoItem(todoItemsCrud[0]);
                todoPage.verifyActiveTodosCount(1);
                todoPage.verifyTotalTodosCount(1);
                todoPage.toggleTodoItemCompletion(todoItemsCrud[1]);      
                todoPage.deleteTodoItem(todoItemsCrud[1]);
                todoPage.verifyEmptyTodoList();
            });

            it('should delete completed todos by "Clear completed" button', () => {
                todoPage.toggleTodoItemCompletion(todoItemsCrud[0]);
                todoPage.verifyTotalTodosCount(2);
                todoPage.verifyActiveTodosCount(1);            
                todoPage.clearCompletedTodos();
                todoPage.verifyTotalTodosCount(1);
            });
        });
    });
});