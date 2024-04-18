import { useCallback } from "react";
import { Todo } from "../Todo.type";
import { type TodoFilterStatus } from "../TodoListFilter/TodoListFilter.type";

export function filterTodoList() {
  const filterByStatus = useCallback((todoList: Todo[], status: TodoFilterStatus) => {
    if (status === "all") return [...todoList];

    const isComplete = status === "completed";
    return todoList.filter((todo) => todo.completed === isComplete);
  }, []); //依存配列がないため、初回レンダリング時のみ生成される

  const filterByQuery = useCallback((todoList: Todo[], query: string | undefined) => {
    if (query === undefined) return [...todoList];

    const queryResult = todoList.filter((todo) => todo.title.includes(query));
    return queryResult;
  }, []);

  return { filterByStatus, filterByQuery };
}
