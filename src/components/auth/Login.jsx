import React from 'react'
import { TextField, Button } from '@mui/material'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailHandler = (e) => setEmail(e.target.value)
  const passwordHandler = (e) => setPassword(e.target.value)

  const LoginHandler = async () => {
    setLoading(true)
    try {
      const UserCredentials = await signInWithEmailAndPassword(auth, email, password)
      toast.success("Login successful!");
      navigate('/home')
    } catch (error) {
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className='w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden'>
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <h1 className='text-3xl font-bold text-white'>Welcome Back</h1>
          <p className="text-indigo-100 mt-2">Sign in to your account</p>
        </div>

        <div className="p-8">
          <TextField
            onChange={emailHandler}
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            sx={{ mb: 3 }}
            InputProps={{
              style: {
                borderRadius: '12px',
              }
            }}
          />
          <TextField
            onChange={passwordHandler}
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{ mb: 4 }}
            InputProps={{
              style: {
                borderRadius: '12px',
              }
            }}
          />

          <Button
            onClick={LoginHandler}
            disabled={loading || !email || !password}
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: '12px',
              background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'medium',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(to right, #4338ca, #6d28d9)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              },
              '&:disabled': {
                background: '#e2e8f0',
                color: '#64748b'
              }
            }}
            variant="contained"
          >
            {loading ? "Signing In..." : "Login"}
          </Button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-indigo-600 font-medium hover:underline hover:text-indigo-700"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default Login