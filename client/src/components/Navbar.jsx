"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const { user } = useAuth()

  // Default avatar image URL from a free male avatar resource
  const defaultAvatar = "data:image/png;base64,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"

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-zinc-200/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-zinc-900 to-zinc-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SS</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
              SkillSwap
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-zinc-700 hover:text-zinc-900 transition-colors text-sm"
                >
                  Dashboard
                </Link>
                <Link
                  to="/search"
                  className="px-4 py-2 text-zinc-700 hover:text-zinc-900 transition-colors text-sm"
                >
                  Search
                </Link>
                <Link
                  to="/bookings"
                  className="px-4 py-2 text-zinc-700 hover:text-zinc-900 transition-colors text-sm"
                >
                  Bookings
                </Link>
                <div className="flex items-center space-x-2 px-3 py-1 bg-indigo-100 rounded-full">
                  <span className="text-sm font-medium text-indigo-800">{user.points || 0} pts</span>
                </div>
                <Link to="/profile">
                  <img
                    src={user.profilePic || defaultAvatar}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-300"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-zinc-700 hover:text-zinc-900 transition-colors text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-zinc-900 to-zinc-700 text-white rounded-lg text-sm hover:from-zinc-800 hover:to-zinc-600 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
)
}

export default Navbar
