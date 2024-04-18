import { useState, useEffect } from "react";
import { Button, Checkbox, HStack, List, ListItem } from "@chakra-ui/react";
import { Todo } from "../Todo.type";
import { type TodoFilterStatus } from "../TodoListFilter/TodoListFilter.type";
import { useTodoList } from "./useTodoList";

type TodoListProps = {
  query: string | undefined;
  status: TodoFilterStatus;
};

export function TodoList({ query, status }: TodoListProps) {
  const { todoList, toggleTodo, deleteTodo, filterByStatus, filterByQuery } = useTodoList();

  const [displayTodoList, setDisplayTodoList] = useState<Todo[]>(todoList);

  const useTodoListInstanceList = (status: TodoFilterStatus, query: string | undefined) => {
    const filteredByStatusList = filterByStatus(todoList, status);
    return filterByQuery(filteredByStatusList, query);
  }

  useEffect(() => {
    setDisplayTodoList(useTodoListInstanceList(status, query));
  }, [todoList, status, query]);

  if (displayTodoList.length <= 0) {
    return <p>タスクがありません。</p>
  }

  return (
    <List spacing={2} w="100%">
      {displayTodoList.map((todo) => {
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
