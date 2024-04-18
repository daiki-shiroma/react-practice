import { useMemo } from "react";
import { Button, Checkbox, HStack, List, ListItem } from "@chakra-ui/react";
import { type TodoFilterStatus } from "../TodoListFilter/TodoListFilter.type";
import { useTodoList } from "./useTodoList";
import { filterTodoList } from "./filterTodoList";

type TodoListProps = {
  query: string | undefined;
  status: TodoFilterStatus;
};

export function TodoList({ query, status }: TodoListProps) {
  const { todoList, toggleTodo, deleteTodo } = useTodoList();
  const { filterByStatus, filterByQuery } = filterTodoList();

  const filteredTodoList = useMemo(() => {
    const filteredByStatusList = filterByStatus(todoList, status);
    return filterByQuery(filteredByStatusList, query);
  }, [todoList, status, query]);

  if (filteredTodoList.length === 0) {
    return <p>タスクがありません。</p>
  }

  return (
    <List spacing={2} w="100%">
      {filteredTodoList.map((todo) => {
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
