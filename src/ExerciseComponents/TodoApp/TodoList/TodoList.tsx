import { Button, Checkbox, HStack, List, ListItem } from "@chakra-ui/react";
import { Todo } from "../Todo.type";

type TodoListProps = {
  todoList: Todo[];
};

export function TodoList({ todoList }: TodoListProps) {
  // TODO: フィルタリングロジックを実装してください https://github.com/Ryochike/react-practice/issues/7
  const isTodoListExsit = todoList.length > 0;
  const filteredTodoList = todoList;

  return (
    <>
      {
        isTodoListExsit ?
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
          :
          <p>
            タスクがありません。
          </p>
      }
    </>
  );
}
