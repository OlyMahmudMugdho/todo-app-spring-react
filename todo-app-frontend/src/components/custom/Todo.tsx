import { Trash2 } from "lucide-react"
import { Card, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

type TodoProps = {
    title: string
}

const Todo = ({title} : TodoProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center ">
                <CardTitle>{title}</CardTitle>
                <Button variant="destructive"><Trash2 /></Button>
            </CardHeader>
        </Card>

    )
}

export default Todo