import React from 'react'
import BlogCard from './BlogCard'
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserBlogs = () => {
    const navigate = useNavigate() 

    const ReturnHome = () =>{
        navigate('/home')
    }

  return (
    <div>
          <Button
          onClick={ReturnHome}
          sx={{
            mt: 4,
            ml : 5,
            display: 'block',
            fontSize : '20px',
            height: '50px',
            width: '220px'
          }}
          variant="contained"
        >Home</Button>

      <BlogCard />
    </div>
  )
}

export default UserBlogs
