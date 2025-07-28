"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import api from "../utils/api"

const Bookings = () => {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [activeTab])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const params = activeTab === "all" ? "" : `?type=${activeTab}`
      const response = await api.get(`/bookings/my-bookings${params}`)
      setBookings(response.data)
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId, status, meetingLink = "") => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status, meetingLink })
      addToast(`Booking ${status} successfully!`, "success")
      fetchBookings()
    } catch (error) {
      addToast("Failed to update booking", "error")
    }
  }

  const completeSession = async (bookingId) => {
    try {
      await api.put(`/bookings/${bookingId}/complete`)
      addToast("Session completed successfully!", "success")
      fetchBookings()
    } catch (error) {
      addToast("Failed to complete session", "error")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "teaching") return booking.teacher._id === user.id
    if (activeTab === "learning") return booking.learner._id === user.id
    return true
  })

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">My Bookings</h1>
          <p className="text-zinc-600">Manage your teaching and learning sessions</p>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200/50 p-2 mb-8">
          <div className="flex space-x-2">
            {[
              { id: "all", label: "All Bookings" },
              { id: "teaching", label: "Teaching" },
              { id: "learning", label: "Learning" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-zinc-900 to-zinc-700 text-white"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200/50 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-full flex items-center justify-center">
                        <span className="font-bold text-zinc-700">
                          {booking.teacher._id === user.id ? booking.learner.name[0] : booking.teacher.name[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-900">{booking.skill}</h3>
                        <p className="text-zinc-600">
                          {booking.teacher._id === user.id ? "Teaching" : "Learning from"}{" "}
                          {booking.teacher._id === user.id ? booking.learner.name : booking.teacher.name}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-zinc-500">Date:</span>
                        <p className="font-medium">{new Date(booking.scheduledDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500">Time:</span>
                        <p className="font-medium">{new Date(booking.scheduledDate).toLocaleTimeString()}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500">Duration:</span>
                        <p className="font-medium">{booking.duration} minutes</p>
                      </div>
                      <div>
                        <span className="text-zinc-500">Status:</span>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    {booking.message && (
                      <div className="mt-4 p-3 bg-zinc-50 rounded-lg">
                        <p className="text-sm text-zinc-700">{booking.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 lg:ml-6">
                    {booking.teacher._id === user.id && booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking._id, "accepted", "https://meet.google.com/new")}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking._id, "rejected")}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {booking.status === "accepted" && (
                      <>
                        {booking.meetingLink && (
                          <a
                            href={booking.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm text-center"
                          >
                            Join Meeting
                          </a>
                        )}
                        {booking.teacher._id === user.id && (
                          <button
                            onClick={() => completeSession(booking._id)}
                            className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm"
                          >
                            Mark Complete
                          </button>
                        )}
                      </>
                    )}

                    {booking.status === "completed" && booking.pointsEarned > 0 && (
                      <div className="text-center">
                        <span className="text-sm text-green-600 font-medium">
                          +{booking.pointsEarned} points earned
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <p className="text-zinc-600">No bookings found</p>
                <p className="text-sm text-zinc-500 mt-1">
                  {activeTab === "teaching"
                    ? "No one has booked your skills yet"
                    : activeTab === "learning"
                      ? "You haven't booked any sessions yet"
                      : "No bookings available"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Bookings
