import React from "react";

import { expect, jest, test } from "@jest/globals";

import "@testing-library/jest-dom/jest-globals";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoCreationForm } from "./TodoCreationForm/TodoCreationForm";
import { TodoList } from "./TodoList/TodoList";
import { TodoFilterStatus } from "./TodoListFilter/TodoListFilter.type";
import { TodoListFilter } from "./TodoListFilter/TodoListFilter";
import { Todo } from "./Todo.type";

const mockToggleTodo = jest.fn();
const mockDeleteTodo = jest.fn();
const mockCreateTodo = jest.fn();

const createTodoListFilter = (
  searchQuery: string,
  filterStatus: TodoFilterStatus
) => ({
  query: searchQuery,
  status: filterStatus,
  handleFilterStatusChange: jest.fn(),
  handleQueryChange: jest.fn(),
});

const baseTodoList = [
  { id: 1, title: "Todo 1", completed: false },
  { id: 2, title: "Todo 2", completed: false },
  { id: 3, title: "Todo 3", completed: true },
];

function setup(initTodoList: Todo[]) {
  const initRender = render(
    <>
      <TodoCreationForm createTodo={mockCreateTodo} />
      <TodoListFilter
        {...createTodoListFilter(/*searchQuery*/ "", /*filterStatus*/ "all")}
      />
      <TodoList
        query=""
        status="all"
        todoList={initTodoList}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    </>
  );

  return {
    ...initRender,
    rerender: (
      newTodoList: Todo[],
      searchQuery: string,
      filterStatus: TodoFilterStatus
    ) =>
      initRender.rerender(
        <>
          <TodoCreationForm createTodo={mockCreateTodo} />
          <TodoListFilter
            {...createTodoListFilter(searchQuery, filterStatus)}
          />
          <TodoList
            query={searchQuery}
            status={filterStatus}
            todoList={newTodoList}
            toggleTodo={mockToggleTodo}
            deleteTodo={mockDeleteTodo}
          />
        </>
      ),
  };
}

test("フィルタリングができること", async () => {
  const todoList = [...baseTodoList];
  const { rerender } = setup(todoList);

  //　完了
  const completedRadio = screen.getByLabelText("完了");
  await userEvent.click(completedRadio);

  rerender(todoList, /*searchQuery*/ "", /*filterStatus*/ "completed");

  let listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(1);
  expect(listItems[0]).toHaveTextContent("Todo 3");

  let newTodoList = todoList.map((todo) => ({ ...todo, completed: false }));

  rerender(newTodoList, /*searchQuery*/ "", /*filterStatus*/ "completed");

  expect(screen.getByText("タスクがありません。")).toBeInTheDocument();

  // 未完了
  const activeRadio = screen.getByLabelText("未完了");
  await userEvent.click(activeRadio);

  rerender(todoList, /*searchQuery*/ "", /*filterStatus*/ "active");

  listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(2);
  expect(listItems[0]).toHaveTextContent("Todo 1");
  expect(listItems[1]).toHaveTextContent("Todo 2");

  newTodoList = todoList.map((todo) => ({ ...todo, completed: true }));

  rerender(newTodoList, /*searchQuery*/ "", /*filterStatus*/ "active");

  expect(screen.getByText("タスクがありません。")).toBeInTheDocument();
});

test("タスクが検索できること", async () => {
  const todoList = [...baseTodoList];
  const { rerender } = setup(todoList);

  const searchQuery = "Todo 1";
  let newTodoList = [...todoList, { id: 4, title: "Todo 1", completed: false }];

  const inputField = screen.getByPlaceholderText("検索");
  await userEvent.type(inputField, searchQuery);

  rerender(newTodoList, searchQuery, /*filterStatus*/ "all");

  let listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(2);
  expect(listItems[0]).toHaveTextContent("Todo 1");
  expect(listItems[1]).toHaveTextContent("Todo 1");

  newTodoList = newTodoList.filter((todo) => todo.title !== "Todo 1");

  rerender(newTodoList, searchQuery, /*filterStatus*/ "all");

  expect(screen.getByText("タスクがありません。")).toBeInTheDocument();
});

test("新しくタスクが追加されること", async () => {
  const todoList = [...baseTodoList];
  const { rerender } = setup(todoList);

  const inputField = screen.getByPlaceholderText("Learn React");
  await userEvent.type(inputField, "New Todo");
  const addButton = screen.getByRole("button", { name: "追加" });
  await userEvent.click(addButton);

  expect(mockCreateTodo).toHaveBeenCalledWith({ title: "New Todo" });

  const newTodoList = [
    ...baseTodoList,
    { id: 4, title: "New Todo", completed: false },
  ];

  rerender(newTodoList, /*searchQuery*/ "", /*filterStatus*/ "all");

  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(4);
  expect(listItems[3]).toHaveTextContent("New Todo");
});
