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
        ...state,
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
      // TODO: 作成ロジックを実装してください https://github.com/Ryochike/react-practice/issues/10
      // return [...state, action.payload];
      return state;
    case "delete":
      // TODO: 削除ロジックを実装してください https://github.com/Ryochike/react-practice/issues/9
      // return state.filter(todo => todo.id !== action.payload.id);
      return state;
    default:
      return state;
  }
};
