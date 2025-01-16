import { Button } from "@/components/ui/button";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { AddTodo } from "@/components/custom/AddTodoSection";


function Home() {

  const navigate = useNavigate();
  

  useEffect(() => {
    console.log(document.cookie)
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/sign-in')
    }
  }
  , [])


  const doLogOut = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/sign-out')
  }

  return (
    <>
      <div className="w-full flex justify-end p-4"><Button size={"lg"} variant={"destructive"} onClick={doLogOut} ><LogOut  /></Button></div>
      <div className="w-full flex items-center justify-center">
      <div className="w-10/12 md:w-4/12 flex flex-col gap-4">
        <AddTodo />
      </div>
      </div>
    </>
  )
}

export default Home