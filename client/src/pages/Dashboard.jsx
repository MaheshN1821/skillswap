"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import api from "../utils/api"

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingRequests: 0,
    completedSessions: 0,
    upcomingSessions: 0,
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const bookingsResponse = await api.get("/bookings/my-bookings")
      const bookings = bookingsResponse.data

      setRecentBookings(bookings.slice(0, 5))

      setStats({
        totalBookings: bookings.length,
        pendingRequests: bookings.filter((b) => b.status === "pending" && b.teacher._id === user.id).length,
        completedSessions: bookings.filter((b) => b.status === "completed").length,
        upcomingSessions: bookings.filter((b) => b.status === "accepted" && new Date(b.scheduledDate) > new Date())
          .length,
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-zinc-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Welcome back, {user?.name}!</h1>
          <p className="text-zinc-600 mt-2">Here's what's happening with your skills today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600">Points Balance</p>
                <p className="text-2xl font-bold text-zinc-900">{user?.points || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600">Pending Requests</p>
                <p className="text-2xl font-bold text-zinc-900">{stats.pendingRequests}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600">Completed Sessions</p>
                <p className="text-2xl font-bold text-zinc-900">{stats.completedSessions}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-zinc-900">{stats.upcomingSessions}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/search"
            className="bg-gradient-to-br from-zinc-900 to-zinc-700 text-white rounded-2xl p-6 hover:from-zinc-800 hover:to-zinc-600 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔍</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Find Skills</h3>
                <p className="text-zinc-300 text-sm">Discover new skills to learn</p>
              </div>
            </div>
          </Link>

          <Link
            to="/bookings"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 hover:from-blue-400 hover:to-blue-500 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">My Bookings</h3>
                <p className="text-blue-100 text-sm">Manage your sessions</p>
              </div>
            </div>
          </Link>

          <Link
            to="/profile"
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 hover:from-green-400 hover:to-green-500 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">My Profile</h3>
                <p className="text-green-100 text-sm">Update your skills</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900">Recent Bookings</h2>
            <Link to="/bookings" className="text-zinc-600 hover:text-zinc-900 text-sm font-medium">
              View All
            </Link>
          </div>

          {recentBookings.length > 0 ? (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking._id} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {booking.teacher._id === user.id ? booking.learner.name[0] : booking.teacher.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900">
                        {booking.skill} - {booking.teacher._id === user.id ? "Teaching" : "Learning"}
                      </p>
                      <p className="text-sm text-zinc-600">
                        with {booking.teacher._id === user.id ? booking.learner.name : booking.teacher.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                    <p className="text-xs text-zinc-500 mt-1">{new Date(booking.scheduledDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <p className="text-zinc-600">No bookings yet</p>
              <p className="text-sm text-zinc-500 mt-1">Start by searching for skills to learn!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
