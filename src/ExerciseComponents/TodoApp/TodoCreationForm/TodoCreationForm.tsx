import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import { UseTodoListReturn } from "../TodoList/useTodoList"; //createTodoの型を受け取る

type TodoCreationFormProps = {
  createTodo: UseTodoListReturn["createTodo"];
};

export function TodoCreationForm({ createTodo }: TodoCreationFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [titleError, setTitleError] = useState<string | undefined>(undefined);
  const [newTaskName, setNewTaskName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current === null) {
      return;
    }

    if (newTaskName.trim() === "") {
      setTitleError("タスク名を入力してください")
      inputRef.current.focus();
      return;
    }

    createTodo({ title: newTaskName });
    setNewTaskName("");
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <HStack gap={2} align="start">
        <FormControl isInvalid={!!titleError}>
          <Input ref={inputRef} value={newTaskName} size="sm" placeholder="Learn React" onChange={handleChange} />
          <FormErrorMessage>{titleError}</FormErrorMessage>
        </FormControl>
        <Button type="submit" size="sm">
          追加
        </Button>
      </HStack>
    </form>
  );
}
