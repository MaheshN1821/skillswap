"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../utils/api"

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [location, setLocation] = useState("")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const skillCategories = [
    "Programming",
    "Design",
    "Art & Music",
    "Language Learning",
    "Cooking & Baking",
    "Public Speaking",
    "Photography & Videography",
    "Health & Fitness",
    "Writing & Blogging",
    "Personal Development",
  ]

  useEffect(() => {
    searchUsers()
  }, [searchTerm, selectedCategory, location])

  const searchUsers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append("skill", searchTerm)
      if (selectedCategory) params.append("category", selectedCategory)
      if (location) params.append("location", location)

      const response = await api.get(`/users/search?${params}`)
      setUsers(response.data)
    } catch (error) {
      console.error("Error searching users:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">Find Skills to Learn</h1>
          <p className="text-zinc-600">Discover amazing teachers in your area</p>
        </div>

        {/* Search Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200/50 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Search Skills</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., React, Guitar, Cooking..."
                className="w-full px-4 py-3 bg-white/50 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {skillCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City name..."
                className="w-full px-4 py-3 bg-white/50 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200/50 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-zinc-700">{user.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900">{user.name}</h3>
                    <p className="text-sm text-zinc-600">{user.location}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-zinc-600 ml-1">
                        {user.rating.average.toFixed(1)} ({user.rating.count} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-zinc-700 mb-2">Skills Offered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full text-xs">
                        {skill.skill}
                      </span>
                    ))}
                    {user.skillsOffered.length > 3 && (
                      <span className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full text-xs">
                        +{user.skillsOffered.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  to={`/user/${user._id}`}
                  className="block w-full py-3 px-4 bg-gradient-to-r from-zinc-900 to-zinc-700 text-white rounded-xl text-center font-semibold hover:from-zinc-800 hover:to-zinc-600 transition-all duration-200"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && users.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <p className="text-zinc-600">No users found</p>
            <p className="text-sm text-zinc-500 mt-1">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
