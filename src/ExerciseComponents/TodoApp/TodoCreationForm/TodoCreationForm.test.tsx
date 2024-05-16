import React from "react";

import { expect, jest, test } from "@jest/globals";

import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoCreationForm } from "./TodoCreationForm";
import { TodoList } from "../TodoList/TodoList";

const mockCreateTodo = jest.fn();
const mockToggleTodo = jest.fn();
const mockDeleteTodo = jest.fn();

const todoList = [
  { id: 1, title: "Todo 1", completed: false },
  { id: 2, title: "Todo 2", completed: false },
];

test("タスクが空白のままでは追加されないこと", async () => {
  render(
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

  const addButton = screen.getByRole("button", { name: "追加" });
  await userEvent.click(addButton);

  expect(screen.getByText("タスク名を入力してください")).toBeInTheDocument();

  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(2);
});
