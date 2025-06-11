import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: '1000px',
  margin: '2rem auto',
  padding: '2rem',
  borderRadius: '12px',
  background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  color: '#fff',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#4a4a4a',
    },
    '&:hover fieldset': {
      borderColor: '#6366f1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6366f1',
    },
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    color: '#fff',
    borderRadius: '8px',
  },
  '& .MuiInputLabel-root': {
    color: '#a1a1aa',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#6366f1',
  },
});

const StyledTextArea = styled('textarea')({
  width: '100%',
  height: '300px',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #4a4a4a',
  backgroundColor: 'rgba(30, 41, 59, 0.7)',
  color: '#fff',
  resize: 'none',
  fontFamily: 'inherit',
  fontSize: '1rem',
  '&:focus': {
    outline: 'none',
    borderColor: '#6366f1',
    boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
  },
});

const AddBlog = () => {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('public');

  const UserId = localStorage.getItem('UserId');
  const UserName = localStorage.getItem('UserName');

  const navigate = useNavigate();

  const createBlogHandler = async () => {
    if (!subject || !title || !content) {
      toast.warning('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://blogapp-backend-production-3501.up.railway.app/createBlog', {
        subject,
        title,
        createdBy: UserName,
        userId: UserId,
        content,
        visibility,
      });
      console.log(response);

      setLoading(false);
      toast.success('Blog Successfully Created');
      setTimeout(() => navigate('/UserBlogs'), 1500);
    } catch (error) {
      console.log(error.message);
      toast.error('Process Failed: ' + error.message);
      setLoading(false);
    }
  };

  const navigateToMyBlogs = () => {
    navigate('/UserBlogs');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4"
    >
      <ToastContainer position="top-center" autoClose={3000} />
      <StyledPaper elevation={3}>
        <Typography
          variant="h3"
          component={motion.div}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
          sx={{
            textAlign: 'center',
            mb: 4,
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Create Your Blog
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {/* Left Column */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <StyledTextField
              label="Subject"
              variant="outlined"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
              required
            />

            <StyledTextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />

            <StyledTextField
              label="Created By"
              variant="outlined"
              value={UserName}
              disabled
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel sx={{ color: '#a1a1aa' }} id="visibility-label">
                Visibility
              </InputLabel>
              <Select
                labelId="visibility-label"
                value={visibility}
                label="Visibility"
                onChange={(e) => setVisibility(e.target.value)}
                sx={{
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4a4a4a',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6366f1',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6366f1',
                  },
                  backgroundColor: 'rgba(30, 41, 59, 0.7)',
                }}
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Right Column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: '#a1a1aa' }}>
              Blog Content
            </Typography>
            <StyledTextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your amazing blog content here..."
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            mt: 4,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Button
            onClick={createBlogHandler}
            disabled={loading}
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              color: 'white',
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              },
            }}
          >
            {loading ? 'Publishing...' : 'Publish Blog'}
          </Button>

          <Button
            onClick={navigateToMyBlogs}
            variant="outlined"
            size="large"
            sx={{
              color: '#8b5cf6',
              borderColor: '#8b5cf6',
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              fontWeight: 'bold',
              '&:hover': {
                borderColor: '#7c3aed',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
              },
            }}
          >
            View My Blogs
          </Button>
        </Box>
      </StyledPaper>
    </motion.div>
  );
};

export default AddBlog;