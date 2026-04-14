import { useState } from "react"

import { changePassword, updateProfile } from "../../api/auth.api.js"
import { useAuthStore } from "../../store/authStore.js"
import Button from "../../components/ui/Button.jsx"

export default function Settings() {
  const user = useAuthStore((state) => state.user)
  const updateUser = useAuthStore((state) => state.updateUser)
  const [profile, setProfile] = useState({
    username: user?.username || "",
    full_name: user?.full_name || "",
    avatar: user?.avatar || "",
    bio: user?.bio || "",
  })
  const [passwordForm, setPasswordForm] = useState({ old_password: "", new_password: "" })
  const [message, setMessage] = useState("")

  const handleProfileSave = async () => {
    const updated = await updateProfile(profile)
    updateUser(updated)
    setMessage("Profile updated.")
  }

  const handlePasswordSave = async () => {
    await changePassword(passwordForm)
    setMessage("Password updated.")
    setPasswordForm({ old_password: "", new_password: "" })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="glass-panel p-8">
        <span className="eyebrow">Settings</span>
        <h1 className="mt-4 font-display text-4xl">Manage your account</h1>
        {message ? <p className="mt-3 text-sm text-teal">{message}</p> : null}
      </section>

      <section className="glass-panel space-y-4 p-8">
        <h2 className="font-display text-2xl">Profile details</h2>
        <input className="input" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} placeholder="Full name" />
        <input className="input" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} placeholder="Username" />
        <input className="input" value={profile.avatar} onChange={(e) => setProfile({ ...profile, avatar: e.target.value })} placeholder="Avatar URL" />
        <textarea className="textarea" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Bio" />
        <Button onClick={handleProfileSave} type="button">Save profile</Button>
      </section>

      <section className="glass-panel space-y-4 p-8">
        <h2 className="font-display text-2xl">Password</h2>
        <input className="input" type="password" value={passwordForm.old_password} onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })} placeholder="Current password" />
        <input className="input" type="password" value={passwordForm.new_password} onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })} placeholder="New password" />
        <Button onClick={handlePasswordSave} type="button" variant="secondary">Update password</Button>
      </section>
    </div>
  )
}
