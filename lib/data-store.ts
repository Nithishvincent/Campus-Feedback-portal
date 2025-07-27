// Shared in-memory data store
// In production, this would be replaced with a database

interface Feedback {
  id: string
  category: string
  subject: string
  rating: string
  feedback: string
  suggestions: string
  timestamp: string
}

// Shared feedbacks array that all API routes will use
export const feedbacks: Feedback[] = []

// Helper function to add sample data for testing
export function addSampleData() {
  if (feedbacks.length === 0) {
    feedbacks.push(
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
    )
  }
}
