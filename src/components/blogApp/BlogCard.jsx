import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import UpdateForm from './updateForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogCard = () => {
  const navigate = useNavigate();
  const [userBlogs, setUserBlogs] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [selectedBlogId, setSelectedBlogId] = useState("")

  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    getUserBlogs();
  }, []);

  const getUserBlogs = async () => {
    try {
      const blogResponse = await axios.get(`https://blogapp-backend-production-3501.up.railway.app/GetUserBlogs/${UserId}`);
      console.log(blogResponse.data.blogs);
      setUserBlogs(blogResponse.data.blogs);
    } catch (error) {
    }
  };


  const EditBtnHandler = (blog) => {
    navigate("/updateForm", { state: blog });

  }
  const DltBtnHandler = async (blogID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const deleteResponse = await axios.delete(`https://blogapp-backend-production-3501.up.railway.app/deleteBlog/${blogID}`)
      toast.success("Blog Deleted Sucsessfully")
      getUserBlogs()
      
    } catch (error) {
      toast.error(error.message)
      
    }

  }


  const navigateBtn = () => {
    navigate("/addBlog");
  };

  if (userBlogs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">No Blogs Posted Yet</h2>
          <Button
            onClick={navigateBtn}
            sx={{
              py: 2,
              px: 4,
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
              }
            }}
            variant="contained"
          >
            Create Your First Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Blog Posts</h1>
          <p className="text-lg text-gray-600">Your personal collection of thoughts and stories</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {userBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.visibility === 'public'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}>
                    {blog.visibility.charAt(0).toUpperCase() + blog.visibility.slice(1)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.subject}</h3>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{blog.title}</h2>

                <div className="prose prose-sm text-gray-600 mb-6 max-h-40 overflow-hidden">
                  {blog.content.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">By {blog.createdBy}</p>
                      <p className="text-xs font-mono text-gray-500 break-all">ID: {blog.userId}</p>
                    </div>
                    <div className="flex space-x-2">
                      {/* Added Update Button */}
                      <Button
                        onClick={() => { EditBtnHandler(blog) }}
                        startIcon={<Edit />}
                        variant="outlined"
                        size="small"
                        color="primary"
                      >
                        Edit
                      </Button>
                      {/* Added Delete Button */}
                      <Button
                        onClick={() => DltBtnHandler(blog._id)}
                        startIcon={<Delete />}
                        variant="outlined"
                        size="small"
                        color="error"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={navigateBtn}
            sx={{
              py: 2,
              px: 6,
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
              }
            }}
            variant="contained"
          >
            Create New Blog
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;