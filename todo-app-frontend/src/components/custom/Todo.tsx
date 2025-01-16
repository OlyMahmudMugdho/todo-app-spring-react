import { Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useTodoContext } from "@/store/TodoContext";

type TodoProps = {
  id: number;
  title: string;
};

const Todo = ({ id, title }: TodoProps) => {
  const { deleteTodo } = useTodoContext();

  const handleDelete = () => {
    deleteTodo(id);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center ">
        <CardTitle>{title}</CardTitle>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 />
        </Button>
      </CardHeader>
    </Card>
  );
};

export default Todo;
