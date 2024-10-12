import { useTodo } from "@/Context/TodoContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

type EditDataType = {
  id: string | number;
  title: string;
  completed: boolean;
};

interface TodoProps {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  // title: string;
  setEditData: React.Dispatch<React.SetStateAction<EditDataType>>;
}

const Todo: React.FC<TodoProps> = ({ setTitle, setEdit, setEditData }) => {
  const { todos, deleteTodo, setTodos } = useTodo();

  const handleChange = (id: string | number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  };

  const handleEdit = (id: string | number) => {
    const editId = id;
    setEdit(true);
    const edit = todos.find((todo) => editId === todo.id);

    if (edit) {
      setTitle(edit.title);

      setEditData({
        id: editId,
        title: edit.title,
        completed: edit.completed,
      });
    }
  };

  return (
    <>
      {todos.length > 0 ? (
        todos.map((todo, i) => (
          <Card className="mb-3 shadow-xl" key={i}>
            <div className="flex h-auto justify-between p-4 md:flex-row flex-col">
              <div className="flex text-2xl items-center gap-4">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => {
                    handleChange(todo.id);
                  }}
                ></Checkbox>
                <h1
                  className={`${
                    todo.completed ? "line-through" : null
                  } md:text-2xl text-xl`}
                >
                  {todo.title}
                </h1>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0 justify-between mx-10 md:mx-0">
                <Button
                  variant={"outline"}
                  disabled={todo.completed}
                  onClick={() => handleEdit(todo.id)}
                >
                  Edit
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="flex h-20 justify-center items-center p-4">
          <h1 className="text-2xl">No Todos yet!</h1>
        </div>
      )}
    </>
  );
};

export default Todo;
