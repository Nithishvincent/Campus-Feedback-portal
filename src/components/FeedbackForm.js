"use client"

import { useState } from "react"
import "./FeedbackForm.css"

const FeedbackForm = ({ onAdminClick }) => {
  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    rating: "",
    feedback: "",
    suggestions: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Store in localStorage (simulating backend)
      const existingFeedback = JSON.parse(localStorage.getItem("campusFeedback") || "[]")
      const newFeedback = {
        ...formData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      }
      existingFeedback.push(newFeedback)
      localStorage.setItem("campusFeedback", JSON.stringify(existingFeedback))

      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({
        category: "",
        subject: "",
        rating: "",
        feedback: "",
        suggestions: "",
      })

      setTimeout(() => setShowSuccess(false), 3000)
    }, 1000)
  }

  return (
    <div className="feedback-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="icon">💬</span>
            <h1>Campus Feedback Portal</h1>
          </div>
          <button className="admin-btn" onClick={onAdminClick}>
            Admin Login
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <h2>Share Your Voice</h2>
          <p>Help us improve campus life by sharing your anonymous feedback about faculty, events, and facilities.</p>
        </div>

        <div className="category-cards">
          <div className="category-card">
            <div className="card-icon">👥</div>
            <h3>Faculty</h3>
            <p>Teaching quality & support</p>
          </div>
          <div className="category-card">
            <div className="card-icon">📅</div>
            <h3>Events</h3>
            <p>Campus activities & programs</p>
          </div>
          <div className="category-card">
            <div className="card-icon">🏢</div>
            <h3>Facilities</h3>
            <p>Infrastructure & amenities</p>
          </div>
          <div className="category-card">
            <div className="card-icon">💬</div>
            <h3>General</h3>
            <p>Overall campus experience</p>
          </div>
        </div>

        <div className="form-container">
          <div className="form-card">
            <div className="form-header">
              <h3>Submit Anonymous Feedback</h3>
              <p>Your feedback is completely anonymous and helps us improve campus life.</p>
            </div>

            {showSuccess && <div className="success-message">✅ Thank you for your anonymous feedback!</div>}

            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="form-group">
                <label htmlFor="category">Feedback Category</label>
                <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                  <option value="">Select a category</option>
                  <option value="faculty">Faculty</option>
                  <option value="events">Events</option>
                  <option value="facilities">Facilities</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject/Topic</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Brief subject of your feedback"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Overall Rating</label>
                <div className="radio-group">
                  {["excellent", "good", "average", "poor"].map((rating) => (
                    <label key={rating} className="radio-label">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={formData.rating === rating}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="radio-text">{rating.charAt(0).toUpperCase() + rating.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="feedback">Detailed Feedback</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Share your detailed feedback here..."
                  value={formData.feedback}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="suggestions">Suggestions for Improvement</label>
                <textarea
                  id="suggestions"
                  name="suggestions"
                  placeholder="Any suggestions to make things better?"
                  value={formData.suggestions}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Anonymous Feedback"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default FeedbackForm
