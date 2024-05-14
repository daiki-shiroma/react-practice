import React from "react";

import { expect, jest, test } from "@jest/globals";

import "@testing-library/jest-dom/jest-globals";
import { render, screen, getAllByAltText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoList } from "./TodoList";

const mockToggleTodo = jest.fn();
const mockDeleteTodo = jest.fn();

const todoList = [
  { id: 1, title: "Todo 1", completed: false },
  { id: 2, title: "Todo 2", completed: false },
];

test("TodoListが正しく表示されていること", () => {
  render(
    <TodoList
      query=""
      status="all"
      todoList={todoList}
      toggleTodo={mockToggleTodo}
      deleteTodo={mockDeleteTodo}
    />
  );

  expect(screen.getByText("Todo 1")).toBeInTheDocument();
  expect(screen.getByText("Todo 2")).toBeInTheDocument();

  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(2);
});

test("削除ボタンが正しく機能していること", async () => {
  render(
    <TodoList
      query=""
      status="all"
      todoList={todoList}
      toggleTodo={mockToggleTodo}
      deleteTodo={mockDeleteTodo}
    />
  );

  const deleteButtons = screen.getAllByText("削除");

  await userEvent.click(deleteButtons[0]);
  expect(mockDeleteTodo).toHaveBeenCalledWith({ id: 1 });
});

test("トグルボタンが正しく機能していること", () => {});

test("新しくタスクが追加されること", () => {});

test("タスクがフィルタリングできること", () => {});
