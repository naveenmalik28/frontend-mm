import { Suspense, lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Footer from "./components/layout/Footer.jsx"
import Navbar from "./components/layout/Navbar.jsx"
import RouteSeo from "./components/seo/RouteSeo.jsx"
import Spinner from "./components/ui/Spinner.jsx"
import PrivateRoutes from "./routes/PrivateRoutes.jsx"
import SubscriberRoutes from "./routes/SubscriberRoutes.jsx"

const Home = lazy(() => import("./pages/Home.jsx"))
const Explore = lazy(() => import("./pages/Explore.jsx"))
const ArticleDetail = lazy(() => import("./pages/ArticleDetail.jsx"))
const Login = lazy(() => import("./pages/auth/Login.jsx"))
const Register = lazy(() => import("./pages/auth/Register.jsx"))
const Plans = lazy(() => import("./pages/subscription/Plans.jsx"))
const About = lazy(() => import("./pages/info/About.jsx"))
const Contact = lazy(() => import("./pages/info/Contact.jsx"))
const PrivacyPolicy = lazy(() => import("./pages/info/PrivacyPolicy.jsx"))
const TermsOfService = lazy(() => import("./pages/info/TermsOfService.jsx"))
const ShippingPolicy = lazy(() => import("./pages/info/ShippingPolicy.jsx"))
const CancellationRefundPolicy = lazy(() => import("./pages/info/CancellationRefundPolicy.jsx"))
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard.jsx"))
const MyArticles = lazy(() => import("./pages/dashboard/MyArticles.jsx"))
const Profile = lazy(() => import("./pages/profile/Profile.jsx"))
const Settings = lazy(() => import("./pages/profile/Settings.jsx"))
const Checkout = lazy(() => import("./pages/subscription/Checkout.jsx"))
const Success = lazy(() => import("./pages/subscription/Success.jsx"))
const NewArticle = lazy(() => import("./pages/dashboard/NewArticle.jsx"))
const Analytics = lazy(() => import("./pages/dashboard/Analytics.jsx"))

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner label="Loading page..." />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-sand text-ink">
        <Navbar />
        <RouteSeo />
        <main className="mx-auto min-h-[calc(100vh-168px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:slug" element={<ArticleDetail />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/category/:slug" element={<Explore />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/cancellation-refund-policy" element={<CancellationRefundPolicy />} />

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
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
