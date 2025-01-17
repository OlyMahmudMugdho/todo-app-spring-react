import { AlertRegisterError } from "@/components/custom/AlertRegisterError"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    const oldToken = localStorage.getItem('token')
    if (oldToken && oldToken.length > 0) {
        setToken(oldToken)
        navigate('/')
    } else {
        setToken('')
        localStorage.removeItem('token')
    }
}, [token])

  const register = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    if (!response.ok) {
      setError(true)
      return
    }
    else {
      setError(false)
      navigate('/sign-in')
    }
  }

  const redirectToLogin = () => {
    navigate('/sign-in')
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-20 gap-4">
      <div className="text-3xl font-bold mb-4">Register</div>
      <form onSubmit={register} className="w-10/12 md:w-4/12 flex flex-col gap-4">
        <Input onChange={e => setUsername(e.target.value)} value={username} type="text" placeholder="Username" className="py-5 md:py-6" />
        <Input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" className="py-5 md:py-6" />
        <Button type="submit" className="md:py-6 text-2xl">Register</Button>
      </form>
      Already have an account?
      <Button onClick={redirectToLogin} className="md:py-6 text-2xl">Login</Button>
        <div className="w-10/12 md:w-4/12 mt-5">
          {(error === true) ? <AlertRegisterError /> : null}
        </div>
    </div>
  )
}

export default Register