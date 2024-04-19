import { Box, VStack } from "@chakra-ui/react";
import { TodoListFilter } from "./TodoListFilter/TodoListFilter";
import { useTodoListFilter } from "./TodoListFilter/useTodoListFilter";
import { useTodoList } from "./TodoList/useTodoList";

import { TodoList } from "./TodoList/TodoList";
import { TodoCreationForm } from "./TodoCreationForm/TodoCreationForm";

export function TodoApp() {
  const todoListFilter = useTodoListFilter();
  const { todoList, createTodo, toggleTodo, deleteTodo } = useTodoList();

  return (
    <Box as="main" p={4} maxWidth={300} mx="auto">
      <VStack gap={4} align="start">
        <TodoListFilter {...todoListFilter} />
        <TodoCreationForm onCreateTodo={() => { createTodo }} />
        <TodoList
          query={todoListFilter.query} status={todoListFilter.status} todoList={todoList} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </VStack>
    </Box>
  );
}
