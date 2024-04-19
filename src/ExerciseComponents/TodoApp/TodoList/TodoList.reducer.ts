import { defaultTodoList } from "../Todo.fixture";
import { Todo } from "../Todo.type";

type TodoListState = {
  todoList: Todo[];
};

type TodoListAction =
  | {
    type: "toggle";
    payload: {
      id: number;
    };
  }
  | {
    type: "create";
    payload: {
      title: string;
    };
  }
  | {
    type: "delete";
    payload: {
      id: number;
    };
  };

export const initialState: TodoListState = {
  todoList: defaultTodoList,
};

export const reducer = (
  state: TodoListState,
  action: TodoListAction
): TodoListState => {
  switch (action.type) {
    case "toggle":
      return {
        todoList: state.todoList.map((todo) => {
          if (todo.id !== action.payload.id) {
            return todo;
          }
          return {
            ...todo,
            completed: !todo.completed,
          };
        }),
      };
    case "create":
      return {
        todoList: [
          ...state.todoList,
          {
            id: state.todoList.length + 1,
            title: action.payload.title,
            completed: false,
          },
        ]
      }
    case "delete":
      return {
        todoList: state.todoList.filter((todo) => todo.id !== action.payload.id),
      };
    default:
      return state;
  }
};
