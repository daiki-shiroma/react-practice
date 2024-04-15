import { useCallback, useReducer } from "react";
import { reducer, initialState } from "./TodoList.reducer";
import { Todo } from "../Todo.type";

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

  const filteredByStatus = (todoList: Todo[], status: string) => {
    if (status === 'all') return [...todoList];

    if (status === 'completed' || status === 'active') {
      const isComplete = status === 'completed';
      const statusResult = todoList.filter(
        todo => todo.completed === isComplete
      )
      return statusResult;
    }
    else {
      return [...todoList];
    }
  }

  const filteredByQuery = (todoList: Todo[], query: string | undefined) => {
    if (query === undefined) return [...todoList];

    const queryResult = todoList.filter(
      todo => (todo.title.includes(query)));
    return queryResult;
  }

  return {
    todoList,
    toggleTodo,
    createTodo,
    deleteTodo,
    filteredByStatus,
    filteredByQuery,
  };
}

export type UseTodoListReturn = ReturnType<typeof useTodoList>;
