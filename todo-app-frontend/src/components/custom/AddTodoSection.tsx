import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useTodoContext } from "@/store/TodoContext";

export function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const { addTodo } = useTodoContext();

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        setError(true);
        return;
      }

      const newTodo = await response.json();
      addTodo(newTodo); // Add the new todo to the context
      setError(false);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error adding todo", err);
      setError(true);
    }
  };

  return (
    <form onSubmit={handleAddTodo} className="grid w-full gap-2">
      <Label htmlFor="title">Todo Title</Label>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="title"
        id="title"
        placeholder="Add Todo title here"
      />
      <Label htmlFor="description">Todo Description</Label>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add Todo description here"
        id="message"
      />
      <Button type="submit" className="md:py-6 text-2xl my-2">
        Add Todo
      </Button>
      {error && <div className="text-red-500">Error adding todo</div>}
    </form>
  );
}
