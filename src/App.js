"use client"

import { useState } from "react"
import "./App.css"
import FeedbackForm from "./components/FeedbackForm"
import AdminLogin from "./components/AdminLogin"
import AdminDashboard from "./components/AdminDashboard"

function App() {
  const [currentView, setCurrentView] = useState("home") // 'home', 'admin-login', 'admin-dashboard'
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true)
    setCurrentView("admin-dashboard")
  }

  const handleLogout = () => {
    setIsAdminLoggedIn(false)
    setCurrentView("home")
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "admin-login":
        return <AdminLogin onLogin={handleAdminLogin} onBack={() => setCurrentView("home")} />
      case "admin-dashboard":
        return <AdminDashboard onLogout={handleLogout} />
      default:
        return <FeedbackForm onAdminClick={() => setCurrentView("admin-login")} />
    }
  }

  return <div className="App">{renderCurrentView()}</div>
}

export default App
