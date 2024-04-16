import { useMemo, useState,useEffect } from "react";
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

  const [displayTodoList, setDisplayTodoList] = useState<Todo[]>(filteredTodoList);

  const handleChangeTodo = (todoId:number) => {
    filterTodo.toggleTodo({ id: todoId });
    setDisplayTodoList(prevState => prevState.map(todo => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo));
  }

  useEffect(() => {
    console.log(displayTodoList);
  }, [displayTodoList,filteredTodoList,filteredByStatusList]);

  if (!isTodoListExist) {
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
                onChange={()=>{
                  handleChangeTodo(todo.id);
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
