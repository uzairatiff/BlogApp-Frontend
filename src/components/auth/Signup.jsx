import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const NameHandler = (e) => setName(e.target.value);
  const EmailHandler = (e) => setEmail(e.target.value);
  const PasswordHandler = (e) => setPassword(e.target.value);

  const SignUpHandler = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Firebase user created");

      const response = await axios.post("https://blogapp-backend-production-3501.up.railway.app/createUser", {
        Name: name,
        Email: email,
        Password: password,
      });
      console.log("Backend Response:", response.data);

      localStorage.setItem("UserName", name);
      const UserId = response.data.UserData._id;
      localStorage.setItem("UserId", UserId);

      toast.success("Signup successful!");
      navigate('/Login');
      
    } catch (error) {
      console.error("Firebase error:", error);
      toast.error("Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className='w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden'>
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <h1 className='text-3xl font-bold text-white'>Create Your Account</h1>
          <p className="text-indigo-100 mt-2">Join our community today</p>
        </div>

        <div className="p-8">
          <TextField
            onChange={NameHandler}
            fullWidth
            label="Full Name"
            type="text"
            variant="outlined"
            sx={{ mb: 3 }}
            InputProps={{
              style: {
                borderRadius: '12px',
              }
            }}
          />
          <TextField
            onChange={EmailHandler}
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
            onChange={PasswordHandler}
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
            onClick={SignUpHandler}
            disabled={loading || !name || !email || !password}
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
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/Login" 
              className="text-indigo-600 font-medium hover:underline hover:text-indigo-700"
            >
              Login here
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
  );
};

export default Signup;