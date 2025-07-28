"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const { addToast } = useToast()
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: user?.age || "",
    gender: user?.gender || "",
    location: user?.location || "",
    bio: user?.bio || "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await updateProfile(formData)

    if (result.success) {
      addToast("Profile updated successfully!", "success")
      setEditing(false)
    } else {
      addToast(result.message, "error")
    }

    setLoading(false)
  }

  const cancelEdit = () => {
    setFormData({
      name: user?.name || "",
      age: user?.age || "",
      gender: user?.gender || "",
      location: user?.location || "",
      bio: user?.bio || "",
    })
    setEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-rose-900 mb-4">My Profile</h1>
          <p className="text-rose-600">Manage your account and skills</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-rose-200/50 p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-rose-900">Personal Information</h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-400 text-white rounded-lg hover:from-rose-400 hover:to-pink-300 transition-all duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-rose-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/70 border border-rose-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-rose-700 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/70 border border-rose-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-rose-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/70 border border-rose-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-rose-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/70 border border-rose-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-rose-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/70 border border-rose-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 py-3 px-4 bg-rose-200 text-rose-700 rounded-xl hover:bg-rose-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-xl hover:from-rose-500 hover:to-pink-400 transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-rose-600">Name</label>
                  <p className="text-lg text-rose-900">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-rose-600">Age</label>
                  <p className="text-lg text-rose-900">{user?.age}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-rose-600">Gender</label>
                  <p className="text-lg text-rose-900 capitalize">{user?.gender}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-rose-600">Location</label>
                  <p className="text-lg text-rose-900">{user?.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-rose-600">Points Balance</label>
                  <p className="text-lg text-rose-900">{user?.points || 0} points</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-rose-600">Rating</label>
                  <p className="text-lg text-rose-900">
                    ★ {user?.rating?.average?.toFixed(1) || "0.0"} ({user?.rating?.count || 0} reviews)
                  </p>
                </div>
              </div>

              {user?.bio && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-rose-600">Bio</label>
                  <p className="text-lg text-rose-900 mt-1">{user.bio}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Skills Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-rose-200/50 p-6">
            <h3 className="text-xl font-bold text-rose-900 mb-4">Skills I Teach</h3>
            {user?.skillsOffered?.length > 0 ? (
              <div className="space-y-3">
                {user.skillsOffered.map((skill, index) => (
                  <div key={index} className="bg-rose-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-rose-900">{skill.skill}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        skill.level === "expert"
                          ? "bg-green-100 text-green-800"
                          : skill.level === "intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-sm text-rose-700">{skill.category}</p>
                    <p className="text-sm text-rose-500">{skill.experience} years experience</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-rose-500">No skills added yet</p>
            )}
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-rose-200/50 p-6">
            <h3 className="text-xl font-bold text-rose-900 mb-4">Skills I Want to Learn</h3>
            {user?.skillsWanted?.length > 0 ? (
              <div className="space-y-3">
                {user.skillsWanted.map((skill, index) => (
                  <div key={index} className="bg-rose-50 rounded-lg p-4">
                    <h4 className="font-semibold text-rose-900">{skill.skill}</h4>
                    <p className="text-sm text-rose-700">{skill.category}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-rose-500">No learning goals added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
