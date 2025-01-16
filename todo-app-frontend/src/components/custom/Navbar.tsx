import { ModeToggle } from "../mode-toggle"


function Navbar() {


  return (
    <div className="w-full flex items-center justify-between p-4">
        <div className="text-2xl font-bold">
          Todo App
        </div>
        <div className="flex items-center gap-4">
            <ModeToggle />
        </div>
    </div>
  )
}

export default Navbar