import { NavLink } from "react-router-dom"

const links = [
  { to: "/dashboard", label: "Overview" },
  { to: "/dashboard/my-articles", label: "My articles" },
  { to: "/dashboard/new-article", label: "New article" },
  { to: "/dashboard/analytics", label: "Analytics" },
  { to: "/profile", label: "Profile" },
  { to: "/settings", label: "Settings" },
]

export default function Sidebar() {
  return (
    <aside className="glass-panel p-4">
      <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-teal">Workspace</div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-ink text-white" : "hover:bg-mist"}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

