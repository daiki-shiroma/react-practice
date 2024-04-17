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

  const [displayTodoList, setDisplayTodoList] = useState<Todo[]>(todoList);

  const filterTodoList = (todoList: Todo[], status: TodoFilterStatus, query: string | undefined) => { //todolistそのものは変えない
    const filteredByStatusList = filterTodo.filterByStatus(todoList, status);
    return filterTodo.filterByQuery(filteredByStatusList, query);
  }
  
  const handleChangeTodo = (todoId: number) => { //todolistそのものを変えるが、変わっていない
    filterTodo.toggleTodo({ id: todoId });
    console.log(todoList);
  }

  const handleDeleteTodo = (todoId: number) => { //todolistそのものを変えるが、変わっていない
    filterTodo.deleteTodo({ id: todoId });
    setDisplayTodoList(prevState => prevState.filter(todo => todo.id !== todoId));
  }

  useEffect(() => {
    const result = filterTodoList(todoList, status, query);
    setDisplayTodoList(result);
    console.log(result);
   }, [todoList, status, query]);

  if (displayTodoList.length<=0) {
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
