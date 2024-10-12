import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import Todo from "./components/Card";
import { useTodo } from "./Context/TodoContext";
import { useState } from "react";

type EditDataType = {
  id: string | number;
  title: string;
  completed: boolean;
};

function App() {
  const { addTodo, editTodo } = useTodo();
  const [title, setTitle] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<EditDataType>({
    id: "",
    title: "",
    completed: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (edit) {
      editTodo({ id: editData.id, updatedTitle: title });

      console.log({ editData: editData });

      setEditData({ id: "", title: "", completed: false });
      setEdit(false);
    } else {
      addTodo({ id: Date.now(), title: title, completed: false });
      // setTitle("");
    }
    setTitle("");
  };

  return (
    <>
      <nav className="flex items-center mt-6 justify-between md:p-4 md:px-96 flex-col">
        <h1 className="text-7xl font-bold">TODO</h1>
        <br />
        <h1 className="text-2xl font-thin">Do what needs Todo!</h1>
      </nav>
      <div className="md:px-80 px-8 mt-8 md:mt-2">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="flex gap-5 mb-5">
            <Input
              type="text"
              placeholder="Add todo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              type="submit"
              disabled={title.length < 5 || title.length >= 50}
            >
              {edit ? "Edit" : "Add"}
            </Button>
          </div>
        </form>
        <Todo
          setTitle={setTitle}
          setEdit={setEdit}
          setEditData={setEditData}
        ></Todo>
      </div>
    </>
  );
}

export default App;
