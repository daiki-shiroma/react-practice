import { Todo } from "../Todo.type";
import { type TodoFilterStatus } from "../TodoListFilter/TodoListFilter.type";

export const filterByStatus = (todoList: Todo[], status: TodoFilterStatus) => {
  if (status === "all") return [...todoList];

  const isComplete = status === "completed";
  return todoList.filter((todo) => todo.completed === isComplete);
};

export const filterByQuery = (todoList: Todo[], query: string | undefined) => {
  if (query === undefined) return [...todoList];

  const queryResult = todoList.filter((todo) => todo.title.includes(query));
  return queryResult;
};
