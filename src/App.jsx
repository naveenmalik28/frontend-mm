import { BrowserRouter, Route, Routes } from "react-router-dom"

import Footer from "./components/layout/Footer.jsx"
import Navbar from "./components/layout/Navbar.jsx"
import PrivateRoutes from "./routes/PrivateRoutes.jsx"
import SubscriberRoutes from "./routes/SubscriberRoutes.jsx"
import ArticleDetail from "./pages/ArticleDetail.jsx"
import Explore from "./pages/Explore.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/auth/Login.jsx"
import Register from "./pages/auth/Register.jsx"
import Analytics from "./pages/dashboard/Analytics.jsx"
import Dashboard from "./pages/dashboard/Dashboard.jsx"
import MyArticles from "./pages/dashboard/MyArticles.jsx"
import NewArticle from "./pages/dashboard/NewArticle.jsx"
import Profile from "./pages/profile/Profile.jsx"
import Settings from "./pages/profile/Settings.jsx"
import Checkout from "./pages/subscription/Checkout.jsx"
import Plans from "./pages/subscription/Plans.jsx"
import Success from "./pages/subscription/Success.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-sand text-ink">
        <Navbar />
        <main className="mx-auto min-h-[calc(100vh-168px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:slug" element={<ArticleDetail />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/category/:slug" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/plans" element={<Plans />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/my-articles" element={<MyArticles />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/checkout/:planId" element={<Checkout />} />
              <Route path="/subscription/success" element={<Success />} />
            </Route>

            <Route element={<SubscriberRoutes />}>
              <Route path="/dashboard/new-article" element={<NewArticle />} />
              <Route path="/dashboard/edit/:id" element={<NewArticle />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

