import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  return (
    localStorage.getItem("UserId") ?
      <Outlet /> : <Navigate to={"/Login"} />
  )
  
}

export default PrivateRoute
