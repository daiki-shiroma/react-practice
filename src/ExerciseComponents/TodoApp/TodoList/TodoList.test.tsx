import { render, fireEvent } from "@testing-library/react";
import { TodoList } from "./TodoList";
import { test, expect } from "@jest/globals";

test("renders TodoList and handles actions correctly", () => {
  const mockToggleTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  const todoList = [
    { id: 1, title: "Todo 1", completed: false },
    { id: 2, title: "Todo 2", completed: false },
  ];

  const { getByText, getAllByRole } = render(
    <TodoList
      query=""
      status="all"
      todoList={todoList}
      toggleTodo={mockToggleTodo}
      deleteTodo={mockDeleteTodo}
    />
  );

  // Check if TodoList is rendered correctly
  // expect(getByText("Todo 1")).toBeInTheDocument();
  // expect(getByText("Todo 2")).toBeInTheDocument();

  // Check if correct number of ListItems are rendered
  const listItems = getAllByRole("listitem");
  expect(listItems.length).toBe(2);

  // Check if toggleTodo and deleteTodo are called correctly
  fireEvent.click(getByText("Todo 1"));
  expect(mockToggleTodo).toHaveBeenCalledWith({ id: 1 });

  fireEvent.click(getByText("削除"));
  expect(mockDeleteTodo).toHaveBeenCalledWith({ id: 1 });
});
