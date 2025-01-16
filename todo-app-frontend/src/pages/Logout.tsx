import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token')
        console.log(document.cookie)
        navigate('/sign-in')
    }  , [])

  return (
    <div>

    </div>
  )
}

export default Logout