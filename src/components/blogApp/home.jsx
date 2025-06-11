import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Avatar, IconButton } from '@mui/material'
import { Edit, Bookmark, Article } from '@mui/icons-material'

const Home = () => {
  const [User, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    try {
      const UserId = localStorage.getItem("UserId")
      const response = await axios.get(`https://blogapp-backend-production-3501.up.railway.app/getUser/${UserId}`)
      setUser(response.data.singleUser)
    } catch (error) {
    }
  }

  const navigateToBlogs = () => {
    navigate('/UserBlogs')
  }

  const navigateToCreateBlog = () => {
    navigate('/addBlog')
  }

  const navigateToMyBlogs = () => {
    navigate('/AllBlogs')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-0">
        {/* Profile Header */}
        <div className="relative h-32 bg-gradient-to-r from-amber-400 to-pink-500">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <Avatar 
              sx={{ 
                width: 96, 
                height: 96, 
                fontSize: '2.5rem',
                border: '4px solid white',
                bgcolor: 'rgba(255,255,255,0.2)'
              }}
            >
              {User?.Name?.charAt(0).toUpperCase()}
            </Avatar>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 px-8 pb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-1">{User?.Name}</h1>
          <div className="flex items-center justify-center gap-1 mb-6">
            <span className="text-sm text-white/70">Registered MongoDB User</span>
            <span className="text-white/50">•</span>
            <IconButton size="small" sx={{ color: 'white' }}>
              <Edit fontSize="small" />
            </IconButton>
          </div>

          {/* User Info */}
          <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
            <div className="mb-4">
              <p className="text-white/60 text-sm font-medium">Email</p>
              <p className="text-white font-medium text-lg break-all">{User?.Email}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium">User ID</p>
              <p className="text-white font-mono text-sm break-all">{User?._id}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-around mb-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-white/60 text-sm">Blogs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">1.2K</p>
              <p className="text-white/60 text-sm">Views</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">86</p>
              <p className="text-white/60 text-sm">Likes</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              fullWidth
              onClick={navigateToBlogs}
              startIcon={<Article />}
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                py: 1.5,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 'medium',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              See My Blogs
            </Button>

            <Button
              fullWidth
              onClick={navigateToMyBlogs}
              startIcon={<Bookmark />}
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                py: 1.5,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 'medium',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              See All Blogs
            </Button>

            <Button
              fullWidth
              onClick={navigateToCreateBlog}
              sx={{
                background: 'linear-gradient(to right, #f59e0b, #ef4444)',
                color: 'white',
                py: 1.5,
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 'medium',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(to right, #e67e22, #dc2626)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                }
              }}
            >
              Create Your Own Blog
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home