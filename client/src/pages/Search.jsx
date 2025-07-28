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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-yellow-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">Find Skills to Learn</h1>
          <p className="text-zinc-700 text-lg mt-2">Discover amazing teachers in your area</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg border border-zinc-200/40 rounded-3xl p-6 shadow-xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Search Skills</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., React, Guitar, Cooking..."
                className="w-full px-4 py-3 bg-white/60 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/60 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {skillCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
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
                className="w-full px-4 py-3 bg-white/60 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-fuchsia-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white/80 border border-zinc-200/50 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-300 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {user.name[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-800">{user.name}</h3>
                    <p className="text-sm text-zinc-500">{user.location}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-zinc-600 ml-1">
                        {user.rating.average.toFixed(1)} ({user.rating.count} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-zinc-700 mb-2">Skills Offered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
                        {skill.skill}
                      </span>
                    ))}
                    {user.skillsOffered.length > 3 && (
                      <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
                        +{user.skillsOffered.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  to={`/user/${user._id}`}
                  className="block w-full py-3 px-4 bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white rounded-xl text-center font-semibold hover:from-fuchsia-500 hover:to-pink-400 transition-all duration-200"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && users.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
