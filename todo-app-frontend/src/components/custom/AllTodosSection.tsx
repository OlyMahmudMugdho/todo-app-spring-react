import { useTodoContext } from "@/store/TodoContext";
import Todo from "./Todo";

function AllTodosSection() {
  const { todos } = useTodoContext();

  return (
    <div className="pb-8">
      <div className="text-3xl font-bold mb-4">All Todos</div>
      <div className="grid gap-4">
        {todos.map((todo) => (
          <Todo key={todo.id} id={todo.id} title={todo.title} />
        ))}
      </div>
    </div>
  );
}

export default AllTodosSection;
