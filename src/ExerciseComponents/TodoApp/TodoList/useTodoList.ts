import { useCallback, useReducer } from "react";
import { reducer, initialState } from "./TodoList.reducer";
import { Todo } from "../Todo.type";
import { type TodoFilterStatus } from "../TodoListFilter/TodoListFilter.type";

export function useTodoList() {
  const [{ todoList }, dispatch] = useReducer(reducer, initialState);

  const toggleTodo = useCallback(({ id }: { id: number }) => {
    dispatch({
      type: "toggle",
      payload: {
        id,
      },
    });
  }, []);

  const createTodo = useCallback(({ title }: { title: string }) => {
    dispatch({
      type: "create",
      payload: {
        title,
      },
    });
  }, []);

  const deleteTodo = useCallback(({ id }: { id: number }) => {
    dispatch({
      type: "delete",
      payload: {
        id,
      },
    });
  }, []);

  const filterByStatus = (todoList: Todo[], status: TodoFilterStatus) => {
    if (status === "all") return [...todoList];

    const isComplete = status === "completed";
    return todoList.filter((todo) => todo.completed === isComplete);
  };

  const filterByQuery = (todoList: Todo[], query: string | undefined) => {
    if (query === undefined) return [...todoList];

    const queryResult = todoList.filter((todo) => todo.title.includes(query));
    return queryResult;
  };

  return {
    todoList,
    toggleTodo,
    createTodo,
    deleteTodo,
    filterByStatus,
    filterByQuery,
  };
}

export type UseTodoListReturn = ReturnType<typeof useTodoList>;
