import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { loginUser } from "../../api/auth.api.js"
import { useAuthStore } from "../../store/authStore.js"
import Button from "../../components/ui/Button.jsx"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((state) => state.login)
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    try {
      const response = await loginUser(form)
      login(response.user, response.access, response.refresh)
      navigate(location.state?.from || "/dashboard")
    } catch {
      setError("Unable to sign in with those credentials.")
    }
  }

  return (
    <div className="mx-auto max-w-md glass-panel p-8">
      <span className="eyebrow">Welcome back</span>
      <h1 className="mt-4 font-display text-4xl">Sign in</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error ? <p className="text-sm text-coral">{error}</p> : null}
        <Button className="w-full" type="submit">Login</Button>
      </form>
      <p className="mt-4 text-sm text-ink/60">New here? <Link className="font-semibold text-coral" to="/register">Create an account</Link></p>
    </div>
  )
}

