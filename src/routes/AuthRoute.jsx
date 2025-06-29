import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const AuthRoute = () => {
  return (
        !localStorage.getItem("UserId") ?
      <Outlet /> : <Navigate to={"/home"} />      
  )
}

export default AuthRoute
