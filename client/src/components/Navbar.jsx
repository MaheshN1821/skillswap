"use client"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

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
                <Link to="/dashboard" className="px-4 py-2 text-zinc-700 hover:text-zinc-900 transition-colors">
                  Dashboard
                </Link>
                <Link to="/search" className="px-4 py-2 text-zinc-700 hover:text-zinc-900 transition-colors">
                  Search
                </Link>
                <Link to="/bookings" className="px-4 py-2 text-zinc-700 hover:text-zinc-900 transition-colors">
                  Bookings
                </Link>
                <Link to="/profile" className="px-4 py-2 text-zinc-700 hover:text-zinc-900 transition-colors">
                  Profile
                </Link>
                <div className="flex items-center space-x-2 px-3 py-1 bg-zinc-100 rounded-full">
                  <span className="text-sm font-medium text-zinc-700">{user.points || 0} points</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gradient-to-r from-zinc-900 to-zinc-700 text-white rounded-lg hover:from-zinc-800 hover:to-zinc-600 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-zinc-700 hover:text-zinc-900 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-zinc-900 to-zinc-700 text-white rounded-lg hover:from-zinc-800 hover:to-zinc-600 transition-all duration-200"
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
