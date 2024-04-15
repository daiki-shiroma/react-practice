import { Button, Checkbox, HStack, List, ListItem } from "@chakra-ui/react";
import { Todo } from "../Todo.type";
import { TodoFilterStatus } from "../TodoListFilter/TodoListFilter.type";

type TodoListProps = {
  todoList: Todo[];
  query: string | undefined;
  status: string;
};

// export function TodoList({ todoList, query, status }: TodoListProps) {
export function TodoList({ todoList, query, status }: TodoListProps) {

  // TODO: フィルタリングロジックを実装してください https://github.com/Ryochike/react-practice/issues/7
  const isTodoListExist = todoList.length > 0;

  let filteredTodoList = todoList;

  console.log(status);
  console.log(query);

  if (query !== undefined) {
    const displayList = todoList.filter(
      todo => (todo.title.includes(query))); //&& todo.completed === status 

    filteredTodoList = displayList
  }

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
