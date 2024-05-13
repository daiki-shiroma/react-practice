import React from "react";

import { expect, jest, test } from "@jest/globals";

import "@testing-library/jest-dom/jest-globals";
import { render, getAllByAltText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoList } from "./TodoList";

const mockToggleTodo = jest.fn();
const mockDeleteTodo = jest.fn();

const user = userEvent.setup();

const todoList = [
  { id: 1, title: "Todo 1", completed: false },
  { id: 2, title: "Todo 2", completed: false },
];

const { getByText, getAllByRole, getAllByText } = render(
  <TodoList
    query=""
    status="all"
    todoList={todoList}
    toggleTodo={mockToggleTodo}
    deleteTodo={mockDeleteTodo}
  />
);

test("renders TodoList and handles actions correctly", () => {
  expect(getByText("Todo 1")).toBeInTheDocument();
  expect(getByText("Todo 2")).toBeInTheDocument();

  const listItems = getAllByRole("listitem");
  expect(listItems.length).toBe(2);
});

test("trigger some awesome feature when clicking the button", () => {
  const deleteButtons = getAllByText("削除");

  userEvent.click(deleteButtons[0]);
  expect(mockDeleteTodo).toHaveBeenCalledWith({ id: 1 });
});
