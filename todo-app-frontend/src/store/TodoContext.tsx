import React, { createContext, useContext, useState, useEffect } from "react";

type Todo = {
  id: number;
  title: string;
  description?: string;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  fetchTodos: () => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/todos", {
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

  // Add a new todo to the context
  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, addTodo, fetchTodos }}>
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
