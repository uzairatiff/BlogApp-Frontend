import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const UpdateForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const data = location.state?.blog || location.state;
    if (data) {
      setBlog(data);
      setTitle(data.title);
      setSubject(data.subject);
      setContent(data.content);
    }
  }, [location]);

  const updateBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedResponse = await axios.put(`https://blogapp-backend-production-3501.up.railway.app/updateBlog/${blog._id}`, {
        title,
        subject,
        content,
      });
      toast.success("✨ Blog updated successfully!");
      setTimeout(() => navigate("/UserBlogs"), 1500);
    } catch (error) {
      toast.error("😢 Failed to update blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-700 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-700 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
      
      <div className="relative z-10 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg border border-white border-opacity-10 p-8 rounded-3xl shadow-2xl w-full max-w-2xl transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.005]">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-white text-opacity-70 hover:text-opacity-100 text-2xl transition-all duration-300 hover:rotate-90"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200 mb-2">Refine Your Masterpiece</h2>
          <p className="text-blue-100 text-opacity-80 font-light">Polish your thoughts to perfection</p>
        </div>

        <form onSubmit={updateBlog} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-blue-100 text-opacity-90">Blog Title</label>
            <div className="relative">
              <input
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Your captivating headline"
                className="w-full px-5 py-4 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-blue-200 placeholder-opacity-50 text-blue-50 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-xl border border-white border-opacity-10 pointer-events-none"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium text-blue-100 text-opacity-90">Main Topic</label>
            <div className="relative">
              <input
                id="subject"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
                type="text"
                placeholder="The core theme of your writing"
                className="w-full px-5 py-4 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-blue-200 placeholder-opacity-50 text-blue-50 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-xl border border-white border-opacity-10 pointer-events-none"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-medium text-blue-100 text-opacity-90">Your Content</label>
            <div className="relative">
              <textarea
                id="content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                placeholder="Pour your refined thoughts here..."
                className="w-full px-5 py-4 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-blue-200 placeholder-opacity-50 text-blue-50 min-h-[200px] transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-xl border border-white border-opacity-10 pointer-events-none"></div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-500 shadow-lg ${
                isSubmitting 
                  ? 'bg-blue-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl transform hover:-translate-y-1'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Publish Updates</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer 
        position="top-center"
        autoClose={3000}
        theme="dark"
        toastClassName="rounded-xl font-medium bg-gray-800 border border-gray-700"
        progressClassName="bg-gradient-to-r from-blue-500 to-indigo-600"
      />
    </div>
  );
};

export default UpdateForm;