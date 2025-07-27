"use client"

import { useState, useEffect } from "react"
import "./AdminDashboard.css"
import FeedbackChart from "./FeedbackChart"

const AdminDashboard = ({ onLogout }) => {
  const [feedbacks, setFeedbacks] = useState([])
  const [activeTab, setActiveTab] = useState("analytics")

  useEffect(() => {
    loadFeedbacks()
  }, [])

  const loadFeedbacks = () => {
    const storedFeedback = JSON.parse(localStorage.getItem("campusFeedback") || "[]")

    // Add sample data if none exists
    if (storedFeedback.length === 0) {
      const sampleData = [
        {
          id: "1",
          category: "faculty",
          subject: "Great Teaching Methods",
          rating: "excellent",
          feedback: "The professor explains concepts very clearly and is always available for help.",
          suggestions: "Maybe add more practical examples in lectures.",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "2",
          category: "facilities",
          subject: "Library Improvements Needed",
          rating: "average",
          feedback: "The library is good but could use more study spaces and better WiFi.",
          suggestions: "Add more group study rooms and upgrade internet speed.",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "3",
          category: "events",
          subject: "Amazing Cultural Fest",
          rating: "excellent",
          feedback: "The recent cultural festival was well organized and very enjoyable.",
          suggestions: "Continue organizing such events regularly.",
          timestamp: new Date().toISOString(),
        },
      ]
      localStorage.setItem("campusFeedback", JSON.stringify(sampleData))
      setFeedbacks(sampleData)
    } else {
      setFeedbacks(storedFeedback)
    }
  }

  const handleDelete = (id) => {
    const updatedFeedbacks = feedbacks.filter((f) => f.id !== id)
    setFeedbacks(updatedFeedbacks)
    localStorage.setItem("campusFeedback", JSON.stringify(updatedFeedbacks))
  }

  const downloadCSV = () => {
    const csvContent = [
      ["ID", "Category", "Subject", "Rating", "Feedback", "Suggestions", "Timestamp"],
      ...feedbacks.map((f) => [f.id, f.category, f.subject, f.rating, f.feedback, f.suggestions, f.timestamp]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "campus-feedback.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getRatingClass = (rating) => {
    switch (rating) {
      case "excellent":
        return "rating-excellent"
      case "good":
        return "rating-good"
      case "average":
        return "rating-average"
      case "poor":
        return "rating-poor"
      default:
        return "rating-default"
    }
  }

  const weeklyFeedbacks = feedbacks.filter(
    (f) => new Date(f.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).length

  const positiveRating =
    feedbacks.length > 0
      ? Math.round(
          (feedbacks.filter((f) => f.rating === "excellent" || f.rating === "good").length / feedbacks.length) * 100,
        )
      : 0

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <span className="icon">💬</span>
            <h1>Admin Dashboard</h1>
          </div>
          <div className="header-actions">
            <button className="action-btn" onClick={downloadCSV}>
              📥 Export CSV
            </button>
            <button className="action-btn logout-btn" onClick={onLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-content">
              <p className="stat-label">Total Feedback</p>
              <p className="stat-value">{feedbacks.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <p className="stat-label">This Week</p>
              <p className="stat-value">{weeklyFeedbacks}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <p className="stat-label">Positive Rating</p>
              <p className="stat-value">{positiveRating}%</p>
            </div>
          </div>
        </div>

        <div className="tabs">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
            <button
              className={`tab-btn ${activeTab === "feedback" ? "active" : ""}`}
              onClick={() => setActiveTab("feedback")}
            >
              All Feedback
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "analytics" && (
              <div className="analytics-content">
                <FeedbackChart feedbacks={feedbacks} />
              </div>
            )}

            {activeTab === "feedback" && (
              <div className="feedback-content">
                <div className="feedback-card">
                  <div className="card-header">
                    <h3>All Feedback Submissions</h3>
                    <p>Manage and review all submitted feedback</p>
                  </div>
                  <div className="feedback-list">
                    {feedbacks.length === 0 ? (
                      <p className="no-feedback">No feedback submissions yet.</p>
                    ) : (
                      feedbacks.map((feedback) => (
                        <div key={feedback.id} className="feedback-item">
                          <div className="feedback-header">
                            <div className="feedback-badges">
                              <span className="category-badge">{feedback.category}</span>
                              <span className={`rating-badge ${getRatingClass(feedback.rating)}`}>
                                {feedback.rating}
                              </span>
                            </div>
                            <div className="feedback-actions">
                              <span className="feedback-date">{new Date(feedback.timestamp).toLocaleDateString()}</span>
                              <button className="delete-btn" onClick={() => handleDelete(feedback.id)}>
                                🗑️
                              </button>
                            </div>
                          </div>
                          <div className="feedback-body">
                            <h4>{feedback.subject}</h4>
                            <p className="feedback-text">{feedback.feedback}</p>
                            {feedback.suggestions && (
                              <div className="suggestions">
                                <p className="suggestions-label">Suggestions:</p>
                                <p className="suggestions-text">{feedback.suggestions}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
