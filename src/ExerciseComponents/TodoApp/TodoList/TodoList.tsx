import { useMemo } from "react";
import { Button, Checkbox, HStack, List, ListItem } from "@chakra-ui/react";
import { type TodoFilterStatus } from "../TodoListFilter/TodoListFilter.type";
import { selectTodosFromTodoList } from "./selectTodosFromTodoList";
import { Todo } from "../Todo.type";

type TodoListProps = {
  query: string | undefined;
  status: TodoFilterStatus;
  todoList: Todo[];
  toggleTodo: (payload: { id: number }) => void;
  deleteTodo: (payload: { id: number }) => void;
};

export function TodoList({ query, status, todoList, toggleTodo, deleteTodo }: TodoListProps) {
  const { selectByStatus, selectByQuery } = selectTodosFromTodoList();

  const selectedTodoList = useMemo(() => {
    const filteredByStatusList = selectByStatus(todoList, status);
    return selectByQuery(filteredByStatusList, query);
  }, [todoList, status, query]);

  if (selectedTodoList.length === 0) {
    return <p>タスクがありません。</p>
  }

  return (
    <List spacing={2} w="100%">
      {selectedTodoList.map((todo) => {
        return (
          <ListItem key={todo.id}>
            <HStack justify="space-between">
              <Checkbox
                isChecked={todo.completed}
                onChange={() => {
                  toggleTodo({ id: todo.id });
                }}
              >
                {todo.title}
              </Checkbox>
              <Button
                size="xs"
                onClick={() => {
                  deleteTodo({ id: todo.id });
                }}
              >
                削除
              </Button>
            </HStack>
          </ListItem>
        );
      })}
    </List>
  );
}
