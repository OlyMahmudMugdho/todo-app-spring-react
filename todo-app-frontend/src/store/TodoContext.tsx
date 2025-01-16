import React, { createContext, useContext, useState, useEffect } from "react";

type Todo = {
  id: number;
  title: string;
  description?: string;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  fetchTodos: () => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        console.error("Error fetching todos");
        return;
      }

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 204) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.error("Error deleting todo");
      }
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, fetchTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
