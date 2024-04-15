import { useState } from "react";
import { TodoFilterStatus, isTodoFilterStatus } from "./TodoListFilter.type";

export function useTodoListFilter() {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<TodoFilterStatus>('all')

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };
  const handleFilterStatusChange = (status: string) => {
    if (isTodoFilterStatus(status)) {
      setStatus(status);
    }
  };

  return {
    query,
    status,
    handleFilterStatusChange,
    handleQueryChange,
  };
}

export type UseTodoListFilterReturn = ReturnType<typeof useTodoListFilter>;
