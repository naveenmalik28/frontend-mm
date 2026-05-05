import { matchPath, useLocation } from "react-router-dom"

import SeoHead from "./SeoHead.jsx"

const ROUTE_SEO_CONFIG = [
  {
    path: "/login",
    title: "Login",
    description: "Sign in to Magnivel Media to continue reading, managing subscriptions, and publishing your ideas.",
    noIndex: true,
  },
  {
    path: "/register",
    title: "Create Account",
    description: "Create your Magnivel Media account and start reading, writing, and sharing insights on AI, tech, and innovation.",
    noIndex: true,
  },
  {
    path: "/plans",
    title: "Subscription Plans",
    description: "Compare Magnivel Media subscription plans and unlock publishing tools to grow your audience and thought leadership.",
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    description: "Manage your writing workflow, article performance, and publishing activity in your Magnivel Media dashboard.",
    noIndex: true,
  },
  {
    path: "/dashboard/my-articles",
    title: "My Articles",
    description: "Manage drafts and published content from your Magnivel Media author workspace.",
    noIndex: true,
  },
  {
    path: "/dashboard/new-article",
    title: "Create Article",
    description: "Write and publish a new article on Magnivel Media.",
    noIndex: true,
  },
  {
    path: "/dashboard/edit/:id",
    title: "Edit Article",
    description: "Edit your Magnivel Media article and optimize it before publishing.",
    noIndex: true,
  },
  {
    path: "/dashboard/analytics",
    title: "Article Analytics",
    description: "Track readers, engagement, and content performance across your Magnivel Media articles.",
    noIndex: true,
  },
  {
    path: "/profile",
    title: "Profile",
    description: "View and manage your Magnivel Media author profile.",
    noIndex: true,
  },
  {
    path: "/settings",
    title: "Account Settings",
    description: "Manage account details and security preferences on Magnivel Media.",
    noIndex: true,
  },
  {
    path: "/checkout/:planId",
    title: "Checkout",
    description: "Complete your Magnivel Media subscription checkout.",
    noIndex: true,
  },
  {
    path: "/subscription/success",
    title: "Subscription Success",
    description: "Your Magnivel Media subscription has been activated successfully.",
    noIndex: true,
  },
]

export default function RouteSeo() {
  const location = useLocation()
  const activeConfig = ROUTE_SEO_CONFIG.find((config) =>
    matchPath({ path: config.path, end: true }, location.pathname),
  )

  if (!activeConfig) return null

  return (
    <SeoHead
      title={activeConfig.title}
      description={activeConfig.description}
      path={location.pathname}
      noIndex={activeConfig.noIndex}
    />
  )
}
