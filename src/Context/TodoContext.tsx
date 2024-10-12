import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface Todo {
  id: string | number;
  title: string;
  completed: boolean;
}

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (id: string | number) => void;
  editTodo: ({
    id,
    updatedTitle,
  }: {
    id: string | number;
    updatedTitle: string;
  }) => void;
};

const todoContext = createContext<TodoContextType | undefined>(undefined);

const loadTodosFromLocalStorage = (): Todo[] => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const TodoContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(loadTodosFromLocalStorage());

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id: string | number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = ({
    id,
    updatedTitle,
  }: {
    id: string | number;
    updatedTitle: string;
  }) => {
    console.log(id, updatedTitle);

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: updatedTitle } : todo
      )
    );
  };
  return (
    <todoContext.Provider
      value={{ todos, setTodos, addTodo, deleteTodo, editTodo }}
    >
      {children}
    </todoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(todoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoContextProvider");
  }
  return context;
};
