import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { AddTodo } from "@/components/custom/AddTodoSection";
import AllTodosSection from "@/components/custom/AllTodosSection";
import { TodoProvider } from "@/store/TodoContext";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
    }
  }, [navigate]);

  const doLogOut = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/sign-out");
  };

  return (
    <TodoProvider>
      <div className="w-full flex justify-end p-4">
        <Button size={"lg"} variant={"destructive"} onClick={doLogOut}>
          <LogOut />
        </Button>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-10/12 md:w-4/12 flex flex-col gap-4">
          <AddTodo />
          <AllTodosSection />
        </div>
      </div>
    </TodoProvider>
  );
}

export default Home;
