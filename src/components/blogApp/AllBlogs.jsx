import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom'; // Make sure you have react-router-dom installed

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const naviagte = useNavigate()

  const navigateToCreateBlog = () => {
    naviagte('./addBlog')
  }

  useEffect(() => {
    FetchAllBlogs();
  }, []);

  const FetchAllBlogs = async () => {
    try {
      const response = await axios.get("https://blogapp-backend-production-3501.up.railway.app/GetAllBlogs");
      setBlogs(response.data.allBlogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <div className="w-full sm:w-auto">
            <Link 
              to="/home" 
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              ← Return to Home
            </Link>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 w-full sm:w-auto">
            Community Blogs
          </h1>
          
          <div className="w-full sm:w-auto">
            <Link 
              to="/addBlog" // Update this to your create blog route
              className="inline-flex items-center px-6 py-3 bg-indigo-600 border border-transparent rounded-lg shadow-sm text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all w-full justify-center"
            >
              + Create Your Own Blog
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 mb-6">No blogs found. Be the first to create one!</p>
            <button
            onClick={navigateToCreateBlog} 
              className="inline-flex items-center px-6 py-3 bg-indigo-600 border border-transparent rounded-lg shadow-sm text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Create Your First Blog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      blog.visibility === 'public' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {blog.visibility.charAt(0).toUpperCase() + blog.visibility.slice(1)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                      {blog.subject}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {blog.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {blog.content}
                  </p>
                </div>

                <div className="border-t border-gray-100 px-6 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Author</span>
                    <span className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                      {blog.createdBy}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Posted</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-3 flex justify-end">
                  <Link 
                    to={`/blog/${blog._id}`} // Update this to your blog detail route
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;