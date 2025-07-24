import { BasePage } from "../../page-object/base.page";
import { TodoListPage } from "../../page-object/todo-list.page";
import { todoItemsFilter } from "../../support/test-data";

describe('Todo Items - Filtering', () => {

    let todoPage: TodoListPage = new TodoListPage();
    let basePage: BasePage = new BasePage();
    
    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        basePage.navigateTo(basePage.pages.todoList);
        todoPage.addTodoItem(todoItemsFilter[0]);
        todoPage.addTodoItem(todoItemsFilter[1]);
        todoPage.addTodoItem(todoItemsFilter[2]);
        todoPage.addTodoItem(todoItemsFilter[3]);
    });

    context('Filter completed todos', () => {

        beforeEach(() => {
            todoPage.toggleTodoItemCompletion(todoItemsFilter[0]);
            todoPage.filterActiveTodos();
        });

        it('should filter completed todos', () => {
            todoPage.filterCompletedTodos();
            todoPage.verifyCompletedTodoItem(todoItemsFilter[0]);
            todoPage.verifyTotalTodosCount(1);
        });

    });

    context('Filter active todos', () => {

        beforeEach(() => {
            todoPage.toggleTodoItemCompletion(todoItemsFilter[3]);
            todoPage.filterCompletedTodos();
        });

        it('should filter active todos', () => {
            todoPage.filterActiveTodos();
            todoPage.verifyActiveTodoItem(todoItemsFilter[0]);
            todoPage.verifyActiveTodoItem(todoItemsFilter[1]);
            todoPage.verifyActiveTodoItem(todoItemsFilter[2]);
            todoPage.verifyTotalTodosCount(3);
        });

    });

    context('Filter todos with all statuses', () => {

        beforeEach(() => {
            todoPage.toggleTodoItemCompletion(todoItemsFilter[0]);
            todoPage.toggleTodoItemCompletion(todoItemsFilter[1]);
            todoPage.filterCompletedTodos();
        });

        it('should filter todos with all statuses', () => {
            todoPage.filterAllTodos();
            todoPage.verifyCompletedTodoItem(todoItemsFilter[0]);
            todoPage.verifyCompletedTodoItem(todoItemsFilter[1]);
            todoPage.verifyActiveTodoItem(todoItemsFilter[2]);
            todoPage.verifyActiveTodoItem(todoItemsFilter[3]);
            todoPage.verifyTotalTodosCount(4);
        });
    });
});