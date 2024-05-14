import React from "react";

import { expect, jest, test } from "@jest/globals";

import "@testing-library/jest-dom/jest-globals";
import { render, screen, getAllByAltText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoList } from "./TodoList";

const mockToggleTodo = jest.fn();
const mockDeleteTodo = jest.fn();

test("TodoListがないこと", () => {
  render(
    <TodoList
      query=""
      status="all"
      todoList={[]}
      toggleTodo={mockToggleTodo}
      deleteTodo={mockDeleteTodo}
    />
  );

  expect(screen.getByText("タスクがありません。")).toBeInTheDocument();
});

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
  expect(mockDeleteTodo).toHaveBeenCalledWith({ id: 1 }); //Todo 1を削除

  // Todo: 削除されたことを確かめたいが、削除されていないと出る
  expect(screen.getByText("Todo 1")).not.toBeVisible();
  expect(screen.getByText("Todo 2")).toBeInTheDocument();
});

test("トグルボタンが正しく機能していること", async () => {
  render(
    <TodoList
      query=""
      status="all"
      todoList={todoList}
      toggleTodo={mockToggleTodo}
      deleteTodo={mockDeleteTodo}
    />
  );

  // テスト対象の Todo 項目のチェックボックスを取得
  const checkbox = screen.getByText("Todo 1");

  // チェックボックスをクリックしてトグル動作を実行
  await userEvent.click(checkbox);

  // トグル動作が正しく呼び出されたかを確認
  expect(mockToggleTodo).toHaveBeenCalledTimes(1);
  expect(mockToggleTodo).toHaveBeenCalledWith({ id: 1 });
});
