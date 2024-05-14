import React from "react";

import { expect, jest, test } from "@jest/globals";

import "@testing-library/jest-dom/jest-globals";
import { render, screen, getAllByAltText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoCreationForm } from "./TodoCreationForm/TodoCreationForm";
import { TodoList } from "./TodoList/TodoList";
import { TodoListFilter } from "./TodoListFilter/TodoListFilter";

const mockToggleTodo = jest.fn();
const mockDeleteTodo = jest.fn();
const mockCreateTodo = jest.fn();

const todoListFilter = {
  query: "",
  status: "all",
  setQuery: jest.fn(),
  setStatus: jest.fn(),
};

const todoList = [
  { id: 1, title: "Todo 1", completed: false },
  { id: 2, title: "Todo 2", completed: false },
];

test("新しくタスクが追加されること", async () => {
  const { rerender, getByPlaceholderText, getByRole, getAllByRole } = render(
    <>
      <TodoCreationForm createTodo={mockCreateTodo} />
      <TodoList
        query=""
        status="all"
        todoList={todoList}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    </>
  );

  const inputField = getByPlaceholderText("Learn React");
  await userEvent.type(inputField, "New Todo");
  const addButton = getByRole("button", { name: "追加" });
  await userEvent.click(addButton);

  expect(mockCreateTodo).toHaveBeenCalledWith({ title: "New Todo" });

  render;

  const listItems = getAllByRole("listitem");
  expect(listItems.length).toBe(3); // Todo: 3つ目のタスクが追加されていない
});
