import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { registerUser } from "../../api/auth.api.js"
import { useAuthStore } from "../../store/authStore.js"
import Button from "../../components/ui/Button.jsx"

export default function Register() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [form, setForm] = useState({ email: "", username: "", full_name: "", password: "" })
  const [error, setError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    try {
      const response = await registerUser(form)
      login(response.user, response.access, response.refresh)
      navigate("/dashboard")
    } catch {
      setError("Registration failed. Please review the details and try again.")
    }
  }

  return (
    <div className="mx-auto max-w-md glass-panel p-8">
      <span className="eyebrow">Start publishing</span>
      <h1 className="mt-4 font-display text-4xl">Create your account</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input className="input" placeholder="Full name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        <input className="input" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error ? <p className="text-sm text-coral">{error}</p> : null}
        <Button className="w-full" type="submit">Create account</Button>
      </form>
      <p className="mt-4 text-sm text-ink/60">Already have an account? <Link className="font-semibold text-coral" to="/login">Login</Link></p>
    </div>
  )
}

