import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/blogApp/home'
import AddBlog from './components/blogApp/addBlog';
import UserBlogs from './components/blogApp/UserBlogs';
import AllBlogs from './components/blogApp/AllBlogs';
import UpdateForm from './components/blogApp/updateForm';


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Allblogs" element={<AllBlogs />} />
        <Route path="/updateForm" element={<UpdateForm />} />
        <Route path='/home' element={<Home />} />  {/* Add this line */}
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path="/addBlog" element={<AddBlog />} />
        <Route path="/UserBlogs" element={<UserBlogs />} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />

    </>
  )
}

export default App
