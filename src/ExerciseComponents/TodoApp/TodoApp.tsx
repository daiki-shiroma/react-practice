import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { TodoCreationForm } from "./TodoCreationForm/TodoCreationForm";
import { TodoList } from "./TodoList/TodoList";
import { useTodoList } from "./TodoList/useTodoList";
import { TodoListFilter } from "./TodoListFilter/TodoListFilter";
import { useTodoListFilter } from "./TodoListFilter/useTodoListFilter";

export function TodoApp() {
  const todoListFilter = useTodoListFilter();
  const { todoList, createTodo, toggleTodo, deleteTodo } = useTodoList();

  return (
    <Box as="main" p={4} maxWidth={300} mx="auto">
      <VStack gap={4} align="start">
        <TodoListFilter {...todoListFilter} />
        <TodoCreationForm createTodo={createTodo} />
        <TodoList
          query={todoListFilter.query}
          status={todoListFilter.status}
          todoList={todoList}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </VStack>
    </Box>
  );
}
