"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Users, Building, Calendar } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    rating: "",
    feedback: "",
    suggestions: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          id: Date.now().toString(),
        }),
      })

      if (response.ok) {
        toast({
          title: "Feedback Submitted",
          description: "Thank you for your anonymous feedback!",
        })
        setFormData({
          category: "",
          subject: "",
          rating: "",
          feedback: "",
          suggestions: "",
        })
      } else {
        throw new Error("Failed to submit feedback")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Campus Feedback Portal</h1>
            </div>
            <Link href="/admin/login">
              <Button variant="outline">Admin Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Your Voice</h2>
          <p className="text-lg text-gray-600 mb-8">
            Help us improve campus life by sharing your anonymous feedback about faculty, events, and facilities.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Faculty</h3>
              <p className="text-sm text-gray-600">Teaching quality & support</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">Events</h3>
              <p className="text-sm text-gray-600">Campus activities & programs</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Building className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Facilities</h3>
              <p className="text-sm text-gray-600">Infrastructure & amenities</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <MessageSquare className="h-12 w-12 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold">General</h3>
              <p className="text-sm text-gray-600">Overall campus experience</p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Submit Anonymous Feedback</CardTitle>
            <CardDescription>Your feedback is completely anonymous and helps us improve campus life.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Feedback Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="facilities">Facilities</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject/Topic</Label>
                <Input
                  id="subject"
                  placeholder="Brief subject of your feedback"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label>Overall Rating</Label>
                <RadioGroup
                  value={formData.rating}
                  onValueChange={(value) => setFormData({ ...formData, rating: value })}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="excellent" />
                    <Label htmlFor="excellent">Excellent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="good" />
                    <Label htmlFor="good">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="average" id="average" />
                    <Label htmlFor="average">Average</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="poor" />
                    <Label htmlFor="poor">Poor</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Detailed Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your detailed feedback here..."
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="suggestions">Suggestions for Improvement</Label>
                <Textarea
                  id="suggestions"
                  placeholder="Any suggestions to make things better?"
                  value={formData.suggestions}
                  onChange={(e) => setFormData({ ...formData, suggestions: e.target.value })}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Anonymous Feedback"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
