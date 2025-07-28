"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Landing = () => {
  const { user } = useAuth()

  const skillCategories = [
    { name: "Programming", icon: "💻", color: "from-blue-500 to-purple-600" },
    { name: "Design", icon: "🎨", color: "from-pink-500 to-rose-600" },
    { name: "Art & Music", icon: "🎵", color: "from-green-500 to-teal-600" },
    { name: "Language Learning", icon: "🗣️", color: "from-yellow-500 to-orange-600" },
    { name: "Cooking & Baking", icon: "👨‍🍳", color: "from-red-500 to-pink-600" },
    { name: "Public Speaking", icon: "🎤", color: "from-indigo-500 to-blue-600" },
    { name: "Photography", icon: "📸", color: "from-purple-500 to-indigo-600" },
    { name: "Health & Fitness", icon: "💪", color: "from-green-500 to-emerald-600" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Trade Skills,
              <span className="block bg-gradient-to-r from-zinc-300 to-white bg-clip-text text-transparent">
                Not Money
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
              1 Hour of Your Skill = 1 Point to Learn Any Other Skill
            </p>
            <p className="text-lg text-zinc-400 mb-12 max-w-2xl mx-auto">
              Join a community where knowledge flows freely. Teach what you know, learn what you need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="px-8 py-4 bg-gradient-to-r from-white to-zinc-100 text-zinc-900 rounded-xl font-semibold text-lg hover:from-zinc-100 hover:to-zinc-200 transition-all duration-200 shadow-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-8 py-4 bg-gradient-to-r from-white to-zinc-100 text-zinc-900 rounded-xl font-semibold text-lg hover:from-zinc-100 hover:to-zinc-200 transition-all duration-200 shadow-lg"
                  >
                    Start Learning
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-zinc-900 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-900 mb-4">How It Works</h2>
            <p className="text-xl text-zinc-600">Simple, fair, and community-driven</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">Teach & Earn</h3>
              <p className="text-zinc-600">Share your skills and earn points for every hour you teach</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">Spend Points</h3>
              <p className="text-zinc-600">Use your earned points to learn new skills from others</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">Build Community</h3>
              <p className="text-zinc-600">Rate experiences and build a trusted learning network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-24 bg-gradient-to-br from-zinc-50 to-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-900 mb-4">Popular Skill Categories</h2>
            <p className="text-xl text-zinc-600">Discover what you can learn and teach</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 transition-all duration-200 border border-zinc-200/50 group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-semibold text-zinc-900">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-zinc-900 to-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Skill Journey?</h2>
          <p className="text-xl text-zinc-300 mb-8">Join thousands of learners and teachers in our growing community</p>
          {!user && (
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-gradient-to-r from-white to-zinc-100 text-zinc-900 rounded-xl font-semibold text-lg hover:from-zinc-100 hover:to-zinc-200 transition-all duration-200 shadow-lg"
            >
              Get Started Free
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Landing
