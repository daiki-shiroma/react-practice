import { useMemo } from "react"; 
import { Button, Checkbox, HStack, List, ListItem } from "@chakra-ui/react";
import { Todo } from "../Todo.type";
import { type TodoFilterStatus } from "../TodoListFilter/TodoListFilter.type";
import { useTodoList } from "./useTodoList";

type TodoListProps = {
  todoList: Todo[];
  query: string | undefined;
  status: TodoFilterStatus;
};

export function TodoList({ todoList, query, status }: TodoListProps) {
  const filterTodo = useTodoList();

  const filteredByStatusList = useMemo(() => {
    return filterTodo.filterByStatus(todoList, status);
  }, [todoList, status]);
  
  const filteredTodoList = useMemo(() => {
    return filterTodo.filterByQuery(filteredByStatusList, query);
  }, [filteredByStatusList, query]);
  
  const isTodoListExist = filteredTodoList.length > 0;

  if (!isTodoListExist) {
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
                  alert("実装してください");
                }}
              >
                {todo.title}
              </Checkbox>
              <Button
                size="xs"
                onClick={() => {
                  alert("実装してください");
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
