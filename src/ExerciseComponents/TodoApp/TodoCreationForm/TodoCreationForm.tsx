import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useTodoList } from "../TodoList/useTodoList";

type TodoCreationFormProps = {
  onCreateTodo: (title: string) => void;
};

export function TodoCreationForm({ onCreateTodo }: TodoCreationFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [titleError, setTitleError] = useState<string | undefined>(undefined);

  const { createTodo, todoList } = useTodoList();


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (titleRef.current?.value === '' || titleRef.current?.value === undefined) {
          setTitleError("タスク名を入力してください")
          return;
        }
        // onCreateTodo(titleRef.current?.value);
        createTodo({
          title: titleRef.current?.value
        });

        console.log(todoList, "todoList")
        titleRef.current!.value = "";
      }}
    >
      <HStack gap={2} align="start">
        <FormControl isInvalid={!!titleError}>
          <Input ref={titleRef} size="sm" placeholder="Learn React" />
          <FormErrorMessage>{titleError}</FormErrorMessage>
        </FormControl>
        <Button type="submit" size="sm">
          追加
        </Button>
      </HStack>
    </form>
  );
}
