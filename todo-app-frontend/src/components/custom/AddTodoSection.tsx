import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export function AddTodo() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(title)
    console.log(description)
  }

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        title,
        description
      })
    })

    if (!response.ok) {
      console.error('Error adding todo')
      setError(true)
      return
    }
    else {
      alert('Todo added successfully')
      console.log('Todo added successfully')
      setError(false)
      setTitle('')
      setDescription('')
    }
  }


  return (
    <form onSubmit={addTodo} className="grid w-full gap-2">
      <Label htmlFor="title">Todo Title</Label>
      <Input onChange={e => setTitle(e.target.value)} type="title" id="title" placeholder="Add Todo title here" />
      <Label htmlFor="description">Todo Description</Label>
      <Textarea onChange={e => setDescription(e.target.value)} placeholder="Add Todo description here" id="message" />
      <Button type="submit" className="md:py-6 text-2xl my-2">Add Todo</Button>
      { (error===true) ? <div className="text-red-500">Error adding todo</div> : null }
    </form>
  )
}
