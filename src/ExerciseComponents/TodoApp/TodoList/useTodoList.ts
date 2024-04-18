import { useCallback, useReducer } from "react";
import { reducer, initialState } from "./TodoList.reducer";

export function useTodoList() {
  const [{ todoList }, dispatch] = useReducer(reducer, initialState);

  // todoListを操作する → レンダリングが走る
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

  return {
    todoList,
    toggleTodo,
    createTodo,
    deleteTodo,
  };
}

export type UseTodoListReturn = ReturnType<typeof useTodoList>;
