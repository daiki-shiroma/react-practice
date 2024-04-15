import { useState, useEffect } from "react";
import { Button, Checkbox, HStack, List, ListItem } from "@chakra-ui/react";
import { Todo } from "../Todo.type";
import { type TodoFilterStatus } from "../TodoListFilter/TodoListFilter.type";

type TodoListProps = {
  todoList: Todo[];
  query: string | undefined;
  status: TodoFilterStatus;
};

export function TodoList({ todoList, query, status }: TodoListProps) {
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>(todoList);
  const isTodoListExist = filteredTodoList.length > 0;

  const filteredByStatus = (todoList: Todo[]) => {
    if (status === 'all') return [...todoList];

    if (status === 'completed' || status === 'active') {
      const isStatus = status === 'completed';
      const statusResult = todoList.filter(
        todo => todo.completed === isStatus
      )
      return statusResult;
    }
    else {
      return [...todoList];
    }
  }

  const filteredByQuery = (todoList: Todo[]) => {
    if (query === undefined) return [...todoList];

    const queryResult = todoList.filter(
      todo => (todo.title.includes(query)));
    return queryResult;
  }

  useEffect(() => {
    const filteredList = filteredByQuery(filteredByStatus(todoList));
    setFilteredTodoList(filteredList);
  }, [todoList, query, status]);

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
