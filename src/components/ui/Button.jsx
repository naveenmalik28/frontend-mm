export default function Button({ children, className = "", variant = "primary", ...props }) {
  const variants = {
    primary: "bg-coral text-white hover:bg-coral/90",
    secondary: "bg-ink text-white hover:bg-ink/90",
    ghost: "bg-white text-ink hover:bg-mist",
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

