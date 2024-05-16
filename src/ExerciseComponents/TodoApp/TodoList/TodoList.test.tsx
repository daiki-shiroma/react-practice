import React from "react";

import { expect, jest, test } from "@jest/globals";

import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoList } from "./TodoList";
import { Todo } from "../Todo.type";

const mockToggleTodo = jest.fn();
const mockDeleteTodo = jest.fn();

const baseTodoList = [
  { id: 1, title: "Todo 1", completed: false },
  { id: 2, title: "Todo 2", completed: false },
];

function setup(todoList: Todo[]) {
  return render(
    <>
      <TodoList
        query=""
        status="all"
        todoList={todoList}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    </>
  );
}

test("TodoListがないこと", () => {
  setup([]);
  expect(screen.getByText("タスクがありません。")).toBeInTheDocument();
});

test("TodoListが正しく表示されていること", () => {
  setup(baseTodoList);

  expect(screen.getByText("Todo 1")).toBeInTheDocument();
  expect(screen.getByText("Todo 2")).toBeInTheDocument();

  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(2);
});

test("削除ボタンが正しく機能していること", async () => {
  const { rerender } = setup(baseTodoList);

  const deleteButtons = screen.getAllByText("削除");

  await userEvent.click(deleteButtons[0]);
  expect(mockDeleteTodo).toHaveBeenCalledWith({ id: 1 }); //Todo 1を削除

  const newTodoList = baseTodoList.filter((todo) => todo.id !== 1);

  rerender(
    <>
      <TodoList
        query=""
        status="all"
        todoList={newTodoList}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    </>
  );

  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(1);
  expect(listItems[0]).not.toHaveTextContent("Todo 1");
  expect(listItems[0]).toHaveTextContent("Todo 2");
});

test("トグルボタンが正しく機能していること", async () => {
  setup(baseTodoList);

  const checkbox = screen.getByText("Todo 1");

  await userEvent.click(checkbox);

  expect(mockToggleTodo).toHaveBeenCalledTimes(1);
  expect(mockToggleTodo).toHaveBeenCalledWith({ id: 1 });
});
