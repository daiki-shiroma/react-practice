import { Box, VStack } from "@chakra-ui/react";
import { TodoListFilter } from "./TodoListFilter/TodoListFilter";
import { useTodoListFilter } from "./TodoListFilter/useTodoListFilter";
import { TodoList } from "./TodoList/TodoList";
import { defaultTodoList } from "./Todo.fixture";

export function TodoApp() {
  const todoListFilter = useTodoListFilter();

  return (
    <Box as="main" p={4} maxWidth={300} mx="auto">
      <VStack gap={4} align="start">
        <TodoListFilter {...todoListFilter} />
        <TodoList todoList={defaultTodoList} />
      </VStack>
    </Box>
  );
}
